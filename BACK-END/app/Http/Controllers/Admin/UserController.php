<?php

namespace App\Http\Controllers\Admin;

use App\Models\Ban;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class UserController extends Controller
{
    /**
     * عرض جميع المستخدمين مع معلومات الحظر والأدوار
     */
    public function index()
    {
        $users = User::where('id', '!=', Auth::id())
            ->whereDoesntHave('roles', function ($query) {
                $query->where('name', 'admin');
            })
            ->with(['roles:id,name', 'ban.admin'])
            ->get();

        // إزالة المفتاح pivot من كل دور
        $users->each(function ($user) {
            $user->roles->each(function ($role) {
                unset($role->pivot);
            });
        });

        return response()->json($users);
    }

    /**
     * حظر مستخدم معين من قبل الأدمن
     */
    public function ban(Request $request, $id)
    {
        // تحقق أن الأدمن يملك صلاحية الحظر
        if (!Auth::user()->can('block users')) {
            return response()->json(['error' => 'غير مصرح لك بالحظر'], 403);
        }

        // منع الأدمن من حظر نفسه
        if (Auth::id() == $id) {
            return response()->json(['error' => ' يا غبي لا يمكنك حظر نفسك'], 403);
        }

        // البحث عن المستخدم
        $user = User::findOrFail($id);

        // منع حظر أدمن آخر
        if ($user->hasRole('admin')) {
            return response()->json(['error' => 'لا يمكن حظر مستخدم يملك دور أدمن'], 403);
        }

        // التحقق إذا كان المستخدم محظورًا بالفعل
        if ($user->ban) {
            return response()->json(['message' => 'المستخدم محظور مسبقًا'], 422);
        }

        $request->validate([
            'reason' => 'required|string|max:1000',
            'duration_value' => 'required|integer|min:1',
            'duration_unit' => 'required|string|in:minutes,hours,days',
        ]);

        $durationValue = $request->input('duration_value');
        $durationUnit = $request->input('duration_unit');

        switch ($durationUnit) {
            case 'minutes':
                $expiresAt = Carbon::now()->addMinutes($durationValue);
                break;
            case 'hours':
                $expiresAt = Carbon::now()->addHours($durationValue);
                break;
            case 'days':
                $expiresAt = Carbon::now()->addDays($durationValue);
                break;
            default:
                $expiresAt = null; // في حال وحدة غير معروفة، اعتبر حظر دائم
        }

        // إنشاء سجل الحظر
        Ban::create([
            'target_id' => $user->id,
            'reason' => $request->reason,
            'banned_by' => Auth::id(),
            'expires_at' => $expiresAt,
        ]);

        // إذا المستخدم بائع، يتم إيقاف متجره تلقائيًا
        if ($user->hasRole('seller') && $user->store) {
            $user->store->update(['status' => false]);
        }

        return response()->json(['message' => 'تم حظر المستخدم بنجاح']);
    }


    /**
     * فك الحظر عن مستخدم
     */
    public function unban($id)
    {
        $user = User::findOrFail($id);

        if (!$user->ban) {
            return response()->json(['message' => 'المستخدم غير محظور'], 422);
        }

        // حذف الحظر
        $user->ban->delete();

        // تفعيل المتجر إذا كان المستخدم بائع
        if ($user->hasRole('seller') && $user->store) {
            $user->store->update(['status' => true]);
        }

        return response()->json(['message' => 'تم فك الحظر عن المستخدم بنجاح']);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        // هنا ممكن تضيف منطق حذف بيانات مرتبطة بالمستخدم، أو تأكد الحذف آمن

        $user->delete();

        return response()->json([
            'status' => true,
            'message' => 'User deleted successfully'
        ]);
    }
}
