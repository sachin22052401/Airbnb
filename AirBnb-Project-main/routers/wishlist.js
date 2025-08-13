const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist');
const { isLoggedIn } = require('../loggedIn-middileware');

router.post('/add/:id', isLoggedIn, wishlistController.addToWishlist);
router.post('/remove/:id', isLoggedIn, wishlistController.removeFromWishlist);
router.get('/', isLoggedIn, wishlistController.viewWishlist);

module.exports = router;
