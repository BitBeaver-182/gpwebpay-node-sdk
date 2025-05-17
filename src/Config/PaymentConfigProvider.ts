import { InvalidArgumentException } from "../Exceptions/InvalidArgumentException";
import type { DepositFlag } from "../Param/DepositFlag";
import type { MerchantNumber } from "../Param/MerchantNumber";
import type { ResponseUrl } from "../Param/ResponseUrl";
import type { PaymentConfig } from "./PaymentConfig";

export class PaymentConfigProvider {
	/**
	 * @var string defaultGatewayKey
	 */
	private defaultGateway: string;
	/**
	 * @var Record<string, PaymentConfig>
	 */
	private paymentConfigs: Record<string, PaymentConfig> = {};

	constructor(defaultGateway = "default") {
		this.defaultGateway = defaultGateway;
	}

	addPaymentConfig(paymentConfig: PaymentConfig): void {
		this.paymentConfigs[paymentConfig.getGateway()] = paymentConfig;
	}

	getUrl(gateway: string | null = null): string {
		return this.paymentConfigs[this.getGateway(gateway)].getUrl();
	}

	getMerchantNumber(gateway: string | null = null): MerchantNumber {
		return this.paymentConfigs[this.getGateway(gateway)].getMerchantNumber();
	}

	getDepositFlag(gateway: string | null = null): DepositFlag {
		return this.paymentConfigs[this.getGateway(gateway)].getDepositFlag();
	}

	getDefaultGateway(): string {
		return this.defaultGateway;
	}

	setDefaultGateway(gateway: string): void {
		this.defaultGateway = gateway;
	}

	getGateway(gateway: string | null = null): string {
		const resolvedGateway = gateway ?? this.getDefaultGateway();

		if (
			!Object.prototype.hasOwnProperty.call(
				this.paymentConfigs,
				resolvedGateway,
			)
		) {
			throw new InvalidArgumentException(
				`Config for key: "${resolvedGateway}" not exist. Possible keys are: "${Object.keys(this.paymentConfigs).join(", ")}"`,
			);
		}

		return resolvedGateway;
	}

	getResponseUrl(gateway: string | null = null): ResponseUrl | null {
		return (
			this.paymentConfigs[this.getGateway(gateway)]?.getResponseUrl() ?? null
		);
	}
}
