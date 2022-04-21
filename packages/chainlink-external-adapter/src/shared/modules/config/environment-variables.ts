export interface IEnvironmentVariables {
  port: number;
  filecoin: {
    rpcEndpoint: string;
  };
}

export const environmentVariables = (): IEnvironmentVariables => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  filecoin: {
    rpcEndpoint: process.env.FILECOIN_RPC_ENDPOINT,
  },
});
