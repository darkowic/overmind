function createJsCode(view) {
  return [
    {
      fileName: 'app/index.js',
      code: `
import App from '${view}'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const app = new App({
  namespaces: {
    moduleA,
    moduleB
  }
}, {
  devtools: 'localhost:1234'
})

export default app
  `,
    },
  ]
}

function createTsCode(view) {
  return [
    {
      fileName: 'app.ts',
      code: `
import App, {
  TConfig,
  TAction,
  TDerive,
  TCompute,
  TReaction,
  TOperation,
  TConnect
} from '${view}'
import * as moduleA from './moduleA'
import * as moduleB from './moduleB'

const config = {
  namespaces: {
    moduleA,
    moduleB
  }
}

type Config = TConfig<typeof config>

export type Action<Input = void> = TAction<Input, Config>
export type Derive = TDerive<Config>
export type Compute<Input> = TCompute<Input, Config>
export type Reaction = TReaction<Config>

export type Do<Input = any> = TOperation.Do<Input, Config>
export type Filter<Input = any> = TOperation.Filter<Input, Config>
export type When<Input = any> = TOperation.When<Input, Config>
export type Fork<Input = any> = TOperation.Fork<Input, Config>
export type Mutation<Input = any> = TOperation.Mutation<Input, Config>
export type Map<Input, Output> = TOperation.Map<Input, Output, Config>
export type Try<Input, Output> = TOperation.Try<Input, Output, Config>

const app = new App(config, {
  devtools: 'localhost:1234'
})

export type Connect = TConnect<typeof app>

export default app
  `,
    },
  ]
}

export const react = createJsCode('react-overmind')

export const reactTs = createTsCode('react-overmind')

export const vue = createJsCode('vue-overmind')

export const vueTs = createTsCode('vue-overmind')
