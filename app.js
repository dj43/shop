const path = require('path');
var appDir = path.dirname(require.main.filename);

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/user');
const Categories = require('./models/category');

const app = express();


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6056dee3c4f8c63254d83387')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));



});

app.use('/admin', adminRoutes);
app.use(shopRoutes);





mongoose
  .connect(
    'mongodb+srv://dj:1234@cluster0.15liu.mongodb.net/shop?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Deepak',
          email: 'deepak@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });

    Categories.findOne().then(categories => {
      if (!categories) {
        const categories = new Categories({
          title:[]
        });
        categories.save();
      }
    });

    app.listen(3001);
  })
  .catch(err => {
    console.log(err);
  });
