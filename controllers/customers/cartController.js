exports.cartController = async (req, res, next) => {
  res.render("customers/cart");
};

exports.updateCart = async (req, res, next) => {
  console.log("body=", req.body);
  // I am checking do i have cart inside my session
  if (!req.session.cart) {
    req.session.cart = {
      items: {},
      totalQty: 0,
      totalPrize: 0,
    };
  }

  let cart = req.session.cart;

  if (!cart.items[req.body._id]) {
    cart.items[req.body._id] = {
      item: req.body,
      qty: 1,
    };

    cart.totalQty = cart.totalQty + 1;
    cart.totalPrize = cart.totalPrize + req.body.price;
  } else {
    cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
    cart.totalQty = cart.totalQty + 1;
    cart.totalPrize = cart.totalPrize + req.body.price;
  }

  return res.json({ totalQty: req.session.cart.totalQty });
};
