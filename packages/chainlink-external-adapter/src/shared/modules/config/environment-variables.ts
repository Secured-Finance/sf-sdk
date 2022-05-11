export interface IEnvironmentVariables {
  port: number;
  auth: {
    username: string;
    password: string;
  };
  filecoin: {
    rpcEndpoint: string;
  };
}

export const environmentVariables = (): IEnvironmentVariables => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  auth: {
    username: process.env.HTTP_BASIC_USERNAME,
    password: process.env.HTTP_BASIC_PASSWORD,
  },
  filecoin: {
    rpcEndpoint: process.env.FILECOIN_RPC_ENDPOINT,
  },
});
