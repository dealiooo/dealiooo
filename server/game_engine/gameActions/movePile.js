module.exports = (source, destination) => {
  for (let i = 0; i < source.length; i++) {
    destination.push(source.pop());
  }
};
