const Product = require('../models/product');
const Order = require('../models/order');
const Categories = require('../models/category');

exports.getProducts = (req, res, next) => {
  Product.find({ category: req.query.category })
    .then(products => {
      res.status(200).json(products);

    })
    .catch(err => {
      res.status(400).json({message: "bad-request"});
    });
};

exports.getCategory = (req, res, next) => {
  Categories.find()
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch(err => {
      res.status(400).json({message: err});
    });
};


exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(400).json({message: err});
    });
    };

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({message: err});
    });
};

exports.postCartReduceProduct = (req, res, next) => {
  const prodId = req.body.productId;
  
  Product.findById(prodId)
    .then(product => {
      return req.user.removeOneFromCart(product);
    })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({message: err});
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(400).json({message: err});
    });};



exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products,
        address: req.body.address,
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.status(200).json({message:'order-placed'});
    })
    .catch(err => res.status(400).json({message: err}));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.status(200).json({orders});
    })
    .catch(err => res.status(400).json({message: err}));
};
