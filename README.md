# moo

This app runs on Google Cloud Platform, specifically using:

- [App Engine](https://cloud.google.com/appengine/) for hosting
- [Cloud Build](https://cloud.google.com/cloud-build/) for continuous deployment
- [Cloud Datastore](https://cloud.google.com/datastore/) for data storage

To run the application locally (with the exception of storing data), you'll need to compile the TypeScript into JavaScript. The command to do this is:

```
npm run gcp-build
```

Then, to run the server:

```
npm start
```

The server should be hosted at [http://localhost:3000](http://localhost:3000)
