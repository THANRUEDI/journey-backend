const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.create);
router.get('/', postController.all);
router.delete('/:id', postController.deletePost);

module.exports = router;