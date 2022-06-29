class IterableWeakMap {
  constructor() {
      this.weakMap = new WeakMap();
      this.entries = [];
  }
  
  // add entry to our entries array, set value in our WeakMap
  set(key, value) {
    this.entries.push(key);
    this.weakMap.set(key, value);
  }
  
  // match our key with an entry, and get value from our WeakMap
  // order matters for WeakMap().get so we emulate that with JSON.stringify comparison
  get(key) {
    for (let i = 0; i < this.entries.length; i++) {
      if (JSON.stringify(key) === JSON.stringify(this.entries[i])) {
        return this.weakMap.get(this.entries[i]);
      }
    }
  }
  
  // clear all values in our WeakMap and entries
  clear() {
    for (let i = 0; i < this.entries.length; i++) {
       this.weakMap.delete(this.entries[i]);
    }
    this.entries = [];
  }
  
  // Similar to Array.prototype.forEach
  forEach(cb) {
    for (let i = 0; i < this.entries.length; i++) {
      // pass WeakMap value, entry, and index to callback
      cb(this.weakMap.get(this.entries[i]), this.entries[i], i);
    }
  }
  
  // Similar to Array.prototype.map
  map(cb) {
    let array = [];
    for (let i = 0; i < this.entries.length; i++) {
    // pass WeakMap value, entry, and index to callback
      array.push(cb(this.weakMap.get(this.entries[i]), this.entries[i], i));
    }
    return array;
  }
  
  // Similar to Array.prototype.reduce
  reduce(cb, initialValue) {
    let finalValue = initialValue;
    for (let i = 0; i < this.entries.length; i++) {
      // pass finalValue, WeakMap value, entry, and index to callback
      finalValue = cb(finalValue, this.weakMap.get(this.entries[i]), this.entries[i], i);
    }
    return finalValue;
  }
}

// USAGE:
const iterableWeakMap = new IterableWeakMap();

iterableWeakMap.set({ a: 1}, 1);
iterableWeakMap.set({ b: 2}, 2);
iterableWeakMap.set({ c: 3}, 3);

console.log(iterableWeakMap.get({ c: 3})); // 3

console.log(iterableWeakMap.keys());
/*
  [
    {a: 1}
    {b: 2}
    {c: 3}
  ]
*/

console.log(iterableWeakMap.values());
// [ 1, 2, 3 ]

console.log(iterableWeakMap.getEntries());
/*
	[
  	[{a: 1}, 1],
    [{b: 2}, 2],
    [{c: 3}, 3],
  ]
*/

iterableWeakMap.forEach((val) => console.log(val))
// 1
// 2
// 3

const mapped = iterableWeakMap.map((val) => val);
console.log(mapped); 
// [1, 2, 3]

const total = iterableWeakMap.reduce((final, curr) => final + curr, 0); 
console.log(total); 
// 6
