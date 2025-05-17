import { AmountInPennies } from "@/Param/AmountInPennies";
import { Currency } from "@/Param/Currency";
import { Currency as CurrencyEnum } from "@/Enum/Currency";
import { Operation } from "@/Data/Operation";
import { OrderNumber } from "@/Param/OrderNumber";
import { ResponseUrl } from "@/Param/ResponseUrl";
import { DEFAULT_GATEWAY } from "./config";

export const createOperation = () => {
  return new Operation(
    new OrderNumber('123456'),
    new AmountInPennies(100000),
    new Currency(CurrencyEnum.CZK),
    DEFAULT_GATEWAY,
    new ResponseUrl('http://test.com')
  );
}
