const bcrypt = require("bcrypt");
const User = require("../../models/user/model");
const { signToken } = require("../../middleware/auth");
const { asyncHandler } = require("../../middleware/errorHandler");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ success: false, message: "Invalid email or password" });

  const token = signToken(user);
  res.json({
    success: true,
    data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } },
  });
});

const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ success: true, data: user });
});

module.exports = { login, me };
