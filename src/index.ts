import { toVNode } from './VNode';
import { creatRenderer, nodeOps } from './renderer';

export * from './VNode';

export const shot = (selector: any): string => {
  const ele = document.querySelector(selector);
  const vnode = toVNode(ele);
  const render = creatRenderer(nodeOps);

  return render(vnode);
};
