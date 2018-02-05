#!/usr/bin/env ts-node

/*

This is an implementation of BSMTP (Batch Simple Mail Transfer Protocol) client
with console or a file as an input.

Example session:

$ ts-node examples/bsmtp-client-ts.ts localhost 25 < examples/bsmtp.txt
S: 220 MDEPR186025-573 ESMTP
C: HELO client
S: 250 MDEPR186025-573 Nice to meet you, [127.0.0.1]
C: MAIL FROM:<test@example.com>
S: 250 Accepted
C: RCPT TO:<test@example.net>
S: 250 Accepted
C: DATA
S: 354 End data with <CR><LF>.<CR><LF>
C: From: test@example.com
C: To: test@example.net
C: Subject: test
C:
C: test
C: .
S: 250 OK: message queued
C: QUIT
S: 221 Bye

*/

import { PromiseReadablePiping } from 'promise-piping'
import PromiseWritable from 'promise-writable'
import PromiseSocket from '../lib/promise-socket'

// tslint:disable:no-var-requires
const ReadlineTransform = require('readline-transform')

import net from 'net'

const host = process.argv[2] || 'localhost'
const port = Number(process.argv[3]) || 25

const socket = new PromiseSocket(new net.Socket())
const socketLines = new PromiseReadablePiping(socket, new ReadlineTransform({ skipEmpty: true }))
const stdinLines = new PromiseReadablePiping(process.stdin, new ReadlineTransform({ skipEmpty: true }))
const stdout = new PromiseWritable(process.stdout)

let hasPipelining = false
let waitFor = 0

async function waitForStatus () {
  ++waitFor

  while (waitFor) {
    let line: string | undefined

    if ((line = await socketLines.read() as string)) {
      await stdout.write('S: ' + line + '\n')
      if (line.match(/^250-PIPELINING/)) {
        hasPipelining = true
      }
      if (line.match(/^\d{3}\s/)) {
        --waitFor
      }
    }
  }
}

async function pipelineStatus () {
  if (hasPipelining) {
    ++waitFor
  } else {
    await waitForStatus()
  }
}

async function main () {
  await socket.connect({ port, host })

  const CRLF = '\r\n'

  let dataStream = false

  await waitForStatus()

  let line: string | undefined

  while ((line = await stdinLines.read() as string)) {
    await socket.write(line + CRLF)

    if (!dataStream) {
      await stdout.write('C: ' + line + '\n')
    }

    if (!dataStream && line.match(/^(EHLO\s|HELO\s|QUIT$)/)) {
      await waitForStatus()
    }

    if (!dataStream && line.match(/^(MAIL FROM:|RCPT TO:)/)) {
      await pipelineStatus()
    }

    if (!dataStream && line === 'DATA') {
      dataStream = true
      await waitForStatus()
    }

    if (dataStream && line === '.') {
      dataStream = false
      await pipelineStatus()
    }
  }

  await socket.end()

  socket.destroy()
  socketLines.destroy()
  stdinLines.destroy()
}

void main()
.catch((err) => console.error('Fatal:', err))
.then(() => {
  if (process.stdin.isTTY) {
    process.stdin.end()
  }
})
