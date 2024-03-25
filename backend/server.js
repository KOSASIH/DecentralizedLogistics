const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(logger('dev'));

// Import API routes
const itemOrders = require('./routes/orderItem');
const itemApprovals = require('./routes/approveItem');
const itemCancellations = require('./routes/cancelItem');
const itemShipments = require('./routes/shipItem');
const itemSearches = require('./routes/searchItems');

// Use API routes
app.use('/api/item-orders', itemOrders);
app.use('/api/item-approvals', itemApprovals);
app.use('/api/item-cancellations', itemCancellations);
app.use('/api/item-shipments', itemShipments);
app.use('/api/item-searches', itemSearches);

// Set up the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
