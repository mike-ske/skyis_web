
{{-- ==========================================
1. BASE EMAIL LAYOUT (resources/views/emails/layout.blade.php)
========================================== --}}

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Skyis')</title>
    <style>
        /* Reset styles */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        /* Base styles */
        body {
            margin: 0;
            padding: 0;
            width: 100% !important;
            min-width: 100%;
            background-color: #f4f4f4;
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        .header {
            background-color: #0B3B38;
            padding: 20px;
            text-align: center;
        }
        
        .header img {
            max-height: 60px;
            width: auto;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .footer {
            background-color: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        
        h1 {
            color: #0B3B38;
            font-size: 28px;
            font-weight: 600;
            margin: 0 0 20px 0;
            text-align: center;
        }
        
        h2 {
            color: #0B3B38;
            font-size: 24px;
            font-weight: 600;
            margin: 0 0 15px 0;
        }
        
        p {
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 15px 0;
        }
        
        .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #10b981;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            text-align: center;
            margin: 20px 0;
        }
        
        .button:hover {
            background-color: #059669;
        }
        
        .alert-box {
            background-color: #fef2f2;
            border-left: 4px solid #ef4444;
            padding: 15px;
            margin: 20px 0;
        }
        
        .info-box {
            background-color: #eff6ff;
            border-left: 4px solid #3b82f6;
            padding: 15px;
            margin: 20px 0;
        }
        
        .success-box {
            background-color: #f0fdf4;
            border-left: 4px solid #10b981;
            padding: 15px;
            margin: 20px 0;
        }
        
        .small-text {
            font-size: 14px;
            color: #6b7280;
        }
        
        .divider {
            border-top: 1px solid #e5e7eb;
            margin: 30px 0;
        }
        
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }
            .content {
                padding: 20px !important;
            }
            h1 {
                font-size: 24px !important;
            }
        }
    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td style="padding: 20px 0;">
                <div class="email-container">
                    <!-- Header -->
                    <div class="header">
                        <img src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg" alt="Skyis Logo">
                    </div>
                    
                    <!-- Content -->
                    <div class="content">
                        @yield('content')
                    </div>
                    
                    <!-- Footer -->
                    <div class="footer">
                        <p class="small-text">
                            This email was sent from <strong>Skyis</strong><br>
                            Fashion's most creative ecosystem<br>
                            <a href="{{ env('FRONTEND_URL') }}" style="color: #10b981;">Visit our website</a>
                        </p>
                        <p class="small-text">
                            If you didn't expect this email, you can ignore it safely.
                        </p>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>

{{-- ==========================================
2. WELCOME EMAIL TEMPLATE (resources/views/emails/welcome.blade.php)
========================================== --}}

@extends('emails.layout')

@section('title', 'Welcome to Skyis')

@section('content')
<h1>Welcome to Skyis, {{ $user->first_name }}!</h1>

<p>We're thrilled to have you join fashion's most creative ecosystem. Your journey into the world of innovative fashion design and collaboration starts here.</p>

<div class="success-box">
    <p><strong>What's Next?</strong></p>
    <ul style="margin: 0; padding-left: 20px;">
        <li>Complete your profile to get personalized recommendations</li>
        <li>Explore our marketplace of unique fashion pieces</li>
        <li>Connect with other fashion enthusiasts and designers</li>
        <li>Start building your fashion portfolio</li>
    </ul>
</div>

<div style="text-align: center;">
    <a href="{{ $dashboardUrl }}" class="button">Explore Your Dashboard</a>
</div>

<p>As a member of our creative community, you'll have access to:</p>

<ul style="padding-left: 20px;">
    <li><strong>Exclusive Designs:</strong> Access to limited edition fashion pieces</li>
    <li><strong>Designer Network:</strong> Connect with emerging and established designers</li>
    <li><strong>Creative Tools:</strong> Portfolio building and collaboration features</li>
    <li><strong>Community Events:</strong> Fashion shows, workshops, and networking events</li>
</ul>

<div class="divider"></div>

<p>Need help getting started? Our support team is here for you:</p>
<p style="text-align: center;">
    <a href="mailto:support@skyis.com" style="color: #10b981;">support@skyis.com</a>
</p>

<p>Welcome to the future of fashion!</p>

<p style="margin-top: 30px;">
    <strong>The Skyis Team</strong>
</p>
@endsection

{{-- ==========================================
3. EMAIL VERIFICATION TEMPLATE (resources/views/emails/verify-email.blade.php)
========================================== --}}

@extends('emails.layout')

@section('title', 'Verify Your Email Address')

@section('content')
<h1>Verify Your Email Address</h1>

<p>Hi {{ $user->first_name }},</p>

<p>Thank you for joining Skyis! To complete your registration and start exploring fashion's creative ecosystem, please verify your email address.</p>

<div style="text-align: center;">
    <a href="{{ $verificationUrl }}" class="button">Verify Email Address</a>
</div>

<div class="info-box">
    <p><strong>Why verify your email?</strong></p>
    <ul style="margin: 0; padding-left: 20px;">
        <li>Secure your account and protect your data</li>
        <li>Receive important updates about your orders and account</li>
        <li>Get personalized fashion recommendations</li>
        <li>Access exclusive member benefits</li>
    </ul>
</div>

<p><strong>This verification link expires in 60 minutes</strong> for your security.</p>

<div class="divider"></div>

<p class="small-text">
    If you're having trouble clicking the "Verify Email Address" button, copy and paste this URL into your web browser:<br>
    <a href="{{ $verificationUrl }}" style="color: #10b981; word-break: break-all;">{{ $verificationUrl }}</a>
</p>

<p class="small-text">
    If you didn't create a Skyis account, you can safely ignore this email.
</p>
@endsection

{{-- ==========================================
4. PASSWORD RESET TEMPLATE (resources/views/