# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript SDK for GP WebPay payment gateway integration, organized as a Lerna monorepo using pnpm workspaces. The project is based on the Pixidos/gpwebpay-core PHP library and follows the official GP WebPay protocol v1.6+.

## Architecture

The project uses a monorepo structure with the main implementation in `packages/core/`:

- **Config/**: Configuration classes for GP WebPay settings and merchant details
- **Data/**: Data transfer objects for request/response handling
- **Enum/**: Enumerations for payment parameters (currency, language, etc.)
- **Exceptions/**: Custom exception classes for error handling
- **Factory/**: Factory classes for creating signers and other components
- **Param/**: Parameter classes for payment request building
- **Signer/**: Cryptographic signing implementation with RSA key support
  - Uses PEM key format for signing and verification
  - Includes `PrivateKey` and `PublicKey` classes with key validation
- **ResponseProvider**: Handles GP WebPay response validation and parsing

## Development Commands

Development commands can be run from the root directory:

```bash
# Build the project
pnpm build

# Run tests
pnpm test

# Type checking
pnpm typecheck

# Linting and formatting (uses Biome)
pnpm lint
pnpm format
pnpm format:fix
```

Or from within the `packages/core/` directory:

```bash
# Build the core package
pnpm run build

# Run tests
pnpm run test
pnpm run test:coverage

# Type checking
pnpm run typecheck

# Linting and formatting (uses Biome)
pnpm run lint
pnpm run format
pnpm run format:fix
```

## Monorepo Management

This project uses Lerna with pnpm workspaces:

```bash
# Install dependencies (from root)
pnpm install

# Run commands in all packages
lerna run build
lerna run test
```

## Code Standards

- **Formatter**: Biome with tab indentation and double quotes
- **Linting**: Biome with recommended rules, console statements are errors
- **TypeScript**: Strict mode enabled, CommonJS modules
- **Testing**: Vitest with coverage support
- **Path aliases**: `@/*` for src/, `@tests/*` for tests/

## Key Implementation Details

- Payment signatures use RSA-SHA256 with PEM keys
- Response validation includes signature verification
- Factory pattern used for creating signers and other components
- Configuration supports both test and production GP WebPay environments
- Uses dotenv for environment configuration