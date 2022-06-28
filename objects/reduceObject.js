const reduceObject = (object, callback, defaultValue) => {
  return Object.entries(object).reduce(callback, defaultValue);
}