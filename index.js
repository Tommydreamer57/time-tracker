const chalk = require('chalk');
const clu = require('command-line-usage');
const parseArgs = require('minimist');
const commands = require('./commands');

// console.log(__dirname);
// console.log(process.argv);
// console.log(parseArgs(process.argv));
// console.log(parseArgs(process.argv.slice(2)));

const usage = clu([
    {
        header: 'Usage: Time Tracker',
        // : 'Usage: tt <command>',
        content: 'tt <command>',
        // 'where <command> is one of: \nhelp',
    },
    {
        header: 'Commands',
        content: [
            {
                name: '{bold log}',
                summary: 'Log time',
            },
            {
                name: '{bold list}',
                summary: 'Display list of logged times',
            },
        ],
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'help',
                alias: 'h',
                type: Boolean,
                description: 'Display usage',
            },
        ],
    },
]);

const [execPath, localPath, command] = process.argv;

if (command in commands) commands[command]();
else {

    const options = parseArgs(process.argv, {
        string: [],
        boolean: ['help'],
        alias: {
            h: 'help',
        },
        unknown(arg) {
            if (arg in commands) console.log(arg);
            else console.error(chalk.red(`Unknown argument: ${arg}`));
        },
    });

    if (options.help) console.log(usage);

}
