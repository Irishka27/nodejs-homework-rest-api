const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { sendEmail } = require("../../helpers");

const { User } = require("../../models");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const avatarUrl = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = nanoid();

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarUrl,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm your email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarUrl,
        verificationToken,
      },
    },
  });
};

module.exports = register;
