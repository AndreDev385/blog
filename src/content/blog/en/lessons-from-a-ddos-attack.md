---
title: Security lessons after suffering a DDoS
description: "A DDoS attack took Bruschi Rentals offline for days: $520 in Twilio, 900 fake users, and a blocked card. This is how I experienced it, how I fixed it, and what I learned along the way."
date: 2026-06-12
image: https://andre385.sirv.com/Portfolio%20%26%20Blog/sec.jpg
tags:
  - go
  - security
---

![Cyber Security](https://andre385.sirv.com/Portfolio%20%26%20Blog/sec.jpg)

# What I learned after suffering a DDoS

A few months ago, while working on [Bruschi Rentals](https://bruschirentals.com/),
the web portal suffered a `DDoS` attack that caused about $500 in
Twilio charges, left the site offline for a few days, and made us lose customers.
If you don't want this to happen to you, come with me to find out what happened and how you can
avoid it.

## The vulnerability

The [Bruschi Rentals](https://bruschirentals.com/) website had two
authentication use cases:

Registration asks for the user's moving preferences, phone number, and
email (optional). The only thing verified was that the phone number was real
via an OTP through Twilio.

After verifying the phone number, the user can log into their portal
to check the options assigned by their trusted realtor based on their
preferences.

If you know about cybersecurity, you might already have an idea of what happened.

Basically, this type of attack works like this: someone automates
fake requests to your server to exploit a specific endpoint or overload
your server. In our case, each OTP request cost my
client money. Without proper rate limiting, the attacker could fire off hundreds of
requests with no control, and the cost just spiraled.

Since registration only verified the client's authenticity through the
OTP to their phone number — which could be requested up to 10 times
per Auth0's rate limit (the service I used for authentication) — a
malicious user could create an account and request up to 10 OTPs without providing
any real information.

At the time I thought it wasn't necessary to add so many checks since it
was a new product and we didn't expect a large user flow per month. Even
so, this vulnerability was exploited after just 2-3 months in
production for a product with only 30-60 active users per month. It
was a big mistake not to give it the importance it deserved.

## The day of the attack

On April 23 at 12:10 I received a message from a Bruschi Rentals
staff member:

— _"Something weird is happening on the dashboard. There are clients with fake
or nonsense data. And there seem to be a lot of them."_

I dropped what I was doing and logged into [Railway](https://railway.com/) to see what was going on. The number of errors
was shocking: over **20,000 error logs** accumulated in a matter of
minutes. I remember being scared. At that moment it hit me:
we must have been attacked. There were too many requests in too short a time
for a site with so few users.

What I didn't know yet was that the attack had been going on for 46 minutes.

At 11:24 the attacker started creating multiple accounts with fake
data on the portal and requesting OTP codes to validate phone
numbers, exploiting Auth0's 10-request-per-account rate limit.

At 11:52 —just 28 minutes later— the attacker had already created
**~900 fake users and requested ~14,000 login codes.**
My client's card started rejecting payments, flagging them as
fraud. The Twilio debt piled up, and once the
limit was exceeded, Twilio suspended the account and stopped the service.
In a way, that prevented even bigger losses.

By the time I opened Railway at 12:10, the damage was already done.

## The consequences

- **$520 in Twilio charges** — which also ended up as debt
  because the card was blocked for fraud, and we had to manage
  the payment with the bank.

- **Portal down for 3 days** — three days where
  Bruschi Rentals customers couldn't access their moving
  portal. It's not just technical downtime; it's people who can't
  check their moving options.

- **Database contaminated with ~900 fake users** — junk
  records that had to be identified and cleaned up.

- **An unhappy client** — and rebuilding trust after
  something like that is harder than fixing any server.

## How I fixed it

Thanks to having traceability in the backend logs, I was able to identify the cause
quickly once I found out. I talked to my client, explained the situation, and put together
a plan to prevent it from happening again.

### Reducing costs

The most important change was delaying user creation in Auth0.
Before, upon registration, a user was automatically created in Auth0 with
SMS connection, which allowed the attacker to request OTPs with no
filtering. Now, registration only saves the client in the database and
sends a verification email. Only after the client verifies
their email —_proving they have a real email_— is the user created in
Auth0. This way, an attacker would need a verifiable email for each fake
account.

Also, Twilio OTPs are much more expensive than emails, so
moving email verification as the first step drastically reduced
the potential cost of an attack.

### Rate limiting

Instead of relying solely on Auth0's rate limit, I implemented my
own rate limiting using the `tollbooth` library (Go). The public
registration endpoint allows only 5 requests per IP per hour, and the
email verification endpoint only 3 per IP per hour. Combined with an additional
limit by phone number, the attacker can't automate
registration or overload the server.

### Bot detection

In addition to [Turnstile](https://www.cloudflare.com/products/turnstile/) by
Cloudflare, I added a hidden `honeypot` field in the registration form.
Bots tend to fill in every field they see, so if that field has
content, the backend rejects the request automatically. Turnstile
verifies on the server side that the visitor is human before
processing the registration.

### Metrics and alerts

Although I didn't implement this one, it's important for
monitoring and observability of your software: add a trigger
that notifies you by email whenever something suspicious happens. That way you can
react before the damage gets worse. If I had had this in place,
I would have found out about the attack within minutes, not almost
an hour later.

## Reflection

Whenever your product uses an external service that you have to
pay for, make sure you don't leave vulnerabilities exposed
that could be exploited. Your wallet will thank you.

Rate limiting is extremely useful and necessary in any
project, even if it's not that big. Protecting yourself against this type
of attack is essential to ensure accessibility for your legitimate
users, protect critical endpoints, and avoid overloading your server.

But above all, I learned that security isn't something you add
later. It's a decision you make from the very first deploy, even
when you think nobody is going to attack a product with 30 users.

If you made it this far, thanks for reading. Have you experienced something
similar? An attack, a security scare, a mistake that cost you
money? I'd love to hear about it. Write to me
— we all learn from each other's mistakes.
