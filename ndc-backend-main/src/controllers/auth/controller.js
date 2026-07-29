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
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        dob: user.dob,
        address: user.address,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    },
  });
});

const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      dob: user.dob,
      address: user.address,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    },
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, dob, address, profileImage } = req.body;
  
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name, dob, address, profileImage },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({
    success: true,
    data: {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      dob: updatedUser.dob,
      address: updatedUser.address,
      profileImage: updatedUser.profileImage,
      createdAt: updatedUser.createdAt,
    },
  });
});

module.exports = { login, me, updateProfile };
