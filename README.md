# ZGuy Node.js Web App Assignment - Sign in/Sign up form

This repository contains both the development (in /src) and build (in /build) code for the Sign in/Sign up form
I created for my [ZGuy Software Solutions](http://www.zguy.com/) job application. This web app runs both the front end
using a React-based user interface (written in TypeScript) and the back end using Node.js with a PostgreSQL database. The 
application is contained in Docker containers and can be run using Docker Compose.

## Usage

To run this program, ensure you have Docker installed on your system, you can download Docker [here](https://www.docker.com/products/container-runtime)

Then you simply run following commands in the project directory:
```
docker-compose build
docker-compose up
```

#### Note

Currently pointing at the src directory to point towards the build directory change the following in the "docker-compose.yml" file.

Replace:
```
version: '3'
services:
  web:
    build: ./src/
    ports:
    - "8080:8080"
    environment:
      FLASK_ENV: development
  redist:
    image: "redis:latest"
  db:
    build: ./src/db/
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: U6ce;QoJ3WKRaZDDboEZ2zWY4yM
```
with
```version: '3'
services:
  web:
    build: ./build/
    ports:
    - "8080:8080"
    environment:
      FLASK_ENV: development
  redist:
    image: "redis:latest"
  db:
    build: ./build/db/
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: U6ce;QoJ3WKRaZDDboEZ2zWY4yM
```

## Authors
- [@Niten001](https://github.com/Niten001) Timothy Martin