import { ConfigFactory } from "@/Config/Factory/ConfigFactory";
import { PaymentConfigFactory } from "@/Config/Factory/PaymentConfigFactory";
import path from "path";

export const DEFAULT_GATEWAY = "czk";

export const createConfig = () => {
  const factory = new ConfigFactory(new PaymentConfigFactory());
  return factory.create({
    'czk': {
      [ConfigFactory.PRIVATE_KEY]: path.join(__dirname, '../_certs/test.pem'),
      [ConfigFactory.PRIVATE_KEY_PASSPHRASE]: '1234567',
      [ConfigFactory.PUBLIC_KEY]: path.join(__dirname, '../_certs/test-pub.pem'),
      [ConfigFactory.URL]: 'https://test.3dsecure.gpwebpay.com/unicredit/order.do',
      [ConfigFactory.MERCHANT_NUMBER]: '123456789',
      [ConfigFactory.DEPOSIT_FLAG]: 1,
    },
    'eur': {
      [ConfigFactory.PRIVATE_KEY]: path.join(__dirname, '../_certs/test2.pem'),
      [ConfigFactory.PRIVATE_KEY_PASSPHRASE]: '12345678',
      [ConfigFactory.PUBLIC_KEY]: path.join(__dirname, '../_certs/test-pub2.pem'),
      [ConfigFactory.URL]: 'https://test.3dsecure.gpwebpay.com/unicredit/order.do',
      [ConfigFactory.MERCHANT_NUMBER]: '123456780',
      [ConfigFactory.DEPOSIT_FLAG]: 1,
    }
  }, DEFAULT_GATEWAY)
}