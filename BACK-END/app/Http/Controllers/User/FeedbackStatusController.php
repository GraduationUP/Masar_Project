<?php

namespace App\Http\Controllers\User;

use App\Models\Store;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FeedbackStatusController extends Controller
{
    public function check(Request $request, $storeId)
    {
        $user = $request->user();

        $store = Store::find($storeId);

        if (!$store) {
            return response()->json([
                'status' => false,
                'message' => 'المتجر غير موجود.'
            ], 404);
        }

        $hasRated = $store->ratings()
            ->where('user_id', $user->id)
            ->first()?->score ?? null;

        $hasCommented = $store->comments()
            ->where('user_id', $user->id)
            ->first()?->content ?? null;

        return response()->json([
            'score' => $hasRated,
            'content' => $hasCommented,
        ]);
    }
}
