'use strict'

const t = require('tap')
require('tap-given')(t)

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

const PromiseSocket = require('../lib/promise-socket')

const EventEmitter = require('events').EventEmitter
const delay = require('delay')

class MockSocket extends EventEmitter {
  constructor () {
    super()
    this.readable = true
    this.writable = true
  }
  connect (port, host, callback) {
    let options = {}
    if (typeof port === 'object') {
      options = port
    } else if (typeof port === 'function') {
      callback = port
    } else {
      options = { port: port }
    }
    if (typeof host === 'function') {
      callback = host
    } else if (typeof host === 'string') {
      options.host = host
    }
    this.port = options.port
    this.host = options.host
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

Feature('Test promise-socket module', () => {
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
})

Feature('Test promise-socket module', () => {
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

    And('port is undefined', () => {
      (typeof socket.port).should.equal('undefined')
    })

    And('host is undefined', () => {
      (typeof socket.host).should.equal('undefined')
    })
  })

  Scenario('Connect with object argument', () => {
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
      promise = promiseSocket.connect({ port: 1234, host: 'host' })
    })

    And('connect event is emitted', () => {
      socket.emit('connect')
    })

    Then('promise is fulfilled', () => {
      return promise.should.eventually.be.undefined
    })

    And('port is correct', () => {
      socket.port.should.be.equal(1234)
    })

    And('host is correct', () => {
      socket.host.should.be.equal('host')
    })
  })

  Scenario('Connect with port argument', () => {
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
      promise = promiseSocket.connect(1234)
    })

    And('connect event is emitted', () => {
      socket.emit('connect')
    })

    Then('promise is fulfilled', () => {
      return promise.should.eventually.be.undefined
    })

    And('port is correct', () => {
      socket.port.should.be.equal(1234)
    })

    And('host is undefined', () => {
      (typeof socket.host).should.equal('undefined')
    })
  })

  Scenario('Connect with port and host arguments', () => {
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
      promise = promiseSocket.connect(1234, 'host')
    })

    And('connect event is emitted', () => {
      socket.emit('connect')
    })

    Then('promise is fulfilled', () => {
      return promise.should.eventually.be.undefined
    })

    And('port is correct', () => {
      socket.port.should.be.equal(1234)
    })

    And('host is correct', () => {
      socket.host.should.be.equal('host')
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
      promise = promiseSocket.connect({ host: 'badhost' })
    })

    Then('promise is rejected', () => {
      return promise.should.be.rejectedWith(Error, 'badhost')
    })
  })

  Scenario('Connect for socket with error emitted before method', () => {
    let promise
    let promiseSocket
    let socket

    Given('Socket object', () => {
      socket = new MockSocket()
    })

    And('PromiseSocket object', () => {
      promiseSocket = new PromiseSocket(socket)
    })

    Given('Socket object emitted error event', () => {
      socket.emit('error', new Error('unknown'))
    })

    When('I call connect method', () => {
      promise = promiseSocket.connect()
    })

    Then('promise is rejected', () => {
      return promise.should.be.rejectedWith(Error, 'unknown')
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
