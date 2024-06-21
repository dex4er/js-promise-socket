#!/usr/bin/env -S node --experimental-specifier-resolution=node --no-warnings --loader ts-node/esm

import {URL} from "node:url"

import PromiseSocket from "../src/promise-socket.js"

import packageJson from "../package.json" with {type: "json"}

async function main(): Promise<void> {
  try {
    const url = new URL(process.argv[2] || "https://ifconfig.me/all")
    const crlf = "\r\n"

    const host = url.hostname
    const port = Number(url.port) || 80

    const socket = new PromiseSocket()
    socket.setTimeout(5000)

    await socket.connect({host, port})
    await socket.write(
      `GET ${url.pathname} HTTP/1.1` +
        crlf +
        `Host: ${host}:${port}` +
        crlf +
        "Connection: close" +
        crlf +
        `User-Agent: ${packageJson.name}/${packageJson.version}` +
        crlf +
        crlf,
    )

    const response = (await socket.readAll()) as Buffer

    if (response) {
      console.info(response.toString())
    }

    await socket.end()
  } catch (e) {
    console.error("Connection error:", e)
  }
}

main().catch(err => console.error("Fatal:", err))
