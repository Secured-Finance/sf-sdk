import { Injectable, Scope } from '@nestjs/common';
import { WsJsonRpcConnector, LotusClient } from 'filecoin.js';

import { ConfigUtil } from '@shared/modules/config';
import { LotusCustomClient } from './lotus-custom-client';

@Injectable({ scope: Scope.REQUEST })
export class FilecoinLotusRepository extends LotusClient {
  public custom: LotusCustomClient;

  constructor(private configUtil: ConfigUtil) {
    const conn = new WsJsonRpcConnector({
      url: configUtil.get('filecoin.rpcEndpoint', { infer: true }),
    });
    super(conn);
    this.custom = new LotusCustomClient(conn);
  }
}
