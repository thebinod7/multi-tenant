const mongoose = require("mongoose");
const { Schema } = mongoose;

const BaseModel = require("./index");
const { getCurrentTenant } = require("../utils/storage");

const createSchema = (schema, options = {}) => {
  return new Schema(schema, options);
};

const schema = { name: { type: String, required: true }, address: String };
const options = {
  collection: "users",
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
};

const userSchema = createSchema(schema, options);

class UserDetails extends BaseModel {
  constructor(db) {
    const model = db.model("users", userSchema);
    super(model);
  }

  // Methods besides default ones in the base class
  findOne(filter) {
    return this.model.findOne(filter);
  }
}

module.exports = () => {
  const tenantConnection = getCurrentTenant();
  if (!tenantConnection) throw Error("No tenat found!");
  return new UserDetails(tenantConnection);
};
