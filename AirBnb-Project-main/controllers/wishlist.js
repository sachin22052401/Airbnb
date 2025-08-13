const Wishlist = require('../models/wishlist');
const Listing = require('../models/listing');

module.exports.addToWishlist = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
        wishlist = new Wishlist({ user: userId, listings: [] });
    }
    if (!wishlist.listings.includes(id)) {
        wishlist.listings.push(id);
        await wishlist.save();
    }
    req.flash('success', 'Listing added to your wishlist!');
    res.redirect(`/listings/${id}`);
};

module.exports.removeFromWishlist = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    let wishlist = await Wishlist.findOne({ user: userId });
    if (wishlist) {
        wishlist.listings.pull(id);
        await wishlist.save();
    }
    req.flash('success', 'Listing removed from your wishlist!');
    res.redirect(`/listings/${id}`);
};

module.exports.viewWishlist = async (req, res) => {
    const userId = req.user._id;
    const wishlist = await Wishlist.findOne({ user: userId }).populate('listings');
    res.render('users/wishlist', { wishlist });
};
