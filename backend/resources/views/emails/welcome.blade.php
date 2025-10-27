<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Skyis Fashion</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            text-align: center;
            padding: 40px 20px;
            background: linear-gradient(135deg, #0B3B38 0%, #1a5e5a 100%);
            border-radius: 10px 10px 0 0;
        }
        .header img {
            max-width: 180px;
            height: auto;
        }
        .content {
            padding: 40px 30px;
        }
        .content h1 {
            color: #0B3B38;
            font-size: 28px;
            margin-bottom: 20px;
            margin-top: 0;
        }
        .content p {
            margin: 15px 0;
            font-size: 16px;
        }
        .features {
            margin: 25px 0;
            padding: 0;
        }
        .features li {
            margin: 12px 0;
            font-size: 15px;
            line-height: 1.5;
        }
        .button-container {
            text-align: center;
            margin: 35px 0;
        }
        .button {
            display: inline-block;
            padding: 16px 40px;
            background: #0B3B38;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
        }
        .button:hover {
            background: #0a3330;
        }
        .note {
            color: #666;
            font-size: 14px;
            margin-top: 30px;
            padding: 15px;
            background-color: #f9f9f9;
            border-left: 4px solid #0B3B38;
            border-radius: 4px;
        }
        .footer {
            text-align: center;
            padding: 25px 20px;
            color: #666;
            font-size: 14px;
            background: #f9f9f9;
            border-radius: 0 0 10px 10px;
            border-top: 1px solid #e0e0e0;
        }
        .footer a {
            color: #0B3B38;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg" alt="Skyis Fashion Logo">
        </div>
        
        <div class="content">
            <h1>Welcome to Skyis Fashion, {{ $userName }}! 🎉</h1>
            
            <p>We're absolutely thrilled to have you join fashion's most creative ecosystem!</p>
            
            <p>At Skyis, you'll discover an incredible world of fashion:</p>
            
            <ul class="features">
                <li> <strong>Luxury Collections</strong> - Curated designer pieces and authentic pre-owned luxury items</li>
                <li> <strong>Ready-to-Wear</strong> - Perfect pieces for everyday, cultural celebrations, and special occasions</li>
                <li> <strong>Bespoke Fashion</strong> - Custom designs tailored exclusively for you</li>
                <li> <strong>Thrift Market</strong> - Sustainable, stylish finds for the conscious fashionista</li>
            </ul>
            
            <p><strong>One more step to get started!</strong></p>
            <p>Please verify your email address to unlock full access to your Skyis account and start your fashion journey.</p>
            
            <div class="button-container">
                <a href="{{ $verificationUrl }}" class="button">Verify Email Address</a>
            </div>
            
            <div class="note">
                <strong>⏰ Important:</strong> This verification link will expire in 60 minutes for your security.
                <br><br>
                If you didn't create a Skyis account, please ignore this email or contact our support team.
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Skyis Fashion</strong></p>
            <p>Fashion's Most Creative Ecosystem</p>
            <p style="margin-top: 15px;">
                Need help? Contact us at <a href="mailto:contact@skyis.co">contact@skyis.co</a>
            </p>
            <p style="margin-top: 10px; font-size: 13px; color: #999;">
                © {{ date('Y') }} Skyis Fashion. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>