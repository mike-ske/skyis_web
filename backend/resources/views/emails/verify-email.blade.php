<x-mail::message>
<div style="text-align:center; margin-bottom:20px;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" alt="Skyis Logo" width="120" />
    <h1 style="margin-top:10px;">Welcome to <strong>Skyis</strong></h1>
</div>

# Verify Your Email Address

Hi {{ $user->name }},

Thank you for joining **Skyis**! To activate your account and unlock full access, please verify your email by clicking the button below.

<x-mail::button :url="$verificationUrl" color="primary">
Verify Email Address
</x-mail::button>

This link will expire in **60 minutes** for security reasons.  
If you did not create a Skyis account, you can safely ignore this email.

Thanks,  
The **Skyis Team**

---

### Having Trouble?
If you’re unable to click the button, copy and paste the following link into your browser:

[{{ $verificationUrl }}]({{ $verificationUrl }})

---

@include('emails.partials.footer')
</x-mail::message>
