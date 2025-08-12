<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Store;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    // إضافة تعليق
    public function store(Request $request, Store $store)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $comment = $store->comments()->create([
            'user_id' => Auth::id(),
            'content' => $request->content,
            'is_reported' => false,
        ]);

        return response()->json(['message' => 'Comment added successfully', 'comment' => $comment], 201);
    }

  public function update(Request $request, Comment $comment)
{
    $user = Auth::user();

    if ($user->id !== $comment->user_id && !$user->can('edit comment')) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    // إذا كانت القيمة فاضية، نحذف التعليق
    if (trim($request->content) === '') {
        $comment->delete();
        return response()->json(['message' => 'Comment deleted because it was empty']);
    }

    $request->validate([
        'content' => 'required|string|max:1000',
    ]);

    $comment->update(['content' => $request->content]);

    return response()->json(['message' => 'Comment updated successfully']);
}


    // حذف تعليق
    public function destroy(Comment $comment)
    {
        $user = Auth::user();

        if ($user->id !== $comment->user_id && !$user->can('delete comment')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }

    // تبليغ عن تعليق (للبائع فقط)
    public function report(Comment $comment)
    {
        $user = Auth::user();

        if (!$user->hasRole('seller') || !$user->store) {
            return response()->json(['message' => 'Only sellers can report comments.'], 403);
        }

        $comment->update(['is_reported' => true]);

        return response()->json(['message' => 'Comment reported successfully']);
    }
}
