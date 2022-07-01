import express from 'express';
import book from './book';
import wishlist from './wishlist';

const router = express.Router();

router.use(book);
router.use(wishlist);

export default router;
