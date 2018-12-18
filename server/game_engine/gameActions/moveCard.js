module.exports = (source, destination, card) => {
  destination.push(card);
  let stack = [];
  let offset = 0;
  for (let i = 0; i < source.length; i++) {
    if (source[i].id === card.id) {
      offset = i;
      break;
    }
  }
  offset = source.length - offset;
  for (let i = 0; i < offset; i++) {
    stack.push(source.pop());
  }
  stack.pop();
  for (let i = 1; i < offset; i++) {
    source.push(stack.pop());
  }
};
