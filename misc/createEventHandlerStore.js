const createEventHandlerStore = () => {
  const store = new WeakMap();
  let entries = [];

  return [
    // add handler
    (target, event, handler) => {
      const entry = { target, event };
      store.set(entry, handler);
      entries.push(entry);
      target.addEventListener(event, handler);
    },
    // remove handler
    (target, event) => {
      const handler = store.get({ target, event });
      target.removeEventListener(event, handler);
      queue.delete({ target, event });
    },
    // remove all handlers
    () => {
    	// iterate our entries, so we can iterate our WeakMap key value pairs
      for (let i = 0; i < entries.length; i++) {
      	// get our handler using our entry
      	const handler = store.get(entries[i]);

        entries[i].target.removeEventListener(entries[i].event, handler);
      }
      // clear entries
      entries = [];
    },
    store,
  ]
}