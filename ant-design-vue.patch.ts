import { resolve, join } from 'path'
import fs from 'fs'
import R from 'ramda'

const ROOT = resolve('./node_modules/ant-design-vue/lib')

/**
 * Patch for File
 * @param file 
 * @param targetText 
 * @param replaceText 
 * @returns 
 */
const patchFile = (file, targetText, replaceText) => {
    const readFile = R.curry(fs.readFileSync)(R.__, 'utf-8')
    const replaceString = text => R.replace(targetText, replaceText, text)
    const writeFile = R.curry(fs.writeFileSync)(file, R.__, { encoding: 'utf-8', flag: 'w' })

    return R.pipe(
        readFile,
        replaceString,
        writeFile,
    )(file)
}

/**
 * Patch for Dir
 * @param directory 
 */
const patchDir = (directory: string) => {
    const patch = R.curry(patchFile)(R.__, /lodash-es/g, 'lodash')
    const patchTarget = (path) => (fs.statSync(path).isDirectory() ? patchDir : patch)(path)

    const readDir = (dir: string) => R.compose(
        R.map((file: string) => join(dir, file)),
        fs.readdirSync
    )(dir)

    const filterFile = (file: string) => !file.endsWith('.d.ts')

    readDir(directory).filter(filterFile).forEach(patchTarget)
}

export default () => patchDir(ROOT)