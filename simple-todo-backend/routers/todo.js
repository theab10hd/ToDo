const express = require("express");
const {
  addTask,
  deleteTask,
  getAllTasks,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/add", addTask);
router.delete("/delete/:taskId", deleteTask);
router.get("/all/:userid", getAllTasks);

module.exports = router;
