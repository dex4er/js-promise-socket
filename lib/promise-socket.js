'use strict'

const PromiseDuplex = require('promise-duplex')

const net = require('net')

class PromiseSocket extends PromiseDuplex {
  constructor (socket) {
    socket = socket || new net.Socket()
    super(socket)
  }

  connect () {
    const args = []

    for (let len = arguments.length, key = 0; key < len; key++) {
      args[key] = arguments[key]
    }

    const socket = this.stream

    return new Promise((resolve, reject) => {
      if (this.readable._errored) {
        const err = this.readable._errored
        delete this.readable._errored
        reject(err)
      }

      if (this.writable._errored) {
        const err = this.writable._errored
        delete this.writable._errored
        reject(err)
      }

      const connectHandler = () => {
        socket.removeListener('error', errorHandler)
        resolve()
      }

      const errorHandler = e => {
        delete this.readable._errored
        delete this.writable._errored
        socket.removeListener('connect', connectHandler)
        reject(e)
      }

      socket.once('error', errorHandler)
      socket.connect.apply(socket, args.concat([connectHandler]))
    })
  }

  setTimeout (timeout) {
    const socket = this.stream

    if (!this._onceTimeout) {
      this._onceTimeout = () => {
        this._onceTimeout = undefined
        socket.end()
      }
      socket.once('timeout', this._onceTimeout)
    }

    socket.setTimeout(timeout)
  }
}

PromiseSocket.PromiseSocket = PromiseSocket
PromiseSocket.default = PromiseSocket

module.exports = PromiseSocket
