// Assuming ResponseError is defined elsewhere in your project

import { ResponseError } from "../Data/ResponseError";

// Custom exception class extending native Error in TypeScript
export class GPWebPayResultException extends Error {
  private resultText: string | null;
  private error: ResponseError;

  // Constructor signature
  constructor(
    message: string,
    prCode: number,
    srCode: number,
    resultText: string | null = null,
    code: number = 0,
    previous?: Error
  ) {
    super(message); // Pass the message to the base class constructor
    this.name = 'GPWebPayResultException'; // Set the name of the error class
    this.resultText = resultText;
    this.error = new ResponseError(prCode, srCode);

    // Attach the stack trace if available
    if (previous) {
      this.stack = previous.stack;
    }
  }

  // Getter for prCode
  public getPrcode(): number {
    return this.error.getPrcode();
  }

  // Getter for srCode
  public getSrcode(): number {
    return this.error.getSrcode();
  }

  // Getter for resultText
  public getResultText(): string | null {
    return this.resultText;
  }

  // Translate function to get error message based on the language
  public translate(lang: string): string {
    return this.error.getMessage(lang);
  }
}
