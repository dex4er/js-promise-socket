import chai, {expect} from "chai"

import dirtyChai from "dirty-chai"
chai.use(dirtyChai)

import {PromiseSocket, TimeoutError} from "../src/promise-socket"

import {And, Feature, Given, Scenario, Then, When} from "./lib/steps"

import {delay} from "./lib/delay"

import {MockSocket} from "./lib/mock-socket"

Feature("Test promise-socket module for setTimeout method", () => {
  Scenario("Set timeout for socket", () => {
    let error: TimeoutError
    let promiseSocket: PromiseSocket<MockSocket>
    let socket: MockSocket

    Given("Socket object", () => {
      socket = new MockSocket()
    })

    And("PromiseSocket object", () => {
      promiseSocket = new PromiseSocket(socket)
    })

    When("I call connect method", () => {
      promiseSocket.connect({port: 0, host: "delayed"}).catch(err => {
        error = err
      })
    })

    And("I set timeout for socket", () => {
      promiseSocket.setTimeout(500)
    })

    And("I wait for more than timeout", () => delay(1000))

    Then("promise is rejected", () => {
      expect(error).to.be.an.instanceof(TimeoutError)
    })
  })

  Scenario("Set timeout for socket two times", () => {
    let error: TimeoutError
    let promiseSocket: PromiseSocket<MockSocket>
    let socket: MockSocket

    Given("Socket object", () => {
      socket = new MockSocket()
    })

    And("PromiseSocket object", () => {
      promiseSocket = new PromiseSocket(socket)
    })

    When("I call connect method", () => {
      promiseSocket.connect({port: 0, host: "delayed"}).catch(err => {
        error = err
      })
    })

    And("I set timeout for socket first time", () => {
      promiseSocket.setTimeout(2000)
    })

    And("I set timeout for socket another time", () => {
      promiseSocket.setTimeout(500)
    })

    And("I wait for more than timeout", () => delay(1000))

    Then("promise is rejected", () => {
      expect(error).to.be.an.instanceof(TimeoutError)
    })
  })

  Scenario("Set timeout for socket then unset", () => {
    let fulfilled = false
    let promiseSocket: PromiseSocket<MockSocket>
    let socket: MockSocket

    Given("Socket object", () => {
      socket = new MockSocket()
    })

    And("PromiseSocket object", () => {
      promiseSocket = new PromiseSocket(socket)
    })

    When("I call connect method", () => {
      promiseSocket.connect({port: 0, host: "delayed"}).then(() => {
        fulfilled = true
      })
    })

    And("I set timeout for socket first time", () => {
      promiseSocket.setTimeout(500)
    })

    And("I set timeout for socket another time", () => {
      promiseSocket.setTimeout(0)
    })

    And("I wait for more than timeout and delay", () => delay(1000))

    Then("promise is fulfilled", () => {
      expect(fulfilled).to.be.true()
    })
  })
})
