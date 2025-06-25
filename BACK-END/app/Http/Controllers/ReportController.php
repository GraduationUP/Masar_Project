<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'reported_user_id' => 'required|exists:users,id',
            'message' => 'required|string|max:1000',
        ]);

        if ($validated['reported_user_id'] == Auth::id()) {
            return response()->json(['message' => 'You cannot report yourself'], 403);
        }

        $report = Report::create([
            'user_id' => Auth::id(),
            'reported_user_id' => $validated['reported_user_id'],
            'message' => $validated['message'],
        ]);

        return response()->json([
            'message' => 'Report submitted successfully',
            'report' => $report,
        ], 201);
    }
}
