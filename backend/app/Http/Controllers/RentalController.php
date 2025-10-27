<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rental;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RentalController extends Controller
{
    public function book(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'start_date' => 'required|date|after:today',
            'end_date' => 'required|date|after:start_date',
            'selected_color' => 'nullable|string',
            'selected_size' => 'nullable|string',
            'total_price' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Create rental booking
        $rental = Rental::create([
            'user_id' => $request->user()->id,
            'product_id' => $request->product_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'selected_color' => $request->selected_color,
            'selected_size' => $request->selected_size,
            'total_price' => $request->total_price,
            'status' => 'pending'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Rental booked successfully',
            'rental' => $rental
        ]);
    }
}