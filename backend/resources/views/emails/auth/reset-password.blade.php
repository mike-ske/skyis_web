{{-- resources/views/emails/auth/reset-password.blade.php --}}

<x-mail::message>
# Reset Your Password

Hi {{ $user->name }},

You are receiving this email because we received a password reset request for your account.

<x-mail::button :url="$resetUrl">
Reset Password
</x-mail::button>

This password reset link will expire in 60 minutes for security reasons.

If you did not request a password reset, no further action is required.

Thanks,<br>
The {{ config('app.name') }} Team

---

If you're having trouble clicking the **"Reset Password"** button, copy and paste the URL below into your web browser:  
{{ $resetUrl }}
</x-mail::message>
