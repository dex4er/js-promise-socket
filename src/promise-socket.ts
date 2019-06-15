/// <reference types="node" />

import * as net from "net"
import {PromiseDuplex} from "promise-duplex"

import {TimeoutError} from "./timeout-error"

export {TimeoutError} from "./timeout-error"

export class PromiseSocket<TSocket extends net.Socket> extends PromiseDuplex<TSocket> {
  private timeoutHandler?: () => void

  constructor(readonly socket: TSocket = new net.Socket() as TSocket) {
    super(socket)
  }

  connect(port: number, host?: string): Promise<void>
  connect(path: string): Promise<void>
  connect(options: net.SocketConnectOpts): Promise<void>

  connect(arg1: any, arg2?: any): Promise<void> {
    const socket = this.stream

    return new Promise((resolve, reject) => {
      if (this.readable._errored) {
        const err = this.readable._errored
        this.readable._errored = undefined
        reject(err)
      }

      if (this.writable._errored) {
        const err = this.writable._errored
        this.writable._errored = undefined
        reject(err)
      }

      const connectHandler = () => {
        socket.removeListener("error", errorHandler)
        resolve()
      }

      const errorHandler = (err: Error) => {
        this.readable._errored = undefined
        this.writable._errored = undefined
        socket.removeListener("connect", connectHandler)
        reject(err)
      }

      socket.once("error", errorHandler)
      if (arg2 !== undefined) {
        socket.connect(arg1, arg2, connectHandler)
      } else {
        socket.connect(arg1, connectHandler)
      }
    })
  }

  setTimeout(timeout: number): void {
    const socket = this.stream

    if (timeout === 0) {
      if (this.timeoutHandler) {
        socket.removeListener("timeout", this.timeoutHandler)
        this.timeoutHandler = undefined
      }
    } else {
      if (!this.timeoutHandler) {
        this.timeoutHandler = () => {
          this.timeoutHandler = undefined
          socket.destroy(new TimeoutError())
        }
        socket.once("timeout", this.timeoutHandler)
      }
    }

    socket.setTimeout(timeout)
  }
}

export default PromiseSocket
