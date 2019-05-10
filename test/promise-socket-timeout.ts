import {expect} from 'chai'

import {And, Feature, Given, Scenario, Then, When} from './lib/steps'

import {delay} from './lib/delay'

import {PromiseSocket} from '../src/promise-socket'
import {MockSocket} from './lib/mock-socket'

Feature('Test promise-socket module for setTimeout method', () => {
  Scenario('Set timeout for socket', () => {
    let fulfilled = false
    let promiseSocket: PromiseSocket<MockSocket>
    let socket: MockSocket

    Given('Socket object', () => {
      socket = new MockSocket()
    })

    And('PromiseSocket object', () => {
      promiseSocket = new PromiseSocket(socket)
    })

    When('I subscribe for end event', () => {
      promiseSocket.once('end').then(() => {
        fulfilled = true
      })
    })

    And('I set timeout for socket', () => {
      promiseSocket.setTimeout(500)
    })

    And('I wait for more that timeout', () => {
      return delay(1000)
    })

    Then('promise is fulfilled', () => {
      return expect(fulfilled).to.be.true
    })
  })

  Scenario('Set timeout for socket two times', () => {
    let fulfilled = false
    let promiseSocket: PromiseSocket<MockSocket>
    let socket: MockSocket

    Given('Socket object', () => {
      socket = new MockSocket()
    })

    And('PromiseSocket object', () => {
      promiseSocket = new PromiseSocket(socket)
    })

    When('I subscribe for end event', () => {
      promiseSocket.once('end').then(() => {
        fulfilled = true
      })
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
      return expect(fulfilled).to.be.true
    })
  })
})
