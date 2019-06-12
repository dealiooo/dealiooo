module.exports = response => {
  if (response.ok) {
    return response.json();
  }
  return response;
};
