const { setCurrentTenant } = require("./storage");

exports.tenantHandler = async function (req, res, next) {
  try {
    const { tenant } = req.headers;
    if (!tenant) throw Error("No tenant provided");
    // const currentTenant = await tenantService.fetchByTenantName(tenant);
    // if (!currentTenant) throw Error("Tenant not found!");
    setCurrentTenant(tenant);
    next();
  } catch (err) {
    next(err);
  }
};
