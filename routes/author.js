// define path for express router
const express = require('express');
const router = express.Router();

// define path connection with author controller
const authorController = require('../controllers/author')

// make use of controllers
router.get('/:author_id', authorController.author)

// export router module
module.exports = router;