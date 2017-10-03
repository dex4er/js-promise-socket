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

#### constructor

```js
const promiseSocket = new PromiseSocket(socket)
```

`PromiseSocket` object requires `socket` object to work. New
[`net.Socket`](https://nodejs.org/api/net.html#net_new_net_socket_options)
object is created if `socket` argument is missing.

_Example:_

```js
const net = require('net')
const { PromiseSocket } = require('promise-socket')

const socket = new net.Socket()

const promiseSocket = new PromiseSocket(socket)
```

_Typescript:_

```js
import * as net 'net'
import { PromiseSocket } as 'promise-socket'

const socket = new net.Socket()

const promiseSocket = new PromiseSocket(socket)
```

#### stream

```js
const socket = promiseSocket.stream
```

Original socket object.

_Example:_

```js
console.log(promiseSocket.stream.localAddress)
```

#### setTimeout(ms)

Set the timeout for idle socket and after this timeout the socket will be ended.
It means that `read` or `write` methods will be also fulfilled.

```js
socket.setTimeout(1000)
await socket.readAll()
```

#### stream

```js
const stream = promiseDuplex.stream
```

Original stream object.

_Example:_

```js
console.log(promiseDuplex.stream.localAddress)
```

#### read

```js
const chunk = await promiseDuplex.read(chunkSize)
```

Check
[`PromiseReadable.read`](https://www.npmjs.com/package/promise-readable#read)
for details.

#### readAll

```js
const content = await promiseDuplex.readAll()
```

Check
[`PromiseReadable.readAll`](https://www.npmjs.com/package/promise-readable#readall)
for details.

#### write

```js
await promiseDuplex.write(chunk)
```

Check
[`PromiseWritable.write`](https://www.npmjs.com/package/promise-writable#write)
for details.

#### writeAll

```js
await promiseDuplex.writeAll(content, chunkSize)
```

Check
[`PromiseWritable.writeAll`](https://www.npmjs.com/package/promise-writable#writeall)
for details.

#### end

```js
await promiseDuplex.end()
```

Check
[`PromiseWritable.once`](https://www.npmjs.com/package/promise-writable#end)
for details.

#### once

```js
const result = await promiseDuplex.once(event)
```

Check
[`PromiseReadable.once`](https://www.npmjs.com/package/promise-readable#once)
and
[`PromiseWritable.once`](https://www.npmjs.com/package/promise-writable#once)
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
