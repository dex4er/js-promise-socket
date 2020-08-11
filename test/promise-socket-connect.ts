import chai, {expect} from "chai"

import dirtyChai from "dirty-chai"
chai.use(dirtyChai)

import {PromiseSocket} from "../src/promise-socket"

import {And, Feature, Given, Scenario, Then, When} from "./lib/steps"

import {MockSocket} from "./lib/mock-socket"

Feature("Test promise-socket module for connect method", () => {
  Scenario("Connect with port argument", () => {
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
      promiseSocket.connect(0).then(() => {
        fulfilled = true
      })
    })

    And("connect event is emitted", () => {
      socket.emit("connect")
    })

    Then("promise is fulfilled", () => {
      expect(fulfilled).to.be.true()
    })

    And("port is undefined", () => {
      expect(socket.port).to.equal(0)
    })

    And("host is undefined", () => {
      expect(socket.host).to.be.undefined()
    })
  })

  Scenario("Connect with object argument", () => {
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
      promiseSocket.connect({port: 1234, host: "host"}).then(() => {
        fulfilled = true
      })
    })

    And("connect event is emitted", () => {
      socket.emit("connect")
    })

    Then("promise is fulfilled", () => {
      expect(fulfilled).to.be.true()
    })

    And("port is correct", () => {
      expect(socket.port).to.equal(1234)
    })

    And("host is correct", () => {
      expect(socket.host).to.equal("host")
    })
  })

  Scenario("Connect with port and host arguments", () => {
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
      promiseSocket.connect(1234, "host").then(() => {
        fulfilled = true
      })
    })

    And("connect event is emitted", () => {
      socket.emit("connect")
    })

    Then("promise is fulfilled", () => {
      expect(fulfilled).to.be.true()
    })

    And("port is correct", () => {
      expect(socket.port).to.equal(1234)
    })

    And("host is correct", () => {
      expect(socket.host).to.equal("host")
    })
  })

  Scenario("Connect for socket with error", () => {
    let error: Error
    let promiseSocket: PromiseSocket<MockSocket>
    let socket: MockSocket

    Given("Socket object", () => {
      socket = new MockSocket()
    })

    And("PromiseSocket object", () => {
      promiseSocket = new PromiseSocket(socket)
    })

    When("I call connect method", () => {
      promiseSocket.connect({port: 1234, host: "badhost"}).catch(err => {
        error = err
      })
    })

    Then("promise is rejected", () => {
      expect(error).to.be.an("error").with.property("message", "badhost")
    })
  })

  Scenario("Connect for socket with error emitted before method", () => {
    let error: Error
    let promiseSocket: PromiseSocket<MockSocket>
    let socket: MockSocket

    Given("Socket object", () => {
      socket = new MockSocket()
    })

    And("PromiseSocket object", () => {
      promiseSocket = new PromiseSocket(socket)
    })

    Given("Socket object emitted error event", () => {
      socket.emit("error", new Error("error"))
    })

    When("I call connect method", () => {
      promiseSocket.connect({port: 1234}).catch(err => {
        error = err
      })
    })

    Then("promise is rejected", () => {
      expect(error).to.be.an("error").with.property("message", "error")
    })
  })
})
