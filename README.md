# Moo

This app is hosted on [Google Cloud Platform](https://cloud.google.com) as part of a Kubernetes cluster. It uses [Google Cloud Build](https://cloud.google.com/cloud-build) for continuous deployment, and [Google Cloud Datastore](https://cloud.google.com/datastore) for storing email data.

## Running the app locally:
The application runs using Node v10; install the dependencies with:
```
npm i
```
To run the application locally (with the exception of storing data), you'll need to compile the TypeScript into JavaScript.  The command to do this is:
```
npm run gcp-build
```
Then, to run the server:
```
npm start
```

The server should be hosted at [http://localhost:3000](http://localhost:3000).
