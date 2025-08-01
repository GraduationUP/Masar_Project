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

    public function index()
    {
        // فقط الأدمن يشوف البلاغات
        if (!Auth::user()->hasRole('admin')) {
            return response()->json(['message' => 'غير مصرح.'], 403);
        }

        $reports = Report::with(['user', 'reportedUser'])->latest()->get();
        return response()->json($reports);
    }

    // داخل ReportController

    // تحديث حالة البلاغ (مراجعته أو تجاهله)
    public function updateStatus(Request $request, $id)
    {
        if (!Auth::user()->hasRole('admin')) {
            return response()->json(['message' => 'غير مصرح.'], 403);
        }

        $request->validate([
            'status' => 'required|in:pending,resolved,in_progress',
        ]);

        $report = Report::findOrFail($id);
        $report->status = $request->status;
        $report->save();

        return response()->json(['message' => 'تم تحديث حالة البلاغ بنجاح.', 'report' => $report]);
    }

    // حذف البلاغ نهائياً
    public function destroy($id)
    {
        if (!Auth::user()->hasRole('admin')) {
            return response()->json(['message' => 'غير مصرح.'], 403);
        }

        $report = Report::findOrFail($id);
        $report->delete();

        return response()->json(['message' => 'تم حذف البلاغ بنجاح.']);
    }
}
