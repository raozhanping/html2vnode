export type Data = Record<string, any>

export type NOOP = (...args: any) => any

export const isString = (t: unknown): boolean => Object.prototype.toString.call(t) === '[object String]'
export const isArray = (t: unknown): boolean => Object.prototype.toString.call(t) === '[object Array]'
export const isObject = (t: unknown): boolean => Object.prototype.toString.call(t) === '[object Object]'

export const isEmpty = (t: unknown): boolean => {
  if(isArray(t)){
    return !Boolean((t as []).length)
  } else if (isObject(t)) {
    return JSON.stringify(t) === '{}'
  } else {
    return !Boolean(t)
  }
}

export const compose = (...fns: Function[]) => (...args: unknown[]) => fns.reverse().slice(1).reduce((p, n) => n(p), fns[0](...args))

export const traverse = (t: Data, cb: NOOP) => {
  for(const key in t) {
    cb(t[key], key)
  }
}

export function makeMap(
  str: string,
  expectsLowerCase?: boolean
): (key: string) => boolean {
  const map: Record<string, boolean> = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val]
}

export const isBlockedTag = makeMap('script', true)
