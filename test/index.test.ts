import { Shapeflags, TEXT, COMMENT } from './../src/VNode';
import { toVNode } from '../src';

describe('toVNode', () => {
  it('Convert to vnode', () => {
    const ele = document.createElement('div');
    ele.innerHTML = 'html2vnode<!-- comment -->';
    const expectVNode = {
      type: 'div',
      children: [
        {
          type: TEXT,
          children: 'html2vnode',
          props: null,
          shapeFlag: 0,
        },
        {
          type: COMMENT,
          props: null,
          children: ' comment ',
          shapeFlag: 0,
        },
      ],
      props: {},
      shapeFlag: Shapeflags.ELEMENT,
    };
    expect(toVNode(ele)).toEqual(expectVNode);
  });
});
