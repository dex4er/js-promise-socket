'use strict'

const t = require('tap')
require('tap-given')(t)

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

Feature('Test promise-socket module', () => {
  const PromiseSocket = require('../lib/promise-socket').PromiseSocket
  const EventEmitter = require('events').EventEmitter

  const delay = require('delay')

  class MockSocket extends EventEmitter {
    constructor () {
      super()
      this.readable = true
      this.writable = true
    }
    connect (options, callback) {
      options = options || {}
      if (options.host === 'badhost') {
        this.emit('error', new Error('badhost'))
      } else {
        callback()
      }
    }
    pause () {}
    resume () {}
    setTimeout (timeout) {
      setTimeout(() => this.emit('end'), timeout)
    }
  }

  Scenario('Connect', () => {
    let promise
    let promiseSocket
    let socket

    Given('Socket object', () => {
      socket = new MockSocket()
    })

    And('PromiseSocket object', () => {
      promiseSocket = new PromiseSocket(socket)
    })

    When('I call connect method', () => {
      promise = promiseSocket.connect()
    })

    And('connect event is emitted', () => {
      socket.emit('connect')
    })

    Then('promise is fulfilled', () => {
      return promise.should.eventually.be.undefined
    })
  })

  Scenario('Connect for socket with error', () => {
    let promise
    let promiseSocket
    let socket

    Given('Socket object', () => {
      socket = new MockSocket()
    })

    And('PromiseSocket object', () => {
      promiseSocket = new PromiseSocket(socket)
    })

    When('I call connect method', () => {
      promise = promiseSocket.connect({host: 'badhost'})
    })

    Then('promise is rejected', () => {
      return promise.should.be.rejectedWith(Error, 'badhost')
    })
  })

  Scenario('Set timeout for socket', () => {
    let promise
    let promiseSocket
    let socket

    Given('Socket object', () => {
      socket = new MockSocket()
    })

    And('PromiseSocket object', () => {
      promiseSocket = new PromiseSocket(socket)
    })

    When('I subscribe for end event', () => {
      promise = promiseSocket.once('end')
    })

    And('I set timeout for socket', () => {
      promiseSocket.setTimeout(500)
    })

    And('I wait for more that timeout', () => {
      return delay(1000)
    })

    Then('socket is ended', () => {
      return promise.should.be.fulfilled
    })
  })

  Scenario('Set timeout for socket two times', () => {
    let promise
    let promiseSocket
    let socket

    Given('Socket object', () => {
      socket = new MockSocket()
    })

    And('PromiseSocket object', () => {
      promiseSocket = new PromiseSocket(socket)
    })

    When('I subscribe for end event', () => {
      promise = promiseSocket.once('end')
    })

    And('I set timeout for socket first time', () => {
      promiseSocket.setTimeout(2000)
    })

    And('I set timeout for socket another time', () => {
      promiseSocket.setTimeout(500)
    })

    And('I wait for more that timeout', () => {
      return delay(1000)
    })

    Then('socket is ended', () => {
      return promise.should.be.fulfilled
    })
  })
})
