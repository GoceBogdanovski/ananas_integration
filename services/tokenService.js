const constants = require('../infrastructure/constants');
const logger = require("./loggerService");

module.exports = {
  getAccessToken: async () => {
    if (!token || !token.access_token) {
      return await issueNewToken();
    }
    else {
      var dateNow = new Date();
      let dateExpires = new Date(token.date_created);
      dateExpires.setSeconds(dateExpires.getSeconds() + (token.expires_in - 2));
      if (dateNow > dateExpires) {
        return await issueNewToken();
      }
      return token;
    }
  }
};

async function issueNewToken() {
  const response = fetch(`${constants.apiBaseUrl}/iam/api/v1/auth/token`, {
    method: "POST",
    body: JSON.stringify({
      grantType: "CLIENT_CREDENTIALS",
      clientId: constants.clientId,
      clientSecret: constants.clientSecret,
      scope: "public_api/full_access",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
  let result = await (await response).json();
  result["date_created"] = new Date();
  token = result;
  logger.log({level: 'info', message: `NEW token has been issued.`});
  return result;
}

let token = {};