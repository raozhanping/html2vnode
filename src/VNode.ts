/**
 * @author raozhanping <raozhanping@gmail.com>
 */
import { isString } from './common'

export const TEXT = Symbol('Text')
export const COMMENT = Symbol('Comment')

export type VNodeTypes = string | typeof TEXT | typeof COMMENT
export enum Shapflags {
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
  const shapeFlag = isString(type) ? Shapflags.ELEMENT : 0
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
