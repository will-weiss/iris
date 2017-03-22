export function* map<A, B>(values: Iterable<A>, callback: (value: A) => B): IterableIterator<B> {
  for (const value of values) {
    yield callback(value)
  }
}

export function* filter<T>(values: Iterable<T>, predicate: (value: T) => boolean): IterableIterator<T> {
  for (const value of values) {
    if (predicate(value)) {
      yield value
    }
  }
}

export function* split<T>(values: Iterable<T>, predicate: (value: T) => boolean): IterableIterator<T[]> {
  let chunk: T[] = []

  for (const value of values) {
    if (predicate(value)) {
      yield chunk
      chunk = []
    } else {
      chunk.push(value)
    }
  }

  yield chunk
}

export function* flatten<T>(iterables: Iterable<Iterable<T>>): IterableIterator<T> {
  for (const iterable of iterables) {
    yield * iterable
  }
}

export function reduce<A, B>(values: Iterable<A>, callback: (accumulator: B, value: A) => B, initial: B): B {
  let accumulator: B = initial
  for (const value of values) {
    accumulator = callback(accumulator, value)
  }
  return accumulator
}

export function* compact<T>(values: Iterable<T | Falsy>): IterableIterator<T> {
  for (const value of values) {
    if (value) yield value
  }
}

