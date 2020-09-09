const axios = require('axios');
const qs = require('querystring');

module.exports.login = data => axios.get('', data)
module.exports.utilRequest = data => axios.get('', data)
module.exports.postUtilRequest = data => axios.post('', qs.stringify(data))

