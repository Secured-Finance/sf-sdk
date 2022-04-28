# Chainlink Node

## Description
Docker Compose sample for Chainlink Node

## Installation
1. Run the following commands.
```bash
$ cd chainlink-node
# Copy .env file
$ cp .env.sample .env
# Set email & password to login
$ echo "user@secured-finance.com" > data/.api
$ echo "login_password" >> data/.api
# Set wallet password
$ echo "my_wallet_password" > data/.password
```

2. Update following variables in the `.env`.

- `ETH_URL`
- `ETH_CHAIN_ID`
- `LINK_CONTRACT_ADDRESS`


## Running the Chainlink Node
1. Run `docker-compose up -d`.
2. Open `http://localhost:6688`.
3. Register a Bride with following parameters:

| key | value |
| ------------- | ------------- |
| Name  | filecoin  |
| Bridge URL  | http://adapter:3000/filecoin/message  |
| Minimum Contract Payment  | 0  |
| Confirmations  | 0  |

4. Register a Job using `./chainlink-node/jobs/get_filecoin_message.toml`.
* Note to need to replace `<YOUR_ORACLE_ADDRESS>` in the toml file to your oracle contract address.
5. Send ETH to Account Address.
