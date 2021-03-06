npac-example-cli
================

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)
[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coveralls][BadgeCoveralls]][Coveralls]

## About

This is a CLI example application using the npac container.

Its main purpose is to demonstrate, how to create and maintain a command line tool,
using the [npac](http://tombenke.github.io/npac) module.

Use the [ncli-archetype](https://github.com/tombenke/ncli-archetype) boilerplate with the
[kickoff](https://github.com/tombenke/kickoff) tool to generate similar project for yourself.

## Installation

Run the install command if you want to install the tool globally:

    npm install -g npac-example-cli

Check if npac-example-cli is properly installed:

    $ npac-example-cli --help

If you only want to tinker with it, or just study how it works, then clone it, install the packages,
and use in development mode:

```bash
    git clone git@github.com:tombenke/npac-example-cli.git
    cd npac-example-cli
    npm install
    npm run build
    npm dist/app.js --help
```

## How does it work?

The `npac-example.cli` is a command line appication. The source code can be found in the `src` directory:

```bash
src
├── app.js
├── cli.js
├── cli.spec.js
├── commands
│   ├── echo
│   │   ├── index.js
│   │   └── index.spec.js
│   └── index.js
├── config.js
├── config.spec.js
├── index.js
└── index.spec.js
```

The application is made of the following modules:

- `src/index.js`: The application itself, as a module.
  It encapsulates everything, and exports a `start()` function, that is the single entry point of execution.
- `src/config.js`: The default configuration parameters.
  It defines the default values, and the environment parameters, if there is any used.
- `src/cli.js`: The command line interpreter, which defines the commands, and parses their parameters.
- `src/commands/index.js`: It represents the executives object,
   that holds every command function as a property with the same names that are used as commands through the cli.
- `src/commands/echo/index.js`: The implementation of the echo command, accompanied with its unit test.
  Each command should be placed into its own subfolder, under the `commands` directory,
  or should be loaded as an external dependency, and added into the `src/commands/index.js` export.

Every module listed above has its unit test counterpart in the corresponding `<modulename>.spec.js` file.
So everything (including the whole cli aplication, the cli parser, etc.) are unit tested.

- `app.js`: The script, that is referred from the `package.json` as the main script, named `npac-example-cli`.
  Its only purpose is to run the application, using the arguments given through the console.

## How to add new commands?

1. Define the user interface of the command, in the meaning of command name, and parameters.
2. Define the configuration parameters required for the execution, and/or used during the cli parsing.
3. Add the newly defined default configuration parameters to the [`src/config.js`](src/config.js) file.
4. Implement the command parser inside the [cli parser](src/cli.js) (see below).
5. Implement the command, in its own subdirectory, under the `src/commands/<command-name>` directory.
6. Add the new command to the `executives` object in the [`src/commands/index.js`](src/commands/index.js) file.
7. Add the application-level unit test of the new command, to the [`src/index.spec.js`](src/index.spec.js) file.

### Extending the CLI parser

```JavaScript
        .command('echo', 'Echo arguments', yargs =>
            yargs
                .option("config", {
                    alias: "c",
                    desc: "The name of the configuration file",
                    default: defaults.configFileName
                })
                .option("text", {
                    alias: "t",
                    desc: "A text parameter",
                    type: 'string',
                    default: defaults.docsTemplates
                })
                .demandOption([]),
            argv => {
                results = {
                    command: {
                        name: 'echo',
                        args: {
                            text: argv.text
                        },
                    },
                    cliConfig: {
                        configFileName: argv.config
                    }
                }
            }
        )
```

  The results of the parsing must be an object in the following format:

```JavaScript
    {
        command: {
            name: "<command-name>",
            args: {
                // dictionary of command arguments
            },
        },
        cliConfig: {
            // configuration parameters, if there is any beside the default ones,
            // or an empty object, in case there is no additional or altered config parameters
        }
    }
```

  For example:

```JavaScript
    {
        command: {
            name: 'echo',
            args: {
                text: argv.text
            },
        },
        cliConfig: {
            configFileName: argv.config
        }
    }
```

## References

- [npac - A lightweight Ports and Adapters Container for Node](https://github.com/tombenke/npac).
- [ncli-archetype - Project archetype for Command Line tools using Node.js](https://github.com/tombenke/ncli-archetype).

---

This project was generated by the [kickoff](https://github.com/tombenke/kickoff) utility.

[npm-badge]: https://badge.fury.io/js/npac-example-cli.svg
[npm-url]: https://badge.fury.io/js/npac-example-cli
[travis-badge]: https://api.travis-ci.org/tombenke/npac-example-cli.svg
[travis-url]: https://travis-ci.org/tombenke/npac-example-cli
[Coveralls]: https://coveralls.io/github/tombenke/npac-example-cli?branch=master
[BadgeCoveralls]: https://coveralls.io/repos/github/tombenke/npac-example-cli/badge.svg?branch=master

