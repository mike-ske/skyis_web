<x-mail::message>
<div style="text-align:center; margin-bottom:20px;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" alt="Skyis Logo" width="120" />
    <h1 style="margin-top:10px;">Reset Your Password</h1>
</div>

# Password Reset Request

Hi {{ $user->name }},

We received a request to reset your **Skyis** account password. Click the button below to create a new password:

<x-mail::button :url="$resetUrl" color="error">
Reset Password
</x-mail::button>

This link will expire in **60 minutes**.  
If you did not request a password reset, please ignore this email.

Thanks,  
The **Skyis Security Team**

---

### Having Trouble?
If you’re unable to click the button, copy and paste this URL into your browser:

[{{ $resetUrl }}]({{ $resetUrl }})

---

@include('emails.partials.footer')
</x-mail::message>
