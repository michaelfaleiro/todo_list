const Task = require("../models/Task");

let message = "";
let type = "";

const getAllTasks = async (req, res) => {
  setTimeout(() => {
    message = "";
  }, 3000);
  try {
    const tasksLists = await Task.find();
    return res.render("index", {
      tasksLists,
      task: null,
      taskDelete: null,
      message,
      type,
    });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const createTask = async (req, res) => {
  const task = req.body;

  if (!task.task) {
    message = "Tarefa Vazia";
    type = "danger";
    return res.redirect("/");
  }

  try {
    await Task.create(task);
    message = "Tarefa criada com sucesso";
    type = "success";
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
      res.render("index", {
        task,
        tasksLists,
        taskDelete: null,
        message,
        type,
      });
    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", {
        task: null,
        tasksLists,
        taskDelete,
        message,
        type,
      });
    }
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const updateOneTask = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id }, task);
    message = "Tarefa Atualizada com sucesso";
    type = "success";
    res.redirect("/");
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const deleteOneTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    message = "Tarefa deletada com sucesso";
    type = "success";
    return res.redirect("/");
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const taskCheck = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    task.check ? (task.check = false) : (task.check = true);
    await Task.updateOne({ _id: req.params.id }, task);
    res.redirect("/");
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
  taskCheck,
};
