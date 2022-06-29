const totalArrayInstances = (arr) => {
  return arr.reduce((final, curr) => {
    if (!final[curr]) {
      final[curr] = 0;
    }
    final[curr] += 1;
    return final;
  }, {});
}