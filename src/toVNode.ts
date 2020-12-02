/// <reference path="./index.d.ts"/>
/**
 * html2Vnode
 * @author raozhanping <raozhanping@gmail.com>
 */
import { compose, Data } from './common'
import { createVNode, VNode, Shapflags, createTextVNode } from './VNode'
/**
 * Convert html element to vnode
 */
export const toVNode = (ele: unknown): VNode => {
  const _ele = <Element>ele
  const nodeType = _ele.nodeType

  if(nodeType === Shapflags.TEXT) {
    return createTextVNode(_ele.textContent as string)
  }

  let tagName = _ele.nodeName;

  const resolveProps = compose((attrs: Attr[]) => {
    return attrs.reduce((pre, cur) => {
      pre[cur.localName] = cur.nodeValue
      return pre
    }, {} as Data)
  }, Array.from)
  const props = resolveProps(_ele.attributes)

  const resolveChildren = (ele: Element) => {
    return ele.hasChildNodes() ? Array.from(ele.childNodes).map(toVNode) : null;
  };
  let children = resolveChildren(_ele)
  return createVNode(tagName, props, children);

};
