<?php

namespace App\Http\Controllers\User;

use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::with('type')->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')->get()
            ->map(function ($notification) {
                return [
                    'id' => $notification->id,
                    'message' => $notification->message,
                    'type_name' => $notification->type->type ?? null,
                    'is_read' => $notification->is_read,
                    'sent_at' => $notification->created_at->format('Y-m-d H:i:s'),
                ];
            });
        return response()->json(['notifications' => $notifications]);
    }


    public function markAsRead($id)
    {
        $notification = Notification::where('user_id', Auth::id())->findOrFail($id);

        $notification->is_read = true;
        $notification->save();

        return response()->json(['message' => 'تم تحديد الإشعار كمقروء']);
    }

    public function markAllAsRead()
    {
        Notification::where('user_id', Auth::id())
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['message' => 'تم تحديد جميع الإشعارات كمقروءة']);
    }

    public function destroy($id)
    {
        $notification = Notification::where('user_id', Auth::id())->findOrFail($id);
        $notification->delete();

        return response()->json(['message' => 'تم حذف الإشعار']);
    }
}
