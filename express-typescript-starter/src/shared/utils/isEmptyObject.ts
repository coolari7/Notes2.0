/* eslint-disable import/prefer-default-export */
export function isEmptyObject(obj: object): boolean {
  return obj === undefined ? false : Object.keys(obj).length === 0;
}
