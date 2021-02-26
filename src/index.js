if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// App file
const app = require("./server");

// Run app
app.listen(app.get("port"), () => {
  console.log("Server on port:", app.get("port"));
});
