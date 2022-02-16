class Model {
  constructor(model) {
    this.model = model;
  }

  save(payload = {}) {
    return this.model.create(payload);
  }

  fetchAll() {
    return this.model.find();
  }

  fetchById(id) {
    return this.model.findById(id);
  }
}

module.exports = Model;
