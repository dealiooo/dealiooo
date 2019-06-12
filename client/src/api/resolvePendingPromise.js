module.exports = response => {
  console.log(response);
  if (response.ok) {
    return response.json();
  }
  return response;
};
