import { toVNode } from './VNode'
import { creatRenderer, nodeOps } from './renderer'

export * from './VNode'

export const shot = (selector: any): string => {
  const ele = document.querySelector(selector)
  const vnode = toVNode(ele)
  console.log(vnode)
  const render = creatRenderer(nodeOps)

  return render(vnode)
}
//@ts-ignore
window.shot = shot
