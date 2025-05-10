const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const productService = require("./services/productService");
const discountService = require("./services/discountService");
const loggerService = require("./services/loggerService");

const port = 3300;
const hostName = "127.0.0.1";
const server = app.listen(port, hostName, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

// Configuring body parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '50mb',
        parameterLimit: 500000,
    }),
);

app.use(cors());
app.use(express.json({ limit: '50mb' }));

//ENDPOINTS
//products
app.post('/addOrEditBulk', productService.addOrEditBulk);
app.post('/editSingle/:id', productService.editSingle);
app.post('/editBulk', productService.editBulk);
app.post('/checkIfEanExist', productService.checkIfEanExist);
app.get('/getProducts', productService.getProducts);
app.get('/getAllProducts', productService.getAllProducts);
//discounts 
app.get('/getAllDiscounts', discountService.getAllDiscounts);
app.post('/scheduleDiscountBulk', discountService.scheduleDiscountBulk);
app.post('/updateDiscountBulk', discountService.updateDiscountBulk);
app.post('/cancelDiscountBulk', discountService.cancelDiscountBulk);
//logs
app.get('/logs', (req, httpResponse) => {    
    loggerService.readLogs(req, httpResponse);
});