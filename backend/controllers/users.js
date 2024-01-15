const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const ReferralLink = require("../models/referralLink");

exports.registerUser = async (req, res) => {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h", // Set expiration time as needed
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.generateReferralLink = async (req, res) => {
  // ... (code for generating a referral link)
  try {
    const userId = req.body.userId;

    const referralLink = new ReferralLink({
      userId,
      code: uuid.v4(),
    });

    await referralLink.save();

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { referralLinks: referralLink._id },
      },
      { new: true }
    );

    res.json({ referralLink: referralLink.code });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
