#!/usr/bin/env node -r esm

import { lockfileVersion } from '../package-lock.json'
import { engines } from '../package.json'
import chalk from 'chalk'

if (lockfileVersion !== 2) {
  const cmd1 = chalk.blue('git restore ./package-lock.json')
  const cmd2 = chalk.blue('npm i')
  console.error(`${chalk.red('Error:')} Your lockfile version is outdated`)
  console.error(`Please use node ${engines.node} with npm ${engines.npm}`)
  console.error(`Please run ${cmd1} and ${cmd2} with the appropriate versions`)
  process.exit(1)
}
