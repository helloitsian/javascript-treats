const memo = (func) => {
  const cache = new WeakMap();
  return (...args) => {
    if (cache.has(args)) {
      return cache.get(args);
    }

    const result = func(...args);
    cache.set(args, result);
    return result;
  };
}