# Todo List Express

A simple todo list application built with Express.js and Node.js.

## Features

- Create, read, update, and delete todo items
- RESTful API endpoints
- Docker support for easy deployment

## Prerequisites

- Node.js (LTS version)
- npm or yarn
- Docker (optional)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/todo-list-express.git
   cd todo-list-express
   ```

2. Install dependencies:
   ```
   npm install
   ```


## Running the Application

### Without Docker

1. Start the server:
   ```
   npm run dev
   ```

2. The application will be available at `http://localhost:3000`

### With Docker


1. Build the Docker image:
   ```
   docker build -t todo-list-express .
   ```

2. Run the Docker container:
   ```
   docker run -p 3000:3000 todo-list-express
   ```

3. The application will be available at `http://localhost:3000`


### With Docker Compose

1. Make sure you have Docker and Docker Compose installed on your system.

2. Navigate to the project directory:
   ```
   cd todo-list-express
   ```

3. Build and start the containers:
   ```
   docker-compose up --build
   ```

   This command will build the Docker images if they don't exist and start the containers defined in the `docker-compose.yml` file.

4. The application will be available at `http://localhost:3000`

5. The PostgreSQL database will be accessible on port 5432.

6. To stop the containers, use:
   ```
   docker-compose down
   ```

   This will stop and remove the containers, but preserve the database data.

7. If you want to remove all data and start fresh, use:
   ```
   docker-compose down -v
   ```

   This command will remove the volumes along with the containers, effectively resetting your database.

Note: The Docker Compose setup includes both the Node.js application and a PostgreSQL database. Make sure no other services are using the ports 3000 and 5432 on your host machine.

## Database Migration

To set up and manage your database schema, we use migrations. Follow these steps to run the migrations:

1. Ensure your database connection is properly configured in the `.env` file.

2. Run the migrations:
   ```
   npm run migrate:dev
   ```

   This command will apply all pending migrations to your database.



### Running Migrations with Docker

If you're using Docker, you can run migrations inside the Docker container:

1. First, make sure your Docker containers are running:
   ```
   docker-compose up -d
   ```

2. Then, execute the migration command inside the container:
   ```
   docker-compose exec app npm run migrate:dev
   ```

   Replace `app` with the name of your Node.js service in the docker-compose file if it's different.

Remember to run migrations whenever you make changes to your database schema or when setting up the project for the first time.

## API Endpoints

- `GET /todos`: Retrieve all todo items
- `POST /todos`: Create a new todo item
- `GET /todos/:id`: Retrieve a specific todo item
- `PUT /todos/:id`: Update a specific todo item
- `DELETE /todos/:id`: Delete a specific todo item