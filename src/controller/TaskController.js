const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasksLists = await Task.find();
    return res.render("index", { tasksLists, task: null, taskDelete: null });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const createTask = async (req, res) => {
  const task = req.body;

  if (!task.task) {
    return res.redirect("/");
  }

  try {
    await Task.create(task);
    return res.redirect("/");
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const getByid = async (req, res) => {
  try {
    const tasksLists = await Task.find();
    if (req.params.method == "update") {
      const task = await Task.findOne({ _id: req.params.id });
      res.render("index", { task, tasksLists, taskDelete: null });
    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", { task: null, tasksLists, taskDelete });
    }
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const updateOneTask = async (req, res) => {
  try {
    const task = req.body;

    await Task.updateOne({ _id: req.params.id }, task);
    res.redirect("/");
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const deleteOneTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    return res.redirect("/");
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getByid,
  updateOneTask,
  deleteOneTask,
};
