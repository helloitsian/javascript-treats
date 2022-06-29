const createProxyState = (initialState) => {
  const subscribers = [];

  const proxy = new Proxy(initialState, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      target[prop] = value;
      subscribers.forEach(subscriber => subscriber(target));
      return true;
    }
  });

  const subscribe = (handler) => {
    subscribers.push(handler);
  }

  return [
    proxy,
    subscribe,
  ]
}