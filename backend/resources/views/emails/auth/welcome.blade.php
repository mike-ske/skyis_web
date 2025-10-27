@component('mail::message')
{{-- Wrapper --}}
<table style="width:100%; max-width:640px; margin:auto; font-family:'Helvetica Neue',Arial,sans-serif; color:#111827; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e5e7eb;">
    <tr>
        <td style="padding:40px 40px 20px; text-align:center; background:#111827;">
            <img src="{{ asset('images/logo.png') }}" alt="{{ config('app.name') }} Logo" width="140" style="margin-bottom:10px;">
            <h1 style="color:#ffffff; font-size:24px; font-weight:600; margin:0;">Welcome to {{ config('app.name') }}, {{ $user->name }}!</h1>
        </td>
    </tr>

    <tr>
        <td style="padding:30px 40px;">
            <p style="font-size:16px; line-height:1.6; color:#374151;">
                We’re excited to have you join <strong>{{ config('app.name') }}</strong> — your new home for everything fashion-forward.
            </p>

            <h2 style="font-size:18px; font-weight:600; color:#111827; margin-top:25px; display:flex; align-items:center;">
                <img src="https://unpkg.com/lucide-static/icons/rocket.svg" width="18" style="margin-right:8px;"> Getting Started
            </h2>

            <ul style="padding-left:20px; margin-top:10px; color:#374151; font-size:15px;">
                <li><img src="https://unpkg.com/lucide-static/icons/user.svg" width="16" style="margin-right:6px;"> Update your profile to express your style.</li>
                <li><img src="https://unpkg.com/lucide-static/icons/layout-dashboard.svg" width="16" style="margin-right:6px;"> Explore your dashboard and discover new features.</li>
                <li><img src="https://unpkg.com/lucide-static/icons/bell.svg" width="16" style="margin-right:6px;"> Enable notifications to stay updated in real-time.</li>
            </ul>

            <div style="text-align:center; margin:30px 0;">
                <a href="{{ $verificationUrl }}" style="background:#D97706; color:white; padding:12px 24px; text-decoration:none; border-radius:8px; font-weight:600; display:inline-block;">
                    Verify Your Email
                </a>
            </div>

            <h3 style="font-size:16px; font-weight:600; color:#111827; margin-top:30px; display:flex; align-items:center;">
                <img src="https://unpkg.com/lucide-static/icons/help-circle.svg" width="18" style="margin-right:8px;"> Need Help?
            </h3>
            <p style="font-size:15px; color:#374151;">
                • Visit our <a href="{{ $helpCenterUrl }}" style="color:#D97706; text-decoration:none;">Help Center</a><br>
                • Or contact us at <a href="mailto:support@{{ config('app.domain') ?? 'skyis.co' }}" style="color:#D97706; text-decoration:none;">support@{{ config('app.domain') ?? 'skyis.co' }}</a>
            </p>

            <div style="text-align:center; margin:35px 0;">
                <p style="font-size:14px; color:#6b7280;">Connect with us:</p>
                <a href="https://facebook.com/yourpage" style="margin:0 10px;"><img src="https://unpkg.com/lucide-static/icons/facebook.svg" alt="Facebook" width="20"></a>
                <a href="https://twitter.com/yourhandle" style="margin:0 10px;"><img src="https://unpkg.com/lucide-static/icons/twitter.svg" alt="Twitter" width="20"></a>
                <a href="https://instagram.com/yourhandle" style="margin:0 10px;"><img src="https://unpkg.com/lucide-static/icons/instagram.svg" alt="Instagram" width="20"></a>
                <a href="https://linkedin.com/company/yourcompany" style="margin:0 10px;"><img src="https://unpkg.com/lucide-static/icons/linkedin.svg" alt="LinkedIn" width="20"></a>
            </div>

            <hr style="border:none; border-top:1px solid #e5e7eb; margin:30px 0;">

            <p style="font-size:13px; color:#6b7280; text-align:center;">
                <a href="{{ $termsUrl }}" style="color:#D97706; text-decoration:none;">Terms & Conditions</a> •
                <a href="{{ $privacyUrl }}" style="color:#D97706; text-decoration:none;">Privacy Policy</a> •
                <a href="{{ $unsubscribeUrl }}" style="color:#D97706; text-decoration:none;">Unsubscribe</a>
            </p>
            <p style="font-size:12px; color:#9ca3af; text-align:center;">
                © {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
            </p>
        </td>
    </tr>
</table>
@endcomponent
