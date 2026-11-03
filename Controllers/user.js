const crypto = require('crypto');
const User = require('../Models/user');

// hashing the password w crypto (built in node) + random salt so same passwords dont look the same
// saved as salt:hash
const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
};

// login: hash what the user typed w the same salt n check if its the same hash
const checkPassword = (password, savedPassword) => {
  const [salt, savedHash] = savedPassword.split(':');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return hash === savedHash;
};

const signup = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).send({
        message: 'Send all required fields: name, email, password',
      });
    }

    if (req.body.password.length < 8) {
      return res.status(400).send({
        message: 'Password must be at least 8 characters',
      });
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).send({ message: 'Email is already registered' });
    }

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password),
    };

    const user = await User.create(newUser);

    return res.status(201).send({
      message: 'User registered successfully',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: 'Send all required fields: email, password',
      });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user || !checkPassword(req.body.password, user.password)) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    return res.status(200).send({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
};
