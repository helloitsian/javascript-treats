const deleteNode = (node) => {
  const parent = node.parentNode;
  parent.removeChild(node);
}