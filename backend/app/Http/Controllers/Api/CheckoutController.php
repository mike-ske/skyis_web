<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function process(Request $request)
    {
        $validated = $request->validate([
            'shipping_address' => 'required|string|max:255',
            'billing_address' => 'required|string|max:255',
            'payment_method' => 'required|string|in:credit_card,paypal,stripe',
            'notes' => 'nullable|string'
        ]);

        $cart = $this->getCart($request);
        
        if ($cart->items->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        return DB::transaction(function () use ($cart, $validated) {
            // Create order
            $order = Order::create([
                'user_id' => auth()->check() ? auth()->id() : null,
                'session_id' => auth()->check() ? null : $cart->session_id,
                'total_amount' => $this->calculateTotal($cart),
                'status' => 'pending',
                'shipping_address' => $validated['shipping_address'],
                'billing_address' => $validated['billing_address'],
                'payment_method' => $validated['payment_method'],
                'notes' => $validated['notes'] ?? null,
            ]);

            // Create order items from cart items
            foreach ($cart->items as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->price,
                    'total' => $cartItem->quantity * $cartItem->price,
                ]);
            }

            // Clear the cart
            $cart->items()->delete();

            // Process payment (you can integrate with payment gateway here)
            $paymentResult = $this->processPayment($order, $validated['payment_method']);
            
            if ($paymentResult['success']) {
                $order->update([
                    'status' => 'paid',
                    'payment_id' => $paymentResult['payment_id'] ?? null
                ]);
                
                return response()->json([
                    'message' => 'Order placed successfully',
                    'order' => $order->load('items.product'),
                    'payment_status' => 'success'
                ]);
            } else {
                // If payment fails, you might want to handle this differently
                // For now, we'll mark it as failed
                $order->update(['status' => 'payment_failed']);
                
                return response()->json([
                    'message' => 'Payment failed',
                    'error' => $paymentResult['error'] ?? 'Unknown error'
                ], 422);
            }
        });
    }

    private function getCart(Request $request)
    {
        if (auth()->check()) {
            return Cart::with('items.product')->firstOrCreate(['user_id' => auth()->id()]);
        }
        
        $sessionId = $request->session()->getId();
        return Cart::with('items.product')->firstOrCreate(['session_id' => $sessionId]);
    }

    private function calculateTotal(Cart $cart)
    {
        return $cart->items->sum(function ($item) {
            return $item->quantity * $item->price;
        });
    }

    private function processPayment(Order $order, $paymentMethod)
    {
        // This is a placeholder for payment processing
        // You should integrate with your preferred payment gateway (Stripe, PayPal, etc.)
        
        try {
            // Example payment processing logic
            switch ($paymentMethod) {
                case 'credit_card':
                    // Process credit card payment
                    break;
                case 'paypal':
                    // Process PayPal payment
                    break;
                case 'stripe':
                    // Process Stripe payment
                    break;
            }

            // For demo purposes, we'll assume payment is always successful
            return [
                'success' => true,
                'payment_id' => 'pay_' . uniqid(),
                'message' => 'Payment processed successfully'
            ];
            
        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    public function orderHistory(Request $request)
    {
        if (auth()->check()) {
            $orders = Order::with('items.product')
                ->where('user_id', auth()->id())
                ->orderBy('created_at', 'desc')
                ->get();
        } else {
            $sessionId = $request->session()->getId();
            $orders = Order::with('items.product')
                ->where('session_id', $sessionId)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return response()->json($orders);
    }

    public function orderDetails($id)
    {
        $order = Order::with('items.product')->findOrFail($id);
        
        // Check if user is authorized to view this order
        if (auth()->check()) {
            if ($order->user_id !== auth()->id()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        } else {
            $sessionId = request()->session()->getId();
            if ($order->session_id !== $sessionId) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        return response()->json($order);
    }
}