'use strict'

const Promise = require('any-promise')

const PromiseDuplex = require('promise-duplex')

class PromiseSocket extends PromiseDuplex {
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

      socket.once('connect', onceConnect)
      socket.once('error', onceError)

      socket.connect(options)
    })
  }
}

module.exports = PromiseSocket
