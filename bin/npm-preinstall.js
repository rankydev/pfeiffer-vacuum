import { lockfileVersion } from '../package-lock.json'
import { engines } from '../package.json'

if (lockfileVersion !== 2) {
  console.error('Your lockfile version is outdated')
  console.error(`Please use node ${engines.node} with npm ${engines.npm}`)
  console.error(
    `Please run 'git reset ./package-lock.json' and 'npm i' with the appropriate node version`
  )
  process.exit(1)
}
