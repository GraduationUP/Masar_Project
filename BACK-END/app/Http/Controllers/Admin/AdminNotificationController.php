<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Type;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminNotificationController extends Controller
{

    public function send(Request $request)
    {
        $request->validate([
            'type' => 'required|exists:types,type',
            'message' => 'required|string',
            'target' => 'required|in:users,sellers,all,user', // أضفنا 'user'
            'target_id' => 'required_if:target,user|exists:users,id'
        ]);

        $type = Type::where('type', $request->type)->firstOrFail();

        // حالة إرسال لبائع معيّن
        if ($request->target === 'user') {
            $user = User::findOrFail($request->target_id);

            Notification::create([
                'user_id' => $user->id,
                'message' => $request->message,
                'type_id' => $type->id,
                'related_id' => null,
            ]);

            return response()->json(['message' => 'تم إرسال الإشعار إلى المستخدم المحدد بنجاح']);
        }

        // حالة إرسال لمجموعة من المستخدمين حسب الدور
        $usersQuery = match ($request->target) {
            'users' => User::role('user'),
            'sellers' => User::role('seller'),
            'all' => User::query(),
        };

        $users = $usersQuery->get();

        foreach ($users as $user) {
            Notification::create([
                'user_id' => $user->id,
                'message' => $request->message,
                'type_id' => $type->id,
                'related_id' => null,
            ]);
        }

        return response()->json(['message' => 'تم إرسال الإشعارات بنجاح']);
    }
}
