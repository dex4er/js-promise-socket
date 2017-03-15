'use strict'

const PromiseSocket = require('../lib/promise-socket')
const net = require('net')
const {URL} = require('url')

async function main () {
  try {
    const url = new URL(process.argv[2])
    const crlf = '\x0d\x0a'

    const host = url.hostname
    const port = url.port || 80

    const socket = new PromiseSocket(new net.Socket())
    socket.setTimeout(5000)

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
    console.error('Connection error:', e)
  }
}

main().catch(e => console.error('Fatal:', e))
