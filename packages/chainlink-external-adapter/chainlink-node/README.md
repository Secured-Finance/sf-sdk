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
$ echo "user@example.com" > data/.api
$ echo "password" >> data/.api
# Set wallet password
$ echo "my_wallet_password" > data/.password
```

2. Update following variables in the `.env`.

- `ETH_URL`
- `ETH_CHAIN_ID`
- `LINK_CONTRACT_ADDRESS`


## Running the Chainlink Node
1. Run the following commands.
```bash
$ docker-compose up -d
$ docker exec -it chainlink chainlink local n -p /chainlink/.password -a /chainlink/.api
```

2. Open `http://localhost:6688`.
