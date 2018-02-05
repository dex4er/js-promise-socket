/// <reference types="node" />

import net from 'net'

import PromiseDuplex from 'promise-duplex'

export class PromiseSocket<TSocket extends net.Socket> extends PromiseDuplex<TSocket> {
  constructor (socket?: TSocket)

  connect(port: number): Promise<void>
  connect(path: string): Promise<void>
  connect(options: object): Promise<void>

  setTimeout (timeout: number): void
}

export default PromiseSocket
