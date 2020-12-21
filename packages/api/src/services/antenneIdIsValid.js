const { ServiceAntenne } = require("~/models");
const { ServiceMember } = require("~/models");

module.exports = async (antenneId, userId) => {
  const antennes = await ServiceAntenne.query()
    .select("id")
    .whereIn(
      "service_id",
      ServiceMember.query().select("service_id").where("user_id", userId)
    );
  if (!antennes && !antennes.length) {
    return false;
  }
  return antennes.map(({ id }) => id).includes(antenneId);
};
