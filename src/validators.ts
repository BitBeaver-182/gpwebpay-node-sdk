import { InvalidArgumentException } from "./Exceptions/InvalidArgumentException";

export function assertIsInteger(value: unknown, name: string): void {
	const errorMessage = `${name} must be integer "${value}" given.`;
	if (typeof value === "number") {
		if (!Number.isInteger(value)) {
			throw new InvalidArgumentException(errorMessage);
		}
		return;
	}

	if (typeof value === "string") {
		// Matches positive, negative, and zero integers
		if (/^-?(0|[1-9]\d*)$/.test(value)) {
			return;
		}
	}

	throw new InvalidArgumentException(errorMessage);
}

export function assertMaxLength(
	value: string | number,
	length: number,
	name: string,
): void {
	if (String(value).length > length) {
		throw new InvalidArgumentException(
			`${name} max. length is ${length}! "${String(value).length}" given.`,
		);
	}
}

export function assertLength(
	value: string | number,
	length: number,
	name: string,
): void {
	if (String(value).length !== length) {
		throw new InvalidArgumentException(
			`${name} length must be ${length}! "${String(value).length}" given.`,
		);
	}
}

/**
 * Validates whether a string is a valid email address
 * @param {string} value - The string to validate as an email
 * @throws {InvalidArgumentException} If the value is not a valid email address
 */
export function assertIsEmail(value: string): void {
	// RFC 5322 compliant regex for email validation
	const regex =
		/^((?:[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~]|(?<=^|\.)"|"(?=$|\.|@)|(?<=".*)[ .](?=.*")|(?<!\.)\.){1,64})(@)((?:[A-Za-z0-9.\-])*(?:[A-Za-z0-9])\.(?:[A-Za-z0-9]){2,})$/;

	if (!regex.test(value)) {
		throw new InvalidArgumentException(`EMAIL is not valid! "${value}" given.`);
	}
}

export function assertUrl(url: string): void {
	const regex =
		/^(?:(?:https?|ftp):\/\/)(?:[^\s:@\/?#]+(?::[^\s:@\/?#]*)?@)?(?:[\p{L}\p{N}\p{M}\-._~%]+(?:\.[\p{L}\p{N}\p{M}\-._~%]+)*|\[[\dA-Fa-f:.]+\])(?::\d{2,5})?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/u;

	if (!regex.test(url)) {
		throw new InvalidArgumentException("URL is Invalid.");
	}
}
