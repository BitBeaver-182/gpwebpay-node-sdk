# GPWebPay Node.js SDK

A TypeScript SDK for integrating the [GP WebPay](http://www.gpwebpay.cz/) payment gateway into Node.js applications. This package provides a secure and type-safe way to generate payment requests, handle responses, and manage cryptographic signatures.

> 📘 Adapted from [Pixidos/gpwebpay-core](https://github.com/Pixidos/gpwebpay-core) PHP library and based on the [official GP WebPay documentation](https://gpwebpay-core.readthedocs.io/en/latest/)

## Features

- ✅ **Secure Payment Requests** - Generate signed payment URLs with RSA encryption
- ✅ **Response Validation** - Verify and process GP WebPay responses
- ✅ **Full TypeScript Support** - Complete type definitions and IntelliSense
- ✅ **Multiple Currencies** - Support for EUR, CZK, USD, and more
- ✅ **Flexible Configuration** - Single or multi-gateway setup
- ✅ **Production Ready** - Based on official GP WebPay protocol v1.6+

## Installation

```bash
npm install gpwebpay-node-sdk
```

## Quick Start

### 1. Configuration

First, set up your GP WebPay configuration with your merchant credentials:

```typescript
import {
  PaymentConfigProvider,
  SignerConfigProvider,
  PrivateKey,
  PublicKey,
  MerchantNumber,
  ResponseUrl,
  DepositFlag
} from 'gpwebpay-node-sdk';

// Load your RSA keys (PEM format)
const privateKeyContent = `-----BEGIN PRIVATE KEY-----
... your private key content ...
-----END PRIVATE KEY-----`;

const publicKeyContent = `-----BEGIN PUBLIC KEY-----
... GP WebPay's public key content ...
-----END PUBLIC KEY-----`;

// Create configuration
const paymentConfig = new PaymentConfigProvider();
const signerConfig = new SignerConfigProvider();

// Add your gateway configuration
paymentConfig.addGateway(
  'default', // gateway name
  'https://test.3dsecure.gpwebpay.com/pgw/order.do', // GP WebPay URL (test)
  new MerchantNumber('123456'), // Your merchant number
  DepositFlag.INSTANT_SETTLEMENT, // or DepositFlag.DELAYED_SETTLEMENT
  new ResponseUrl('https://your-website.com/payment/callback') // Your callback URL
);

// Add signing configuration
signerConfig.addGateway(
  'default',
  new PrivateKey(privateKeyContent, 'optional-passphrase'),
  new PublicKey(publicKeyContent)
);
```

### 2. Creating a Payment Request

```typescript
import {
  RequestFactory,
  Operation,
  OrderNumber,
  AmountInPennies,
  CurrencyEnum,
  SignerProvider
} from 'gpwebpay-node-sdk';

// Create factories
const signerProvider = new SignerProvider(signerConfig);
const requestFactory = new RequestFactory(paymentConfig, signerProvider);

// Create a payment operation
const operation = new Operation(
  new OrderNumber('ORDER-2024-001'), // Unique order ID
  new AmountInPennies(299900), // Amount in pennies (2999.00)
  CurrencyEnum.EUR, // Currency
  'default' // Gateway name (optional if only one gateway)
);

// Generate the payment request
const request = requestFactory.create(operation);

// Get the payment URL
const paymentUrl = request.getUrl(); // User redirects to this URL
const requestParams = request.getParams(); // All parameters as object
```

### 3. Handling Payment Responses

When the user completes payment, GP WebPay redirects them back to your `responseUrl` with payment data:

```typescript
import {
  ResponseFactory,
  ResponseProvider
} from 'gpwebpay-node-sdk';

// In your callback endpoint handler
app.post('/payment/callback', (req, res) => {
  try {
    // Create response factory
    const responseFactory = new ResponseFactory(paymentConfig, signerProvider);
    const responseProvider = new ResponseProvider();

    // Parse the response data from GP WebPay
    const response = responseFactory.create(req.body); // or req.query for GET

    // Verify the response signature
    if (!responseProvider.isValid(response)) {
      throw new Error('Invalid response signature');
    }

    // Check payment result
    const orderNumber = response.getOrderNumber().toString();
    const prCode = response.getPrCode(); // Primary result code
    const srCode = response.getSrCode(); // Secondary result code

    if (prCode === 0 && srCode === 0) {
      // ✅ Payment successful
      console.log(`Payment successful for order: ${orderNumber}`);
      res.redirect('/payment/success');
    } else {
      // ❌ Payment failed
      console.log(`Payment failed: PrCode=${prCode}, SrCode=${srCode}`);
      res.redirect('/payment/failed');
    }

  } catch (error) {
    console.error('Payment processing error:', error);
    res.redirect('/payment/error');
  }
});
```

## Advanced Usage

### Multiple Gateways

You can configure multiple payment gateways for different purposes:

```typescript
// Test gateway
paymentConfig.addGateway(
  'test',
  'https://test.3dsecure.gpwebpay.com/pgw/order.do',
  new MerchantNumber('123456'),
  DepositFlag.INSTANT_SETTLEMENT,
  new ResponseUrl('https://your-website.com/payment/test-callback')
);

// Production gateway
paymentConfig.addGateway(
  'production',
  'https://3dsecure.gpwebpay.com/pgw/order.do',
  new MerchantNumber('789012'),
  DepositFlag.INSTANT_SETTLEMENT,
  new ResponseUrl('https://your-website.com/payment/callback')
);

// Use specific gateway
const operation = new Operation(
  new OrderNumber('ORDER-001'),
  new AmountInPennies(50000),
  CurrencyEnum.CZK,
  'production' // Specify gateway
);
```

### Additional Payment Parameters

Add optional parameters to customize the payment:

```typescript
import {
  Description,
  Email,
  MerOrderNum,
  Lang
} from 'gpwebpay-node-sdk';

const operation = new Operation(
  new OrderNumber('ORDER-001'),
  new AmountInPennies(199900),
  CurrencyEnum.EUR
);

// Add optional parameters
operation.addParam(new Description('Premium subscription'));
operation.addParam(new Email('customer@example.com'));
operation.addParam(new MerOrderNum('INTERNAL-REF-123'));
operation.addParam(new Lang('en')); // 'en', 'cs', 'sk', 'de', etc.

const request = requestFactory.create(operation);
```

### Supported Currencies

```typescript
import { CurrencyEnum } from 'gpwebpay-node-sdk';

// Available currencies
CurrencyEnum.CZK  // Czech Koruna
CurrencyEnum.EUR  // Euro
CurrencyEnum.USD  // US Dollar
CurrencyEnum.GBP  // British Pound
CurrencyEnum.HUF  // Hungarian Forint
CurrencyEnum.PLN  // Polish Zloty
// ... and more
```

### Environment Configuration

Use environment variables for sensitive configuration:

```typescript
// .env file
GPWEBPAY_MERCHANT_NUMBER=123456
GPWEBPAY_PRIVATE_KEY_PATH=/path/to/private.key
GPWEBPAY_PUBLIC_KEY_PATH=/path/to/public.key
GPWEBPAY_URL=https://test.3dsecure.gpwebpay.com/pgw/order.do
GPWEBPAY_RESPONSE_URL=https://your-website.com/payment/callback

// Load configuration from environment
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const privateKey = new PrivateKey(
  fs.readFileSync(process.env.GPWEBPAY_PRIVATE_KEY_PATH!, 'utf8')
);

const publicKey = new PublicKey(
  fs.readFileSync(process.env.GPWEBPAY_PUBLIC_KEY_PATH!, 'utf8')
);

paymentConfig.addGateway(
  'default',
  process.env.GPWEBPAY_URL!,
  new MerchantNumber(process.env.GPWEBPAY_MERCHANT_NUMBER!),
  DepositFlag.INSTANT_SETTLEMENT,
  new ResponseUrl(process.env.GPWEBPAY_RESPONSE_URL!)
);
```

## Error Handling

The SDK provides specific exception types for different error scenarios:

```typescript
import {
  GPWebPayException,
  InvalidArgumentException,
  SignerException
} from 'gpwebpay-node-sdk';

try {
  const request = requestFactory.create(operation);
} catch (error) {
  if (error instanceof InvalidArgumentException) {
    console.error('Invalid parameter:', error.message);
  } else if (error instanceof SignerException) {
    console.error('Signing error:', error.message);
  } else if (error instanceof GPWebPayException) {
    console.error('GPWebPay error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Testing

For testing, use GP WebPay's test environment:

- **Test URL**: `https://test.3dsecure.gpwebpay.com/pgw/order.do`
- **Test Cards**: Use GP WebPay's test card numbers for various scenarios
- **Test Merchant Numbers**: Obtain from GP WebPay support for testing

## Getting Credentials

To use GP WebPay, you need:

1. **Merchant Agreement** with GP WebPay or your acquiring bank
2. **Merchant Number** provided by GP WebPay
3. **RSA Key Pair**:
   - Generate your private key
   - Submit your public key to GP WebPay
   - Receive GP WebPay's public key for signature verification
4. **Test Environment Access** for development

Contact [GP WebPay support](mailto:podpora@gpwebpay.cz) or your acquiring bank for setup.

## API Reference

### Core Classes

- **`PaymentConfigProvider`** - Manages payment gateway configurations
- **`SignerConfigProvider`** - Manages RSA key configurations
- **`RequestFactory`** - Creates signed payment requests
- **`ResponseFactory`** - Processes payment responses
- **`Operation`** - Represents a payment operation
- **`SignerProvider`** - Handles cryptographic signing

### Parameters

- **`OrderNumber`** - Unique transaction identifier
- **`AmountInPennies`** - Payment amount (in smallest currency unit)
- **`Currency`** - Payment currency
- **`MerchantNumber`** - Your GP WebPay merchant ID
- **`ResponseUrl`** - Callback URL for payment results
- **`Description`** - Payment description
- **`Email`** - Customer email address

### Enums

- **`CurrencyEnum`** - Supported currencies
- **`OperationEnum`** - Payment operations (CREATE_ORDER, etc.)
- **`DepositFlagEnum`** - Settlement types

## Resources

- [📘 GP WebPay PHP Documentation](https://gpwebpay-core.readthedocs.io/en/latest/)
- [📘 GP WebPay Developer Portal](https://developer.gpwebpay.cz/en/p/webpay/)
- [🔗 Official GP WebPay Website](http://www.gpwebpay.cz/)

## License

MIT License - see [LICENSE](LICENSE) file for details.

Adapted from [Pixidos/gpwebpay-core](https://github.com/Pixidos/gpwebpay-core) PHP library.
