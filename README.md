# AIntegrator - Frontend

This is the marketing website for AIntegrator, built with Angular. It serves as the frontend interface for users to learn about our services, the product, and how to get in touch.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

# Deployment
```bash
docker build --platform=linux/amd64 -t azytaku/aintegrator-frontend:testing.0.0.1 -f Dockerfile .
```

```bash
docker push azytaku/aintegrator-frontend:testing.0.0.1
```

