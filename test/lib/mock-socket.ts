import {Socket, SocketConnectOpts} from "node:net"

export class MockSocket extends Socket {
  readable = true
  writable = true

  port?: number
  host?: string

  constructor() {
    super()
  }

  connect(options: SocketConnectOpts, connectionListener?: () => void): this
  connect(port: number, host: string, connectionListener?: () => void): this
  connect(port: number, connectionListener?: () => void): this
  connect(path: string, connectionListener?: () => void): this

  connect(arg1: any, arg2?: any, arg3?: any): this {
    let connectionListener: (() => void) | undefined
    if (typeof arg1 === "object") {
      this.port = arg1.port
      this.host = arg1.host
    } else if (typeof arg1 === "function") {
      connectionListener = arg1
    } else {
      this.port = arg1
    }
    if (typeof arg2 === "function") {
      connectionListener = arg2
    } else if (typeof arg2 === "string") {
      this.host = arg2
    }
    if (typeof arg3 === "function") {
      connectionListener = arg3
    }
    if (this.host === "badhost") {
      this.emit("error", new Error("badhost"))
    } else if (this.host === "delayed") {
      setTimeout(() => {
        if (typeof connectionListener === "function") {
          connectionListener()
        }
      }, 1000)
    } else if (typeof connectionListener === "function") {
      connectionListener()
    }
    return this
  }

  pause(): this {
    return this
  }

  resume(): this {
    return this
  }

  setTimeout(timeout: number): this {
    setTimeout(() => this.emit("timeout"), timeout)
    return this
  }
}
