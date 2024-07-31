

import express from 'express';
import {User} from '../models/User.js';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('Invalid username or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send('Invalid username or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;