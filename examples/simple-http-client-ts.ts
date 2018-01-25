#!/usr/bin/env ts-node

import { URL } from 'url'
import { PromiseSocket } from '../lib/promise-socket'

async function main () {
  try {
    const url = new URL(process.argv[2])
    const crlf = '\x0d\x0a'

    const host = url.hostname
    const port = url.port || 80

    const socket = new PromiseSocket()
    socket.setTimeout(5000)

    await socket.connect({ host, port })
    await socket.write(
      `GET ${url.pathname} HTTP/1.0` + crlf +
      `Host: ${host}:${port}` + crlf +
      crlf
    )

    const response = await socket.readAll()

    if (response) {
      console.info(response.toString())
    }

    await socket.end()
  } catch (e) {
    console.error('Connection error:', e)
  }
}

main().catch((err) => console.error('Fatal:', err))
