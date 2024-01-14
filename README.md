# MySepolia Sample Lock Contract

This contract will lock an amount of ETH for a period of time (specified in `scripts/deploy.js`), after which the owner can withdraw the amount.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (>= 10.16.0)

## Deployment

1. Install project

```bash
npm i
```

2. Create an `.env` and add your MetaMask `PRIVATE_KEY`

3. Deploy with

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js
```
