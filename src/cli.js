#!/usr/bin/env node
/*jshint node: true */
'use strict'

const yargs = require('yargs')

const parse = (defaults, processArgv = process.argv) => {
    let results = {}

    yargs(processArgv.slice(2))
        //        .exitProcess(false)
        .command(
            'echo',
            'Echo arguments',
            (yargs) =>
                yargs
                    .option('config', {
                        alias: 'c',
                        desc: 'The name of the configuration file',
                        default: defaults.configFileName
                    })
                    .option('text', {
                        alias: 't',
                        desc: 'A text parameter',
                        type: 'string',
                        default: defaults.docsTemplates
                    })
                    .option('loglevel', {
                        alias: 'l',
                        desc: 'The log level',
                        type: 'string',
                        default: defaults.logger.level
                    })
                    .demandOption([]),
            (argv) => {
                results = {
                    command: {
                        name: 'echo',
                        type: 'sync', // sync | async
                        args: {
                            text: argv.text
                        }
                    },
                    cliConfig: {
                        configFileName: argv.config,
                        logger: {
                            level: argv.loglevel
                        }
                    }
                }
            }
        )

        /*
         * Place your command parser implementations here, similar to the `echo` example above
         */

        .demandCommand(1, 'Must use a command!')
        .showHelpOnFail(false, 'Specify --help for available options')
        .help()
        .parse()

    return results
}

module.exports = {
    parse
}
