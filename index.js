#!/usr/bin/env node

const enquirer = require('enquirer')
const open = require('open')
const { bold, green, red } = require('chalk')
const { symbols } = require('ansi-colors')

const getId = require('./lib/id')
const getLives = require('./lib/live')
const getStream = require('./lib/stream')
const getToken = require('./lib/token')

const main = async () => {
    const lives = await getLives()

    const { title } = await enquirer.prompt([
        {
            type: 'autocomplete',
            name: 'title',
            message: 'Which live do you wanna watch?',
            choices: lives.map(live => live.title)
        }
    ])

    const { url } = lives.find(live => live.title === title)
   
    const id = await getId(url)
    const token = await getToken(id)
    const stream = await getStream(token)

    console.log(green(symbols.check), bold('Stream:'), stream)

    await open(stream, { app: 'safari' })
}

main().catch(err => {
    if (err instanceof Error)
        console.error(
            red(symbols.cross),
            bold('An error occurred:'),
            err.message
        )
})
