const Item = require("../models/Item");

exports.getItems = async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
};

exports.createItem = async (req, res) => {
  const { name, quantity,category } = req.body;
  const item = await Item.create({ name, quantity,category });
  res.status(201).json(item);
};

exports.updateItem = async (req, res) => {
  const updates = {};
  for (const field of ["name", "quantity", "category"]) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  const item = await Item.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true, runValidators: true }
  );

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(item);
};

exports.deleteItem = async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item deleted" });
};
