const http = require('http');
const https = require('https');

/**
 * HTTP/S client
 * @param {string} method http verb
 * @param {string} host hostname
 * @param {string} path path to the resource
 * @param {object} headers object with http headers
 * @param {object} body object with http body
 * @param {number} port port number
 */
exports.request = (method, host, path, headers = {}, body = {}, port = 80) => {
    return new Promise((resolve, reject) => {
        let clientHttp = http;
        if (host.includes('https://')) {
            clientHttp = https;
            port = 443;
        }
        const request = clientHttp.request(
            {
                method: method.toUpperCase(),
                hostname: host.replace(/(http(s?)):\/\//i, ''),
                path: path,
                port: port,
                headers: headers
            },
            (response) => {
                let data = '';
                response.on('data', (chunk) => (data += chunk.toString()));
                response.on('end', () => {
                    resolve({
                        statusCode: response.statusCode,
                        statusMessage: response.statusMessage,
                        httpVersion: response.httpVersion,
                        headers: response.headers,
                        body: data
                    });
                });
            }
        );
        request.write(JSON.stringify(body));
        request.on('error', (error) => {
            reject(error.message);
        });
        request.end();
    });
};
