'use strict'

const PromiseDuplex = require('promise-duplex').PromiseDuplex

const net = require('net')

class PromiseSocket extends PromiseDuplex {
  constructor (socket) {
    socket = socket || new net.Socket()
    super(socket)
  }

  connect (options) {
    const socket = this.stream

    return new Promise((resolve, reject) => {
      const onceConnect = () => {
        socket.removeListener('error', onceError)
        resolve()
      }

      const onceError = e => {
        socket.removeListener('connect', onceConnect)
        reject(e)
      }

      socket.once('error', onceError)
      socket.connect(options, onceConnect)
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
