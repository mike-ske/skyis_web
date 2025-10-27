<x-mail::message>
# Order Confirmation

Hi {{ $user->first_name }},  
Thank you for your order!

<x-mail::panel>
**Order Summary**  
- **Number:** #{{ $order->order_number ?? 'SKY-' . rand(100000, 999999) }}  
- **Date:** {{ now()->format('M j, Y') }}  
- **Total:** ${{ number_format($order->total ?? 99.99, 2) }}  
</x-mail::panel>

**Shipping Info**  
{{ $user->name }}  
123 Fashion Street  
City, State 12345  

Estimated Delivery: 3–5 business days  

<x-mail::button :url="env('FRONTEND_URL') . '/orders/' . ($order->id ?? '12345')" color="success">
Track My Order
</x-mail::button>

Questions? [orders@skyis.com](mailto:orders@skyis.com)
</x-mail::message>
