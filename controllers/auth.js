const bcrypt = require('bcryptjs');
const { check, body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
    oldInput: { email: '', password: '' }, // Preserve user input
    validationErrors: []
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
    oldInput: { name: '', email: '', password: '', confirmPassword: '' }, // Preserve user input
    validationErrors: []
  });
};

exports.postLogin = [
  check('email').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
  body('password', 'Password has to be valid.').isLength({ min: 5 }).isAlphanumeric().trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    const email = req.body.email;
    const password = req.body.password;

    if (!errors.isEmpty()) {
      return res.status(422).render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: errors.array()[0].msg,
        oldInput: { email: email, password: password }, // Preserve user input
        validationErrors: errors.array()
      });
    }

    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid login credentials!',
            oldInput: { email: email, password: password }, // Preserve user input
            validationErrors: []
          });
        }
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save(err => {
                if (err) {
                  console.log(err);
                }
                res.redirect('/');
              });
            } else {
              return res.status(422).render('auth/login', {
                path: '/login',
                pageTitle: 'Login',
                errorMessage: 'Invalid login credentials!',
                oldInput: { email: email, password: password }, // Preserve user input
                validationErrors: []
              });
            }
          })
          .catch(err => {
            console.log(err);
            res.redirect('/login');
          });
      })
      .catch(err => {
        console.log(err);
        res.redirect('/login');
      });
  }
];

exports.postSignup = [
  check('email').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
  body('password', 'Please enter a password with only numbers and text and at least 5 characters.')
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim(),
  body('confirmPassword').trim().custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords have to match!');
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    if (!errors.isEmpty()) {
      return res.status(422).render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: errors.array()[0].msg,
        oldInput: {
          name: name,
          email: email,
          password: password,
          confirmPassword: req.body.confirmPassword
        }, // Preserve all user input
        validationErrors: errors.array()
      });
    }

    User.findOne({ email: email })
      .then(userDoc => {
        if (userDoc) {
          req.flash('error', 'Email already in use. Please try a different one!');
          return res.redirect('/signup');
        }
        return bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            const user = new User({
              name: name,
              email: email,
              password: hashedPassword,
              cart: { items: [] }
            });
            return user.save();
          })
          .then(result => {
            res.redirect('/login');
          });
      })
      .catch(err => {
        console.log(err);
        res.redirect('/signup');
      });
  }
];

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
};
