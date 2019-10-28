module.exports = ({ source, destination }) => {
  const size = source.length;
  for (let i = 0; i < size; i++) {
    destination.push(source.pop());
  }
};
