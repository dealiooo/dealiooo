module.exports = response => {
    if (response.ok) {
        return response.text().then(data => JSON.parse(data));
    }
    return response;
};