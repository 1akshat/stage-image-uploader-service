const express = require('express');
const dotenv = require('dotenv');
const imageRoutes = require('./src/routes/imageRoutes');

dotenv.config();
/**
 * Create an Express application.
 *
 * @type {express.Application}
 */
const app = express();

/**
 * The port on which the server will listen for incoming requests.
 *
 * @type {number|string}
 */
const port = process.env.PORT || 3000;

// Use the imageRoutes for handling requests under the '/v1/images' endpoint
app.use('/v1/images', imageRoutes);


/**
 * Start the server and listen for incoming requests on the specified port.
 *
 * @event server:listening
 * @callback
 */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
