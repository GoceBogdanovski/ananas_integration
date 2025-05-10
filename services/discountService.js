const httpClient = require("../infrastructure/httpClient");
const constants = require('../infrastructure/constants');
const logger = require("./loggerService");

module.exports = {
    getAllDiscounts: (_, httpResponse) => {
        setImmediate(async () => {
            try {
                const response = await httpClient.createAuthClient('GET', `/payment/api/v1/merchant-integration/discounts?dateFrom=${constants.discountsStartDate}&dateTo=${constants.discountsEndDate}`, null);
                logger.log({
                    level: 'info',
                    message: `ENDPOINT: GET /payment/api/v1/merchant-integration/discounts?dateFrom=${constants.discountsStartDate}&dateTo=${constants.discountsEndDate} <br/>RESPONSE:  ${JSON.stringify(response)}`
                });
                httpResponse.status(200).send(JSON.stringify(response)).end();
            } catch (error) {
                logger.log({
                    level: 'error',
                    message: `ENDPOINT: GET /payment/api/v1/merchant-integration/discounts?dateFrom=${constants.discountsStartDate}&dateTo=${constants.discountsEndDate} <br/>ERROR: ${JSON.stringify(error)}`
                });
                httpResponse.status(500).send(JSON.stringify(error)).end();
            }
        });
    },
    scheduleDiscountBulk: (httpRequest, httpResponse) => {
        setImmediate(async () => {
            try {
                const response = await httpClient.createAuthClient('POST', '/payment/api/v1/merchant-integration/discounts', {discounts: httpRequest.body});
                logger.log({
                    level: 'info',
                    message: `ENDPOINT: POST /payment/api/v1/merchant-integration/discounts <br/>BODY: ${JSON.stringify(httpRequest.body)} <br/>RESPONSE: ${JSON.stringify(response)}`
                });
                httpResponse.status(200).end();
            } catch (error) {
                logger.log({
                    level: 'error',
                    message: `ENDPOINT: POST /payment/api/v1/merchant-integration/discounts <br/>BODY: ${httpRequest.body} <br/>ERROR: ${JSON.stringify(error)}`
                });
                httpResponse.status(500).send(JSON.stringify(error)).end();
            }
        });
    },
    updateDiscountBulk: (httpRequest, httpResponse) => {
        setImmediate(async () => {
            try {
                const response = await httpClient.createAuthClient('PUT', '/payment/api/v1/merchant-integration/discounts', httpRequest.body);
                logger.log({
                    level: 'info',
                    message: `ENDPOINT: PUT /payment/api/v1/merchant-integration/discounts <br/>BODY: ${JSON.stringify(httpRequest.body)} <br/>RESPONSE: ${JSON.stringify(response)}`
                });
                httpResponse.status(200).end();
            } catch (error) {
                logger.log({
                    level: 'error',
                    message: `ENDPOINT: PUT /payment/api/v1/merchant-integration/discounts <br/>BODY: ${httpRequest.body} <br/>ERROR: ${JSON.stringify(error)}`
                });
                httpResponse.status(500).send(JSON.stringify(error)).end();
            }
        });
    },
    cancelDiscountBulk: (httpRequest, httpResponse) => {
        setImmediate(async () => {
            try {
                const discountIds = httpRequest.body;
                responseResults = [];
                discountIds.forEach(async (id) => {
                    const response = await httpClient.createAuthClient('PUT', `/payment/api/v1/merchant-integration/discounts/${id}/cancellations`, httpRequest.body);
                    responseResults.push(response);
                });

                logger.log({
                    level: 'info',
                    message: `ENDPOINT: PUT /payment/api/v1/merchant-integration/discounts/${httpRequest.query.discountId}/cancellations <br/>BODY: ${JSON.stringify(httpRequest.body)} <br/>RESPONSE: ${JSON.stringify(responseResults)}`
                });
                httpResponse.status(200).end();
            } catch (error) {
                logger.log({
                    level: 'error',
                    message: `ENDPOINT: PUT /payment/api/v1/merchant-integration/discounts/${httpRequest.query.discountId}/cancellations <br/>BODY: ${httpRequest.body} <br/>ERROR: ${JSON.stringify(error)}`
                });
                httpResponse.status(500).send(JSON.stringify(error)).end();
            }
        });
    },
};

