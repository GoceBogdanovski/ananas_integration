const tokenService = require("../services/tokenService");
const constants = require('./constants');

module.exports = {
    createAuthClient: async (methodType, url, payload) => {
        const token = await tokenService.getAccessToken();
        let fetchOpts = {};
        switch (methodType) {
            case 'POST':
                fetchOpts = {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${token.access_token}`
                    }
                };
                break;

            case 'PUT':
                fetchOpts = {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${token.access_token}`
                    }
                };
                break;

            case 'GET':
                fetchOpts = {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${token.access_token}`
                    }
                };
                break;
        }

        const response = fetch(`${constants.apiBaseUrl}${url}`, fetchOpts);
        return await(await response).json();
    }
};