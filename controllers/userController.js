const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.register = async (req, res) => {
  const { name, tel, password } = req.body;
  const checkUser = await User.findOne({ name });

  if (checkUser) return res.status(400).json({ message: 'User have in database' });

  // return res.json(req.body)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({ name, tel, password: hashedPassword });
  await user.save();
  // return res.json(req.body)
  res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const isMatch = await bcrypt.compare(password, user.password); // true

  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user });
};