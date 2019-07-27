apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: moo
  labels:
    app: moo
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: moo
    spec:
      containers:
      - name: moo-app
        # Replace this with your project ID
        image: gcr.io/GOOGLE_CLOUD_PROJECT/moo:COMMIT_SHA
        imagePullPolicy: Always
        ports:
        - containerPort: 8080
        livenessProbe:
          httpGet:
            path: /healthy/
            port: 8080
        readinessProbe:
          httpGet:
            path: /healthy/
            port: 8080
        env:
          - name: EVENTBRITE_TOKEN
            valueFrom:
              secretKeyRef:
                name: evtbrite
                key: apikey
---

apiVersion: v1
kind: Service
metadata:
  name: moo-nodeport-service
spec:
  selector:
    app: moo
  ports:
  - protocol: TCP
    port: 9000
    targetPort: 8080
  type: NodePort
 