export function* map<A, B>(values: Iterable<A>, callback: (a: A) => B): IterableIterator<B> {
  for (const value of values) {
    yield callback(value)
  }
}

export function* filter<T>(values: Iterable<T>, predicate: (t: T) => boolean): IterableIterator<T> {
  for (const value of values) {
    if (predicate(value)) yield value
  }
}

export function* compact<T>(values: Iterable<T | Falsy>): IterableIterator<T> {
  for (const value of values) {
    if (value) yield value
  }
}
