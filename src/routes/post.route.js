const express = require('express');
const router = express.Router();

const postController = require('../app/controllers/PostController');

router.get('/create', postController.create);
router.post('/store', postController.store);
router.post('/controlform', postController.controlForm);
router.put('/:id', postController.update);
router.patch('/:id/restore', postController.restore);
router.get('/:id/edit', postController.edit);
router.delete('/:id/force', postController.forceDestroy);
router.delete('/:id', postController.destroy);
router.get('/:slug', postController.show);

module.exports = router;
