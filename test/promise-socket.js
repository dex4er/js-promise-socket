'use strict'

/* global Feature, Scenario, Given, When, Then */
const t = require('tap')
require('tap-given')(t)

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

Feature('Test promise-socket module', () => {
  const PromiseSocket = require('../lib/promise-socket')
  const EventEmitter = require('events')

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
  }

  Scenario('Connect', function () {
    Given('Socket object', () => {
      this.socket = new MockSocket()
    })

    Given('PromiseSocket object', () => {
      this.promiseSocket = new PromiseSocket(this.socket)
    })

    When('I call connect method', () => {
      this.promise = this.promiseSocket.connect()
    })

    When('connect event is emitted', () => {
      this.socket.emit('connect')
    })

    Then('promise is fulfilled', () => {
      return this.promise.should.eventually.be.undefined
    })
  })

  Scenario('Connect for socket with error', function () {
    Given('Socket object', () => {
      this.socket = new MockSocket()
    })

    Given('PromiseSocket object', () => {
      this.promiseSocket = new PromiseSocket(this.socket)
    })

    When('I call connect method', () => {
      this.promise = this.promiseSocket.connect({host: 'badhost'})
    })

    Then('promise is rejected', () => {
      return this.promise.should.be.rejectedWith(Error, 'badhost')
    })
  })

  Scenario('Set timeout for socket', function () {
    Given('Socket object', () => {
      this.socket = new MockSocket()
    })

    Given('PromiseSocket object', () => {
      this.promiseSocket = new PromiseSocket(this.stream)
    })

    When('I subscribe for end event', () => {
      this.promise = this.promiseSocket.once('end')
    })

    When('I set timeout for socket', () => {
      this.promiseSocket.setTimeout(500)
    })

    When('I wait for more that timeout', () => {
      return delay(1000)
    })

    Then('socket is ended', () => {
      return this.promise.should.be.fulfilled
    })
  })
})
