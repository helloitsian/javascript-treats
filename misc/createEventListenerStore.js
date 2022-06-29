const createEventListenerStore = () => {
  const store = new Map();
  // holds our entries in memory so we can easily refence listeners in our Map
  let entries = [];

  return [
    // add listener
    (target, event, listener) => {
      const entry = { target, event };
      entries.push(entry);
      store.set(entry, listener);
      target.addEventListener(event, listener);
    },
    // remove listener
    (target, event) => {
    	for (let i = 0; i < entries.length; i++) {
      	if (JSON.stringify({ target,event }) === JSON.stringify(entries[i])) {
          target.removeEventListener(event, store.get(entries[i]));
          store.delete(entries[i]);
          entries.splice(i, 1);
        }
     	}
    },
    // remove all listeners
    () => {
    	// iterate our entries, so we can iterate our Map key value pairs
      for (let i = 0; i < entries.length; i++) {
        entries[i].target.removeEventListener(entries[i].event, store.get(entries[i]));
      }
      entries = [];
    },
    store,
  ]
}