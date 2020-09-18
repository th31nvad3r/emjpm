const { User } = require("../models/User");

const editorMesureUserMiddleWare = async (req, res, next) => {
  const {
    user: { user_id },
  } = req;

  let user;
  let serviceOrMandataire;

  try {
    user = await User.query().findById(user_id);
    req.user = user;
  } catch (error) {
    console.log(error);
    return res
      .status(422)
      .json({ errors: [{ value: user_id, msg: "user not found" }] });
  }

  const type = user.type === "service" ? "service" : "mandataire";
  req.type = type;

  try {
    serviceOrMandataire = await user.$relatedQuery(type);
    req.serviceOrMandataire = serviceOrMandataire;
  } catch (error) {
    return res.status(422).json({ errors: [{ msg: `${type} not found` }] });
  }

  next();
};

module.exports = editorMesureUserMiddleWare;