<?php

namespace App\Http\Controllers\Admin;

use App\Models\Ban;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * عرض جميع المستخدمين مع معلومات الحظر والأدوار
     */
  public function index()
{
    $users = User::with(['roles:id,name', 'ban.admin'])->get();

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

    // التحقق من السبب
    $request->validate([
        'reason' => 'required|string|max:1000',
    ]);

    // إنشاء سجل الحظر
    Ban::create([
        'target_id' => $user->id,
        'reason' => $request->reason,
        'banned_by' => Auth::id(),
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
        // البحث عن سجل الحظر لهذا المستخدم
        $ban = Ban::where('target_id', $id)->first();

        // التحقق إذا المستخدم غير محظور أصلاً
        if (!$ban) {
            return response()->json(['message' => 'المستخدم غير محظور'], 404);
        }

        // حذف سجل الحظر
        $ban->delete();

        return response()->json(['message' => 'تم فك الحظر بنجاح']);
    }
}

