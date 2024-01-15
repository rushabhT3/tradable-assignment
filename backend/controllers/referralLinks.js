const ReferralLink = require("../models/referralLink");
const User = require("../models/users");

exports.handleAppInstallation = async (req, res) => {
  // ... (code for handling app installation using a referral link)
  try {
    const referralCode = req.body.referralCode;

    const referralLink = await ReferralLink.findOne({ code: referralCode });

    if (!referralLink) {
      return res.status(404).json({ error: "Invalid referral code" });
    }

    if (referralLink.uses >= 5) {
      return res
        .status(400)
        .json({ error: "Referral link expired. Create a new one." });
    }

    referralLink.uses++;
    await referralLink.save();

    const user = await User.findById(referralLink.userId);
    user.credits += 5000;
    await user.save();

    res.json({ message: "Successful referral! Credits awarded." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
