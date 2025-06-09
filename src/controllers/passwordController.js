import Password from '../models/Password.js';

//Create new password entry
export const createPassword = async (req, res, next) => {
  try {
    const { title, username, password, notes } = req.body;

    const newPassword = await Password.create({
      title,
      username,
      password,
      notes,
      user: req.user._id, //from auth middleware
    });

    res.status(201).json(newPassword);
  } catch (error) {
    next(error);
  }
};

//Get all passwords for a user
export const getPasswords = async (req, res, next) => {
  try {
    const passwords = await Password.find({ user: req.user._id }); //filter by user
    res.json(passwords);
  } catch (error) {
    next(error);
  }
};

//Update a password by ID
export const updatePassword = async (req, res, next) => {
    try {
        const password = await Password.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true})

        if (!password) {
            return res.status(404).json({ message: 'Password not found' });
        }

        res.json(password);
    } catch (error) {
        next(error);
    }
}

//Delete a password by ID
export const deletePassword = async (req, res, next) => {
    try {
        const password = await Password.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!password) {
            return res.status(404).json({ message: 'Password not found' });
        }

        res.json({ message: 'Password deleted' });
    } catch (error) {
        next(error);
    }
}
