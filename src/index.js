#!/usr/bin/env node
/*jshint node: true */
'use strict'

import defaults from './config'
import cli from './cli'
import commands from './commands/'
import npac from 'npac'

/*
const dumpCtx = (ctx, next) => {
    console.log('dumpCtx:', ctx)
    next(null, ctx)
}
*/

export const start = (argv = process.argv, cb = null) => {
    // Use CLI to gain additional parameters, and command to execute
    const { cliConfig, command } = cli.parse(defaults, argv)
    // Create the final configuration parameter set
    const config = npac.makeConfig(defaults, cliConfig, 'configFileName')

    // Define the adapters and executives to add to the container
    const adapters = [npac.mergeConfig(config), npac.addLogger, commands]

    // Define the terminators
    const terminators = []

    const callCommand = (command) => (command.type === 'sync' ? npac.makeCallSync(command) : npac.makeCall(command))
    // Define the jobs to execute: hand over the command got by the CLI.
    const jobs = [callCommand(command)]

    const endCb =
        cb !== null
            ? cb
            : (err, res) => {
                  if (command.type === 'async') {
                      process.kill(process.pid, 'SIGTERM')
                  }
              }

    //Start the container
    npac.start(adapters, jobs, terminators, endCb)
}
