const httpClient = require("../infrastructure/httpClient");
const logger = require("./loggerService");

module.exports = {
    addOrEditBulk: (httpRequest, httpResponse) => {
        setImmediate(async () => {
            try {
                const response = await httpClient.createAuthClient('POST', '/product/api/v1/merchant-integration/import', httpRequest.body);
                logger.log({
                    level: 'info',
                    message: `ENDPOINT: POST /product/api/v1/merchant-integration/import <br/>BODY: ${JSON.stringify(httpRequest.body)} <br/>RESPONSE: ${JSON.stringify(response)}`
                });
                httpResponse.status(200).send(JSON.stringify(response)).end();
            } catch (error) {
                logger.log({
                    level: 'error',
                    message: `ENDPOINT: POST /product/api/v1/merchant-integration/import <br/>BODY: ${httpRequest.body} <br/>ERROR: ${JSON.stringify(error)}`
                });
                httpResponse.status(500).send(JSON.stringify(error)).end();
            }
        });
    },
    editSingle: (httpRequest, httpResponse) => {
        setImmediate(async () => {
            try {
                const response = await httpClient.createAuthClient('PUT', `/product/api/v1/merchant-integration/product/${httpRequest.params.id}`, httpRequest.body);
                logger.log({
                    level: 'info',
                    message: `ENDPOINT: PUT /product/api/v1/merchant-integration/product/${httpRequest.params.id} <br/>BODY: ${JSON.stringify(httpRequest.body)} <br/>RESPONSE: ${JSON.stringify(response)}`
                });
                httpResponse.status(200).send(JSON.stringify(response)).end();
            } catch (error) {
                logger.log({
                    level: 'error',
                    message: `ENDPOINT: PUT /product/api/v1/merchant-integration/product/${httpRequest.params.id} <br/>BODY: ${httpRequest.body} <br/>ERROR: ${JSON.stringify(error)}`
                });
                httpResponse.status(500).send(JSON.stringify(error)).end();
            }
        });
    },
    editBulk: (httpRequest, httpResponse) => {
        setImmediate(async () => {
            try {
                const response = await httpClient.createAuthClient('PUT', '/product/api/v1/merchant-integration/product/bulk', httpRequest.body);
                logger.log({
                    level: 'info',
                    message: `ENDPOINT: PUT /product/api/v1/merchant-integration/product/bulk <br/>BODY: ${JSON.stringify(httpRequest.body)} <br/>RESPONSE: ${JSON.stringify(response)}`
                });
                httpResponse.status(200).send(JSON.stringify(response)).end();
            } catch (error) {
                logger.log({
                    level: 'error',
                    message: `ENDPOINT: PUT /product/api/v1/merchant-integration/product/bulk <br/>BODY: ${httpRequest.body} <br/>ERROR: ${JSON.stringify(error)}`
                });
                httpResponse.status(500).send(JSON.stringify(error)).end();
            }
        });
    },
    checkIfEanExist: (httpRequest, httpResponse) => {
        setImmediate(async () => {
            try {
                const response = await httpClient.createAuthClient('POST', '/product/api/v1/merchant-integration/ean/exists', httpRequest.body);
                logger.log({
                    level: 'info',
                    message: `ENDPOINT: POST /product/api/v1/merchant-integration/ean/exists <br/>BODY: ${JSON.stringify(httpRequest.body)} <br/>RESPONSE: ${JSON.stringify(response)}`
                });
                httpResponse.status(200).send(JSON.stringify(response)).end();
            } catch (error) {
                logger.log({
                    level: 'error',
                    message: `ENDPOINT: POST /product/api/v1/merchant-integration/ean/exists <br/>BODY: ${httpRequest.body} <br/>ERROR: ${JSON.stringify(error)}`
                });
                httpResponse.status(500).send(JSON.stringify(error)).end();
            }
        });
    },
    getProducts: (httpRequest, httpResponse) => {
        setImmediate(async () => {
            try {
                const response = await httpClient.createAuthClient('GET', `/product/api/v1/merchant-integration/products?ean=${httpRequest.query.ean}`, null);
                logger.log({
                    level: 'info',
                    message: `ENDPOINT: GET /product/api/v1/merchant-integration/products?ean=${httpRequest.query.ean} <br/>RESPONSE:  ${JSON.stringify(response)}`
                });
                httpResponse.status(200).send(JSON.stringify(response)).end();
            } catch (error) {
                logger.log({
                    level: 'error',
                    message: `ENDPOINT: GET /product/api/v1/merchant-integration/products?ean=${httpRequest.query.ean} <br/>ERROR: ${JSON.stringify(error)}`
                });
                httpResponse.status(500).send(JSON.stringify(error)).end();
            }
        });
    },
    getAllProducts: (httpRequest, httpResponse) => {
        setImmediate(async () => {
            try {
                let page = httpRequest.query.page ? httpRequest.query.page : 0;
                let size = httpRequest.query.size ? httpRequest.query.size : 2000;
                const response = await httpClient.createAuthClient('GET', `/product/api/v1/merchant-integration/products?page=${page}&size=${size}`, null);
                let totalWithZeroStock = 0;
                let totalStock = response.reduce((prevVal, currentVal) => {
                    if (currentVal.stockLevel == 0) {
                        totalWithZeroStock++;
                    }
                    return prevVal + currentVal.stockLevel;
                }, 0);
                logger.log({
                    level: 'info',
                    message: `ENDPOINT: GET /product/api/v1/merchant-integration/products?page=${page}&size=${size} <br/>Total number of products: ${response.length}<br/> Total stock: ${totalStock}<br/> Total products with stock: ${response.length - totalWithZeroStock}<br/> Total products with zero stock: ${totalWithZeroStock}`
                });
                httpResponse.status(200).send(response.map((x) => {
                    return {
                        name: x.name,
                        id: x.id,
                        sku: x.sku,
                        ean: x.ean,
                        newBasePrice: x.newBasePrice,
                        basePrice: x.basePrice,
                        stockLevel: x.stockLevel,
                    };
                })).end();
            } catch (error) {
                logger.log({
                    level: 'error',
                    message: `ENDPOINT: GET /product/api/v1/merchant-integration/products?page=${page}&size=${size} <br/>ERROR: ${JSON.stringify(error)}`
                });
                httpResponse.status(500).send(JSON.stringify(error)).end();
            }
        });
    },
};