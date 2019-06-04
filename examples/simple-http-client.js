#!/usr/bin/env node

const {URL} = require("url")
const {PromiseSocket} = require("../lib/promise-socket")

async function main() {
  try {
    const url = new URL(process.argv[2])
    const crlf = "\r\n"

    const host = url.hostname
    const port = Number(url.port) || 80

    const socket = new PromiseSocket()
    socket.setTimeout(5000)

    await socket.connect({host, port})
    await socket.write(
      `GET ${url.pathname} HTTP/1.1` + crlf + `Host: ${host}:${port}` + crlf + "Connection: close" + crlf + crlf,
    )

    const response = await socket.readAll()

    if (response) {
      console.info(response.toString())
    }

    await socket.end()
  } catch (e) {
    console.error("Connection error:", e)
  }
}

main().catch(err => console.error("Fatal:", err))
