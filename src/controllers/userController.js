const { User } = require("../models");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.userId !== user.id) {
      return res
        .status(403)
        .json({ error: "You don't have permission to get info" });
    }

    const userData = user.toJSON();
    delete userData.password;

    res.status(200).json({ data: userData });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getUser,
};
