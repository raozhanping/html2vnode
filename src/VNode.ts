/**
 * @author raozhanping <raozhanping@gmail.com>
 */
import { isString, compose } from './common'

export const TEXT = Symbol('Text')
export const COMMENT = Symbol('Comment')

export type VNodeTypes = string | typeof TEXT | typeof COMMENT
export enum Shapeflags {
  ELEMENT = 1,
  TEXT = 3
}
export type Data = Record<string, unknown>

export type NormalizedChildren = string | VNode[] | null

export interface VNode {
  type: VNodeTypes;
  props?: Record<string, any> | null;
  children?: NormalizedChildren;
  shapeFlag?: number;
}

export const createVNode = (type: VNodeTypes, props: Data | null, children: unknown ): VNode => {
  if (!type) {
    type = COMMENT
  }
  const shapeFlag = isString(type) ? Shapeflags.ELEMENT : 0
  const vnode: VNode = {
    type,
    props,
    shapeFlag,
    children: children as NormalizedChildren
  }
  return vnode
}

export const createTextVNode = (text: string = ' ') => createVNode(TEXT, null, text)
export const createCommentVNode = (text: string = ' ') => createVNode(COMMENT, null, text)

/**
 * Convert html element to vnode
 */
export const toVNode = (ele: unknown): VNode => {
  const _ele = <Element>ele
  const nodeType = _ele.nodeType

  if(nodeType === Shapeflags.TEXT) {
    return createTextVNode(_ele.textContent as string)
  }

  let tagname = _ele.nodeName.toLowerCase();

  const resolveProps = compose((attrs: Attr[]) => attrs.reduce((pre, cur) => {
      pre[cur.localName] = cur.nodeValue
      return pre
    }, {} as Data)
  , Array.from)
  const props = resolveProps(_ele.attributes)

  const resolveChildren = (ele: Element) => {
    return ele.hasChildNodes() ? Array.from(ele.childNodes).map(toVNode) : null;
  };
  let children = resolveChildren(_ele)

  return createVNode(tagname, props, children);
};

