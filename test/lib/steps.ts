import Mocha from "mocha"
import * as MochaSteps from "mocha-steps"

export function Feature(what: string, how: () => void): Mocha.Suite {
  return Mocha.describe("Feature: " + what, how)
}
export function Scenario(what: string, how: () => void): Mocha.Suite {
  return Mocha.describe("Scenario: " + what, how)
}
export function Given(what: string, how: (done: Mocha.Done) => void): Mocha.Test {
  return MochaSteps.step("Given " + what, how)
}
export function When(what: string, how: (done: Mocha.Done) => void): Mocha.Test {
  return MochaSteps.step("When " + what, how)
}
export function Then(what: string, how: (done: Mocha.Done) => void): Mocha.Test {
  return MochaSteps.step("Then " + what, how)
}
export function And(what: string, how: (done: Mocha.Done) => void): Mocha.Test {
  return MochaSteps.step("And " + what, how)
}
