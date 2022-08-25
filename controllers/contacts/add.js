const { Contact } = require("../../models");

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "New contact has been added",
    data: {
      result,
    },
  });
};

module.exports = add;