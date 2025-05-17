export class GPWebPayException extends Error {
	constructor(message?: string, code?: number) {
		super(message);
		this.name = "GPWebPayException";
		if (code !== undefined) {
			this.code = code;
		}
		// Set the prototype explicitly.
		Object.setPrototypeOf(this, GPWebPayException.prototype);
	}

	readonly code?: number;
}
