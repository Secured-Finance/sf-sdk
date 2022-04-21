import { Connector } from 'filecoin.js/builds/dist/connectors/Connector';
import { TipSetKey, TipSet } from 'filecoin.js/builds/dist/providers/Types';

export class LotusCustomClient {
  constructor(private conn: Connector) {}

  public async getTipSet(tipSetKey?: TipSetKey): Promise<TipSet> {
    const tipSet: TipSet = await this.conn.request({
      method: 'Filecoin.ChainGetTipSet',
      params: [tipSetKey],
    });
    return tipSet;
  }
}
