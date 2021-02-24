const express = require("express");
const router = express.Router();
const path = require("path");

// Admin Controller
const {
  renderIndex,
  renderUserList,
  renderAddUserForm,
  addUser,
  renderEditUserForm,
  updateUser,
  deleteUser,
} = require("../controllers/admin.controller");

// AT-SCE - Admin - Index
router.get("/", renderIndex);

// AT-SCE - Admin - Users - Render User List
router.get("/user", renderUserList);

// AT-SCE - Admin - Users - Render Add User Form
router.get("/user/add", renderAddUserForm);
// AT-SCE - Admin - Users - Add User
router.post("/user/add", addUser);

// AT-SCE - Admin - Users - Render Edit User Form
router.get("/user/edit/:id", renderEditUserForm);
// AT-SCE - Admin - Users - Edit User
router.put("/user/edit/:id", updateUser);

// AT-SCE - Admin - Users - Delete User
router.get("/user/delete/:id", deleteUser);

module.exports = router;