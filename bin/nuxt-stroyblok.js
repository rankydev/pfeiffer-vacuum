#!/usr/bin/env node -r esm

import path from 'path'
import glob from 'glob'
import arg from 'arg'
import consola from 'consola'
import getApi from '@txp-cms/storyblok/bin/utils/api.js'
import syncComponents from '@txp-cms/storyblok/bin/tasks/sync-components.js'

import { getWebpackConfig } from '@nuxt/cli'
import moduleAlias from 'module-alias'

export const logger = consola.withScope('@txp-cms/storyblok')
export const usage = 'nuxt storyblok [`sync`] [`dir`]'

async function getComponentsSchema(dir) {
  const schemas = []

  glob.sync(dir + '/**/?(*.)schema.{js,json}').forEach((file) => {
    schemas.push(import(path.resolve(file)))
  })

  const results = await Promise.all(schemas)
  return results.map((el) => el.default)
}

async function registerModuleAlias() {
  const webpackConfig = await getWebpackConfig()
  const { alias } = webpackConfig.resolve

  moduleAlias.addAliases(alias)
}

async function _run() {
  const args = arg({
    '--space': Number,
    '--token': String,
  })
  const { _ } = args

  let [mode, _dir] = _
  _dir = _dir || './components'
  mode = mode || 'sync'

  const schemaDir = path.resolve(process.cwd(), _dir)

  const [components] = await Promise.all([
    getComponentsSchema(schemaDir),
    registerModuleAlias(),
  ])

  const spaceId = args['--space'] || process.env.STORYBLOK_SPACE_ID
  const accessToken = args['--token'] || process.env.STORYBLOK_OAUTH_TOKEN

  const api = getApi({
    accessToken,
    spaceId,
  })

  try {
    switch (mode) {
      case 'sync':
        await syncComponents(api, components)
        return
      default:
        logger.error(`Command "${mode}" not found`)
    }
  } catch (e) {
    logger.error(e)
  }
}

export function run() {
  try {
    _run()
  } catch (err) {
    logger.fatal(err)
    process.exit(1)
  }
}

if (!module.parent) {
  run()
}
