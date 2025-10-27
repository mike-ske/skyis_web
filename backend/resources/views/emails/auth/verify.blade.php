{{-- resources/views/emails/auth/verify-email.blade.php --}}

<x-mail::message>
# Verify Your Email Address

Hi {{ $user->name }},

Thank you for joining {{ config('app.name') }}! Please click the button below to verify your email address and activate your account.

<x-mail::button :url="$verificationUrl">
Verify Email Address
</x-mail::button>

This verification link will expire in 60 minutes for security reasons.

If you did not create an account, no further action is required.

Thanks,<br>
The {{ config('app.name') }} Team

---

If you're having trouble clicking the **"Verify Email Address"** button, copy and paste the URL below into your web browser:  
{{ $verificationUrl }}
</x-mail::message>
{{-- End of resources/views/emails/auth/verify-email.blade.php --}}