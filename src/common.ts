export type Data = Record<string, any>

export const NOOP = () => {}

export const isString = (target: unknown): boolean => Object.prototype.toString.call(target) === '[object String]'
export const isArray = (target: unknown): boolean => Object.prototype.toString.call(target) === '[object Array]'
export const isObject = (target: unknown): boolean => Object.prototype.toString.call(target) === '[object Object]'

export const isElement = (target: unknown) : boolean => target instanceof Element

export const compose = (...fns: Function[]) => (...args: unknown[]) => fns.reverse().slice(1).reduce((p, n) => n(p), fns[0](...args))

export const toPlainObject = (target: any): Data => {
  const result: Data = {}
  if (isObject(target as object)) {
    for (const k in target ) {
      result[k] = target[k]
    }
  }
  return result
}
