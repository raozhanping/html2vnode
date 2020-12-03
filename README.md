# html2vnode

Convert html node to vnode.

## Usage

```ts
import { toVNode } from 'html2VNode'

// html => <div id="app">html2vnode</div>
const ele = document.querySelector('#app')
toVNode(ele)
// {
//    type: 'div',
//    props: { id: 'app' },
//    children: [
//      {
//        type: Symbol('TEXT'),
//        children: 'html2vnode',
//        props: {}
//      }
//    ]
//  }
```
## Interface

#### toVNode
```ts
interface {
  toVNode(ele: Element): VNode
}
```

#### createVNode
```ts
interface createVNode {
  (type: VNodeTypes, props: Data | null, children: unknown ): VNode
}
```

#### createTextVNode
```ts
interface createTextVNode {
  (text: string) : VNode
}
```

#### createCommentVNode
```ts
interface createCommentVNode {
  (text: string) : VNode
}
```

#### VNode

```ts
interface VNode {
  type: VNodeTypes;
  props?: Record<string, any> | null;
  children?: NormalizedChildren;
  shapeFlag?: number;
}
```

## Command

TSDX scaffolds your new library inside `/src`.

To run TSDX, use:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.
