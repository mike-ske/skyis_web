<x-mail::message>
<div style="text-align:center; margin-bottom:20px;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" alt="Skyis Logo" width="120" />
    <h1 style="margin-top:10px;">Security Alert</h1>
</div>

# New Login to Your Account

Hi {{ $user->name }},

We noticed a new login to your **Skyis** account.

**Details:**  
- **IP Address:** {{ $loginData['ip'] ?? 'N/A' }}  
- **Location:** {{ $loginData['location'] ?? 'Unknown' }}  
- **Device:** {{ $loginData['device'] ?? 'Unknown' }}  
- **Date/Time:** {{ $loginData['time'] ?? now()->toDateTimeString() }}

If this was you, no further action is needed.  
If this wasn’t you, we recommend securing your account immediately.

<x-mail::button :url="$securityUrl" color="error">
Secure My Account
</x-mail::button>

Stay safe,  
The **Skyis Security Team**

---

@include('emails.partials.footer')
</x-mail::message>
{{-- End of resources/views/emails/login-alert.blade.php --}}