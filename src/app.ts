import express from "express";
import path from "path";

const app = express();

app.use("/", express.static(path.resolve(__dirname, "public")));

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log("Listening on port 3000");
});
