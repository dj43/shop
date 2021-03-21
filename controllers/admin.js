const Product = require('../models/product');
const sharp = require('sharp');
const path = require('path');
const mongoose = require('mongoose');
const async = require('async');
const appDir = path.dirname(require.main.filename);
const fs = require('fs');
const Categories = require('../models/category');


exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const category = req.body.category;
  const images = req.body.images;


  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: [],
    category: category,
    _id: mongoose.Types.ObjectId()

  });

  
  let i = 0;
  dir = path.join(appDir ,"public",product._id.toString())
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

  async.eachSeries(images, function (image, callback) {    
    let imgBuffer =  Buffer.from(image, 'base64');
    i++;
    dir = path.join(appDir ,"public",product._id.toString() , i.toString())
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
    sharp(imgBuffer)
    .resize(200, 200)
    .toFile(path.join(dir , "200.jpg"), (err, info) => { 
      product.imageUrl.push("http://localhost:3001/" + product._id.toString() + '/' + i.toString() + "/200.jpg")

      sharp(imgBuffer)
      .resize(400, 400)
      .toFile(path.join(dir , "400.jpg"), (err, info) => { 
        product.imageUrl.push("http://localhost:3001/" + product._id.toString() + '/' + i.toString() + "/400.jpg")

        sharp(imgBuffer)
        .resize(280, 360)
        .toFile(path.join(dir , "280.jpg"), (err, info) => { 
          product.imageUrl.push("http://localhost:3001/" + product._id.toString() + '/' + i.toString() + "/280.jpg")
          callback(err); 
        })      
      })
    })
  }, function(err) {
    if (err) return res.status(400).json({message: err});
    product
    .save()
    .then(result => {
        Categories.updateOne(
          { $addToSet: { title: [...product.category] } }
        ).then( () => {
          res.status(200).json({message: "product-created"});
        })
    })
    .catch(err => {
      res.status(400).json({message: err});
    });
  }); 
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      res.status(200).json({message: "product-deleted"});
    })
    .catch(err =>{
      res.status(400).json({message: err})
    })
  };
