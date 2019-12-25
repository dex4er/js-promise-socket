# promise-socket

<!-- markdownlint-disable MD013 -->

[![Build Status](https://secure.travis-ci.org/dex4er/js-promise-socket.svg)](http://travis-ci.org/dex4er/js-promise-socket) [![Coverage Status](https://coveralls.io/repos/github/dex4er/js-promise-socket/badge.svg)](https://coveralls.io/github/dex4er/js-promise-socket) [![npm](https://img.shields.io/npm/v/promise-socket.svg)](https://www.npmjs.com/package/promise-socket)

<!-- markdownlint-enable MD013 -->

This module allows to convert
[`net.Socket`](https://nodejs.org/api/net.html#net_class_net_socket) stream into
its promisified version, which returns
[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
object fulfilled when stream"s events occurred.

## Requirements

This module requires Node >= 6.

## Installation

```shell
npm install promise-socket
```

## Usage

```js
const {PromiseSocket, TimeoutError} = require("promise-socket")
```

_Typescript_:

```ts
import {PromiseSocket, TimeoutError} from "promise-socket"
// or
import PromiseSocket from "promise-socket"
```

### constructor

```js
const promiseSocket = new PromiseSocket(socket)
```

`PromiseSocket` object requires `socket` object to work. New
[`net.Socket`](https://nodejs.org/api/net.html#net_new_net_socket_options)
object is created if `socket` argument is missing.

_Example:_

```js
const net = require("net")
const {PromiseSocket} = require("promise-socket")

const socket = new net.Socket()

const promiseSocket = new PromiseSocket(socket)
```

_Typescript:_

```ts
import net from "net"
import PromiseSocket from "promise-socket"

const socket = new net.Socket()

const promiseSocket = new PromiseSocket(socket)
```

### stream

```js
const socket = promiseSocket.stream
```

Original socket object.

_Example:_

```js
console.log(promiseSocket.stream.localAddress)
```

### connect

```js
await connect(port, host)
await connect(path)
await connect(options)
```

Initiate a connection on a given socket. Promise if fulfilled when `connect`
event is emitted. Check
[`socket.connect`](https://nodejs.org/api/net.html#net_socket_connect) for
arguments.

_Example:_

```js
await connect(80, "localhost")
// or
await connect({port: 80, host: "localhost"})
```

### setTimeout

```js
socket.setTimeout(ms)
```

Set the timeout for idle socket and after this timeout the socket will be
destroyed with a `TimeoutError`. It means that socket methods (`connect`,
`read`, `write`, etc.) will be rejected.

_Example:_

```js
socket.setTimeout(1000)
await socket.readAll()
```

### read

```js
const chunk = await promiseSocket.read(chunkSize)
```

Check
[`PromiseReadable.read`](https://www.npmjs.com/package/promise-readable#read)
for details.

### readAll

```js
const content = await promiseSocket.readAll()
```

Check
[`PromiseReadable.readAll`](https://www.npmjs.com/package/promise-readable#readall)
for details.

### iterate

```js
for await (const chunk of promiseDuplex.iterate(chunkSize)) {
}
```

Check
[`PromiseReadable.iterate`](https://www.npmjs.com/package/promise-readable#iterate)
for details.

### Symbol.asyncIterator

```js
for await (const chunk of promiseDuplex.iterate(chunkSize)) {
}
```

Check
[`PromiseReadable[Symbol.asyncIterator]`](https://www.npmjs.com/package/promise-readable#symbolasynciterator)
for details.

### write

```js
await promiseSocket.write(chunk)
```

Check
[`PromiseWritable.write`](https://www.npmjs.com/package/promise-writable#write)
for details.

### writeAll

```js
await promiseSocket.writeAll(content, chunkSize)
```

Check
[`PromiseWritable.writeAll`](https://www.npmjs.com/package/promise-writable#writeall)
for details.

### end

```js
await promiseSocket.end()
```

Check
[`PromiseWritable.once`](https://www.npmjs.com/package/promise-writable#end)
for details.

### once

```js
const result = await promiseSocket.once(event)
```

Check
[`PromiseReadable.once`](https://www.npmjs.com/package/promise-readable#once)
and
[`PromiseWritable.once`](https://www.npmjs.com/package/promise-writable#once)
for details.

### destroy

```js
promiseSocket.destroy()
```

This method calls destroy method on stream and cleans up all own handlers.

### TimeoutError

```js
socket.setTimeout(5000)
try {
  socket.connect({port, host})
} catch (e) {
  if (e instanceof TimeoutError) {
    console.error("Socket timeout")
  }
}
```

This is an error class that is used when timeout occured after using
`setTimeout` method.

## See also

[`PromiseReadable`](https://www.npmjs.com/package/promise-readablee),
[`PromiseWritable`](https://www.npmjs.com/package/promise-writable),
[`PromiseDuplex`](https://www.npmjs.com/package/promise-duplex),
[`PromisePiping`](https://www.npmjs.com/package/promise-piping).

## License

Copyright (c) 2017-2019 Piotr Roszatycki <mailto:piotr.roszatycki@gmail.com>

[MIT](https://opensource.org/licenses/MIT)
