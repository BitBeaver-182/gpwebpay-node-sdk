# gpwebpay-sdk

A TypeScript SDK for interacting with the [GP WebPay](http://www.gpwebpay.cz/) payment gateway, adapted from the [Pixidos/gpwebpay-core](https://github.com/Pixidos/gpwebpay-core) PHP library.

This package provides an easy and secure way to integrate GP WebPay into Node.js applications, including payment request generation, response validation, and signature handling.

> 📘 Based on the [official GP WebPay documentation](https://gpwebpay-core.readthedocs.io/en/latest/)

---

## Features

- ✅ Generate secure payment request URLs
- ✅ Verify responses from GP WebPay
- ✅ PEM key support (RSA signing & verification)
- ✅ Based on official protocol (v1.6+)
- ✅ Fully typed TypeScript support

---

## Installation

```bash
npm install gpwebpay-sdk
```

GP WebPay Protocol Reference
For a deeper dive into supported parameters, response handling, and signature methods, see:

[📘 GPWebPay PHP Docs](https://gpwebpay-core.readthedocs.io/en/latest/)
[📘 GPWebPay Developer Docs](https://developer.gpwebpay.cz/en/p/webpay/)
[🔗 Official GP WebPay Portal](http://www.gpwebpay.cz/)

License
MIT
Adapted from Pixidos/gpwebpay-core
