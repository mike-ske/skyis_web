<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = $this->getCart($request);
        return response()->json($cart->load('items.product'));
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric'
        ]);

        $cart = $this->getCart($request);
        
        $cartItem = CartItem::updateOrCreate(
            [
                'cart_id' => $cart->id,
                'product_id' => $validated['product_id']
            ],
            [
                'quantity' => $validated['quantity'],
                'price' => $validated['price']
            ]
        );

        return response()->json($cartItem->load('product'));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cartItem = CartItem::findOrFail($id);
        $cartItem->update($validated);

        return response()->json($cartItem);
    }

    public function remove($id)
    {
        CartItem::findOrFail($id)->delete();
        return response()->json(['message' => 'Item removed']);
    }

    private function getCart(Request $request)
    {
        if (auth()->check()) {
            return Cart::firstOrCreate(['user_id' => auth()->id()]);
        }
        
        $sessionId = $request->session()->getId();
        return Cart::firstOrCreate(['session_id' => $sessionId]);
    }
}