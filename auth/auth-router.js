const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

const Users = require('../users/userModel');




router.post('/register', (req, res) => {
  const user = req.body;
  // const ROUNDS = process.env.HASHING_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;
  // const token = generateToken(user);

    Users.add(user)
        .then(saved => {
            res.status(201).json({
                // token: token,
                message: `Welcome ${user.username}`
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findById({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        // req.session.user = user
        res.status(200).json({ message: `Welcome ${user.username}!, have a token ....`, token})

      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "error finding the user" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '8h'
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
