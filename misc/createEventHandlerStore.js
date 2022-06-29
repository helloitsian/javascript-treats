const createEventHandlerStore = () => {
  const store = new Map();
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
    	for (let i = 0; i < entries.length; i++) {
      	if (JSON.stringify({ target,event }) === JSON.stringify(entries[i])) {
          target.removeEventListener(event, store.get(entries[i]));
          store.delete(entries[i]);
        }
     	}
      
    },
    
    // remove all handlers
    () => {
    	// iterate our entries, so we can iterate our Map key value pairs
      for (let i = 0; i < entries.length; i++) {
      	// get our handler using our entry

        entries[i].target.removeEventListener(entries[i].event, store.get(entries[i]));
      }
      // clear entries
      entries = [];
    },
    store,
  ]
} 

// USAGE: https://jsfiddle.net/mgcpes0w/7/