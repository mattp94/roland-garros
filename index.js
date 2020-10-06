#!/usr/bin/env node

const clipboardy = require('clipboardy');
const enquirer = require('enquirer');
const open = require('open');
const { bold, green, magenta, red } = require('chalk');
const { execFileSync } = require('child_process');
const { symbols } = require('ansi-colors');

const getId = require('./lib/id');
const getLives = require('./lib/live');
const getStream = require('./lib/stream');
const getToken = require('./lib/token');

const main = async () => {
    const lives = await getLives();

    const { title, app } = await enquirer.prompt([
        {
            type: 'autocomplete',
            name: 'title',
            message: 'Which live do you wanna watch?',
            choices: lives.map((live) => live.title),
        },
        {
            type: 'autocomplete',
            name: 'app',
            message: 'Which app do you wanna use?',
            choices: ['QuickTime Player', 'Safari', 'VLC', 'IINA', 'Clipboard'],
        },
    ]);

    const { url } = lives.find((live) => live.title === title);

    const id = await getId(url);
    const token = await getToken(id);
    const stream = await getStream(token);

    if (app === 'Clipboard') {
        await clipboardy.write(stream);

        console.log(
            green(symbols.check),
            bold('It has been copied to the Clipboard!'),
        );
    } else if (app === 'IINA') {
        execFileSync('iina', [stream]);
    } else {
        await open(stream, { app: app.toLowerCase(), url: true });
    }
};

main().catch((err) => {
    if (err instanceof Error) {
        console.error(
            red(symbols.cross),
            bold('An error occurred:'),
            magenta(err.message),
        );

        process.exit(1);
    }
});
