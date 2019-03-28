import { app } from "./app";

let server;
if (!process.env.PORT) {
  console.log(
    "The port to run on was not provided as an environment variable. Using a fallback."
  );
  server = app.listen(3000, () => {
    console.log("Listening on port 3000 (no env var) in development mode.");
  });
} else {
  server = app.listen(process.env.PORT, () => {
    if (process.env.PRODUCTION === "true") {
      console.log(`Listening on port ${process.env.PORT} in production mode.`);
    } else {
      console.log(`Listening on port ${process.env.PORT} in development mode.`);
    }
  });
}
export { server };
