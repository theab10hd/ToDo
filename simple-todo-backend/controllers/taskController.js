const Task = require("../models/Task");

const addTask = async (req, res) => {
  try {
    const { task, userid } = req.body;

    if (!task || !userid) {
      return res
        .status(400)
        .json({ message: "Task and User ID are required!" });
    }

    const newTask = new Task({
      task,
      userid,
    });

    await newTask.save();
    res.status(201).json({ message: "Task Created", task: newTask });
  } catch (e) {
    res.status(500).json({ message: "Server Error", error: e.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required!" });
    }

    const tempTask = await Task.findByIdAndDelete(taskId);

    if (!tempTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res
      .status(200)
      .json({ message: "Task Deleted Successfully", deletedTask: tempTask });
  } catch (e) {
    res.status(500).json({ message: "Server Error", error: e.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const { userid } = req.params;

    if (!userid) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const tasks = await Task.find({ userid });

    res.status(200).json({ message: "Tasks Found", tasks });
  } catch (e) {
    console.error("Error fetching tasks:", e);
    res.status(500).json({ message: "Server Error", error: e.message });
  }
};

module.exports = { addTask, deleteTask, getAllTasks };
