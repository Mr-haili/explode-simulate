
export function isNumber(x: any): x is number {
  return 'number' === typeof x;
}

export function chunk<T>(arr: Array<T>, len: number): Array<Array<T>> {
  let chunks: Array<Array<T>> = [],
      i = 0,
      n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}
