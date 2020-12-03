/**
 * @author raozhanping <raozhanping@gmail.com>
 */
import { isEmpty, traverse, isBlockedTag } from './common'
import { VNode, TEXT, COMMENT, createCommentVNode } from './VNode'
import { Data } from './VNode';

export interface Renderer {
  (vnode: VNode, render?: Renderer): string,
}

export type VNodeProcessor = Renderer

interface RendererOptions {
  createElement: VNodeProcessor,
  createText: VNodeProcessor,
  createComment: VNodeProcessor,
  patchProps: VNodeProcessor
}

export const nodeOps: RendererOptions = {
  createText(vnode) {
    return `${vnode.children || ''}`
  },
  createComment(vnode) {
    const comment = vnode.children || vnode.type as string
    return `<!-- ${comment} -->`
  },
  createElement(vnode, render) {
    const _render = render as Renderer
    const tagname = (vnode.type as string).toLowerCase()
    // Filter blocked tags
    if (isBlockedTag(tagname)) return _render(createCommentVNode(tagname))
    const hasChildren = !isEmpty(vnode.children)
    const props = this.patchProps(vnode)
    const children = hasChildren ? (vnode.children as VNode[]).map(_render as any) : []
    const html = `<${tagname} ${props}>${children.join('')}</${tagname}>`
    return html
  },
  patchProps(vnode) {
    const props: string[] = []
    traverse(vnode.props as Data, (value, key) => {
      props.push(`${key}="${value}"`)
    })
    return props.join(' ')
  }
}

export const creatRenderer = (option: RendererOptions): Renderer => {
  const {
    createText,
    createComment,
    createElement
  } = option
  const render: Renderer = (vnode) => {
    switch(vnode.type) {
      case TEXT:
        return createText(vnode)
      case COMMENT:
        return createComment(vnode)
      default:
        return createElement.call(option, vnode, render)
    }
  }

  return render
}
