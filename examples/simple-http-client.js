'use strict'

const PromiseSocket = require('../lib/promise-socket')
const net = require('net')
const {URL} = require('url')

async function main () {
  const url = new URL(process.argv[2])
  const crlf = '\x0d\x0a'

  const host = url.hostname
  const port = url.port || 80

  try {
    const socket = new PromiseSocket(new net.Socket())
    socket.stream.setTimeout(1000, () => socket.stream.end())

    await socket.connect({host, port})
    await socket.write(
      `GET ${url.pathname} HTTP/1.0` + crlf +
      `Host: ${host}:${port}` + crlf +
      crlf
    )
    const response = await socket.readAll()
    console.log(response.toString())
    await socket.end()
  } catch (e) {
    console.log('Connection error:', e)
  }
}

main().catch(e => console.log('Fatal:', e))
