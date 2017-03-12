## promise-socket

[![Build Status](https://secure.travis-ci.org/dex4er/js-promise-socket.svg)](http://travis-ci.org/dex4er/js-promise-socket) [![Coverage Status](https://coveralls.io/repos/github/dex4er/js-promise-socket/badge.svg)](https://coveralls.io/github/dex4er/js-promise-socket) [![npm](https://img.shields.io/npm/v/promise-socket.svg)](https://www.npmjs.com/package/promise-socket)

This module allows to convert
[`net.Socket`](https://nodejs.org/api/net.html#net_class_net_socket)
stream into its promisified version, which returns [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
object fulfilled when stream's events occurred.

### Requirements

This module requires Node >= 4.

### Installation

```shell
npm install promise-socket
```

### Usage

`PromiseSocket` object requires `socket` object to work:

```js
const PromiseSocket = require('promise-socket')

const socket = new net.Socket()

const promiseSocket = new PromiseSocket(socket)
```

Original socket is available with `stream` property:

```js
console.log(promiseSocket.stream.localAddress)
```

#### read

Check
[`PromiseReadable.read`](https://www.npmjs.com/package/promise-readable#read)
for details.

#### readAll

Check
[`PromiseReadable.readAll`](https://www.npmjs.com/package/promise-readable#readall)
for details.

#### write

Check
[`PromiseWritable.write`](https://www.npmjs.com/package/promise-writable#write)
for details.

#### writeAll

Check
[`PromiseWritable.writeAll`](https://www.npmjs.com/package/promise-writable#writeall)
for details.

#### end

Check
[`PromiseWritable.end`](https://www.npmjs.com/package/promise-writable#end)
for details.

#### onceOpen

Check
[`PromiseReadable.onceOpen`](https://www.npmjs.com/package/promise-readable#onceopen)
and
[`PromiseWritable.onceOpen`](https://www.npmjs.com/package/promise-writable#onceopen)
for details.

#### onceClose

Check
[`PromiseReadable.onceClose`](https://www.npmjs.com/package/promise-readable#onceclose)
and
[`PromiseWritable.onceClose`](https://www.npmjs.com/package/promise-writable#onceclose)
for details.

#### oncePipe

Check
[`PromiseWritable.onceEnd`](https://www.npmjs.com/package/promise-writable#oncepipe)
for details.

#### onceUnpipe

Check
[`PromiseWritable.onceUnpipe`](https://www.npmjs.com/package/promise-writable#onceunpipe)
for details.

#### onceEnd

Check
[`PromiseReadable.onceEnd`](https://www.npmjs.com/package/promise-readable#onceend)
for details.

### Promise

This module uses [any-promise](https://www.npmjs.com/package/any-promise) and
any ES6 Promise library or polyfill is supported.

Ie. [bluebird](https://www.npmjs.com/package/bluebird) can be used as Promise
library for this module, if it is registered before.

```js
require('any-promise/register/bluebird')
const PromiseReadable = require('promise-socket')
```

### License

Copyright (c) 2017 Piotr Roszatycki <piotr.roszatycki@gmail.com>

[MIT](https://opensource.org/licenses/MIT)
