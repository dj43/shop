const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: [{
    type: String,
    required: true
  }],
  category: [{
    type: String,
    required: true
  }],
  _id: {
    type: Schema.Types.ObjectId,
    required: true
  },
});

module.exports = mongoose.model('Product', productSchema);
