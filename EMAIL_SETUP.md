# 📧 Contact Form - EmailJS Setup Guide

अपने contact form को काम कराने के लिए ये steps follow करें:

## Step 1: EmailJS Account बनाएं
1. [emailjs.com](https://www.emailjs.com/) पर जाएं
2. **Sign Up** करें (Gmail से sign up कर सकते हैं)
3. Dashboard में login करें

## Step 2: Email Service Setup करें
1. Dashboard में **"Add Service"** click करें
2. **Gmail** चुनें
3. Service ID कहीं note कर लें (यह आपको चाहिए होगा)
4. अपना Gmail account connect करें

## Step 3: Email Template बनाएं
1. Dashboard में **"Email Templates"** जाएं
2. **"Create New Template"** click करें
3. Template को ऐसे setup करें:

```
Template Variables:
- {{from_name}}      : User का नाम
- {{from_email}}     : User की email
- {{message}}        : User का message

Example Email Body:
---
New Message from: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
---
```

4. Template ID को note कर लें

## Step 4: Public Key प्राप्त करें
1. **Account** → **API Keys** जाएं
2. **Public Key** को copy करें

## Step 5: Code में Update करें

`script.js` में ये 3 चीजें update करें:

```javascript
// Line 7 में:
emailjs.init("YOUR_PUBLIC_KEY_HERE");
// Replace with: emailjs.init("pk_xxxxxxxxxxxxx");

// Line 303 में:
emailjs.send(
  'YOUR_SERVICE_ID_HERE',   // gmail (जो आपने service बनाते time चुना था)
  'YOUR_TEMPLATE_ID_HERE',  // template ID
  templateParams
)
```

## Example:
```javascript
// सही तरीका:
emailjs.init("pk_test_abc123def456");

emailjs.send(
  'service_abc123',
  'template_xyz789',
  templateParams
)
```

## Test करें:
1. Website को open करें
2. Contact form fill करें
3. **Send Message** button click करें
4. आपकी email (prabhakarsgaur12@email.com) पर message आएगा ✅

## Troubleshooting:
- अगर message नहीं आ रहा है तो browser console check करें (F12)
- सुनिश्चित करें कि Public Key, Service ID, और Template ID सही हैं
- Gmail को EmailJS को access देने की permission दी है या नहीं check करें

**Happy coding! 🚀**
