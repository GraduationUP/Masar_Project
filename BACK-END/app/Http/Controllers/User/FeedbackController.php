<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeedbackController extends Controller
{
    public function destroy($storeId)
    {
        $user = Auth::user();

        // حذف التقييم
        Rating::where('store_id', $storeId)
              ->where('user_id', $user->id)
              ->delete();

        // حذف التعليق
        Comment::where('store_id', $storeId)
               ->where('user_id', $user->id)
               ->delete();

        return response()->json(['message' => 'Feedback deleted successfully']);
    }
}
