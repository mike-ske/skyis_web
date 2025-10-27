<x-mail::message>
<div style="text-align:center; margin-bottom:20px;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" alt="Skyis Logo" width="120" />
    <h1 style="margin-top:10px;">Password Changed</h1>
</div>

# Password Successfully Changed

Hi {{ $user->name }},

We’re writing to let you know that the password for your **Skyis** account was successfully changed.  

If this was you, no action is required.  
If you did not perform this change, please **secure your account immediately**.

<x-mail::button :url="$securityUrl" color="error">
Secure My Account
</x-mail::button>

Thanks,  
The **Skyis Security Team**

---

@include('emails.partials.footer')
</x-mail::message>
