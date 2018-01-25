export function flatten<T>(x: T[][]): T[] {
    return [].concat.apply([], x);
}