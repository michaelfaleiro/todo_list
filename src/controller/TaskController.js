const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasksLists = await Task.find();
    return res.render("index", { tasksLists });
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

  return;
};

module.exports = {
  getAllTasks,
  createTask,
};
