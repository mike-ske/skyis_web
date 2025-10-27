<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Auction;
use App\Models\Bid;

class AuctionController extends Controller
{
    public function getAuction($id)
    {
        $auction = Auction::with(['bids.user'])->where('product_id', $id)->first();
        
        if (!$auction) {
            return response()->json(['message' => 'Auction not found'], 404);
        }
        
        return response()->json($auction, 200);
    }

    public function placeBid(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|integer|exists:auctions,product_id',
            'amount' => 'required|numeric|min:0.01',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validation failed','errors' => $validator->errors()], 422);
        }

        $auction = Auction::where('product_id', $request->product_id)->first();

        if (!$auction) {
            return response()->json(['message' => 'Auction not found'], 404);
        }

        if ($auction->status !== 'open') {
            return response()->json(['message' => 'Auction is not open for bidding'], 403);
        }

        // Check end_date
        if ($auction->end_date && now()->greaterThan($auction->end_date)) {
            return response()->json(['message' => 'Auction has already ended'], 403);
        }

        $currentHighest = $auction->bids()->orderByDesc('amount')->value('amount') ?? $auction->starting_price ?? 0;

        if ($request->amount <= $currentHighest) {
            return response()->json(['message' => 'Bid must be higher than current highest bid', 'current_highest' => $currentHighest], 422);
        }

        $bid = Bid::create([
            'auction_id' => $auction->id,
            'user_id' => Auth::id(),
            'amount' => $request->amount,
            'status' => 'placed',
        ]);

        // update auction current_bid quickly
        $auction->current_bid = $request->amount;
        $auction->save();

        return response()->json(['message' => 'Bid placed successfully','data' => $bid], 201);
    }

    public function highestBid($product_id)
    {
        $auction = Auction::where('product_id', $product_id)->first();
        if (!$auction) {
            return response()->json(['message' => 'Auction not found'], 404);
        }

        $highest = $auction->bids()->orderByDesc('amount')->first();

        return response()->json([
            'highest_bid' => $highest ? $highest->amount : null,
            'bidder_id' => $highest ? $highest->user_id : null,
        ]);
    }
}
