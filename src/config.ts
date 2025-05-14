import dotenv from "dotenv";
dotenv.config();

export const config = {
  merchantId: process.env.GP_MERCHANT_ID || "",
  merchantKey: process.env.GP_MERCHANT_KEY || "",
  returnUrl: process.env.GP_RETURN_URL || "",
  gatewayUrl: process.env.GP_GATEWAY_URL || "",
};
