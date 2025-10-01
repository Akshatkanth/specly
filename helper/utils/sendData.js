const axios = require('axios');

const sendSpecs = async (specs) => {
    try {
        const res = await axios.post('http://localhost:5000/api/scan', specs);
        console.log("Server Response:", res.data);
    } catch(err) {
        console.error("Failed to send specs:", err.message);
    }
};

module.exports = { sendSpecs };
