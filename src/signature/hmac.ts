import crypto from "crypto";

export function generateHmacSignature(params: Record<string, string>, secret: string): string {
  const values = Object.values(params);
  const message = values.join("|");
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message, "utf8");
  return hmac.digest("hex").toUpperCase();
}
