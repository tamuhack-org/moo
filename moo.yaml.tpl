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
        ports:
        - containerPort: 3000
        livenessProbe:
          httpGet:
            path: /
            port: 3000
        readinessProbe:
          httpGet:
            path: /
            port: 3000
        env:
          - name: EVENTBRITE_KEY
            valueFrom:
              secretKeyRef:
                name: eventbrite
                key: key
---

apiVersion: v1
kind: Service
metadata:
  name: moo-nodeport-service
spec:
  selector:
    app: moo
  type: NodePort
  ports:
  - protocol: TCP
    port: 9001
    targetPort: 3000