# Changelog

## v7.0.0 2020-08-11

- Requires Node >= 10.
- Converted from tslint to eslint.
- Uses @types/node v14.

## v6.0.3 2019-12-26

- promise-readable@5.0.4: chunk returned by `read` method might be an empty
  string.

## v6.0.2 2019-10-07

- Use `mocha-steps` for testing.

## v6.0.1 2019-10-07

- Compatibility with newer NodeJS typings.
- Updated dependencies.

## v6.0.0 2019-07-15

- Uses promise-readable and promise-writable v5.
- `writeAll` method doesn't close a socket.
- `PromiseReadable` implements `AsyncIterable` so it is possible to use
  `for await (const chunk of promiseReadable)` loop.
- New method `iterate` is provided.

## v5.0.0 2019-06-14

- Method `setTimeout` sets an event handler that destroys a socket with
  `TimeoutError`. The handler is removed if timeout is equal `0`.

## v4.0.1 2019-06-04

- Minor tweaks in README.
- Added source map to the package.

## v4.0.0 2019-05-10

- Rewritten in Typescript.
- Dropped support for Node < 6.

## v3.1.1 2018-05-22

- Support `connect(port, host)` method arguments, again.

## v3.1.0 2018-05-19

- Support `connect(port, host)` method arguments (not really).

## v3.0.2 2018-03-12

- Use markdownlint.

## v3.0.1 2018-02-13

- Tweaks for example BSMTP client.

## v3.0.0 2018-02-05

- New method `destroy`.
- Support for `import PromiseSocket from 'promise-socket'` syntax.
- Upgraded promise-readable@3, promise-writable@3 and promise-duplex@3.

## v2.0.2 2017-10-17

- Requires promise-duplex@2.0.3.

## v2.0.1 2017-10-06

- Do not use UMD import internally.

## v2.0.0 2017-10-06

- Use native `Promise` rather than `any-event`.

## v1.0.1 2017-10-06

- Typescript: reference additional modules in our typings file.

## v1.0.0 2017-10-02

- Exports also as a class and namespace and the default.
- Typings for Typescript.
- Based on promise-duplex@1.x.x

## v0.0.2 2017-06-22

- Upgraded chai@4.0.2, chai-as-promised@7.0.0, promise-duplex@0.1.2,
  snazzy@7.0.0, standard@10.0.2, tap@10.5.1, tap-given@0.4.1
- Bugfixes for tests

## v0.0.1 2017-03-12

- Initial release
