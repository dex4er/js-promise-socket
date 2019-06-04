import Mocha from "mocha"

export function Feature(what: string, how: () => void): Mocha.Suite {
  return describe("Feature: " + what, how)
}
export function Scenario(what: string, how: () => void): Mocha.Suite {
  return describe("Scenario: " + what, how)
}
export function Given(what: string, how: (done: Mocha.Done) => void): Mocha.Test {
  return it("Given " + what, how)
}
export function When(what: string, how: (done: Mocha.Done) => void): Mocha.Test {
  return it("When " + what, how)
}
export function Then(what: string, how: (done: Mocha.Done) => void): Mocha.Test {
  return it("Then " + what, how)
}
export function And(what: string, how: (done: Mocha.Done) => void): Mocha.Test {
  return it("And " + what, how)
}
export function Before(callback: (this: Mocha.Context, done: Mocha.Done) => any): void {
  before(callback)
}
export function After(callback: (this: Mocha.Context, done: Mocha.Done) => any): void {
  after(callback)
}
