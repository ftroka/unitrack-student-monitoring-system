# UniTrack Architecture

UniTrack follows a simple full-stack web application architecture. The system is divided into a frontend layer, a backend API layer, and a database layer.

## Architecture Overview

```text
User Browser
    |
    | HTML, CSS, JavaScript
    |
Frontend
    |
    | JavaScript fetch requests
    |
ASP.NET Core Web API
    |
    | Entity Framework Core
    |
SQLite Database
```

## Frontend Layer

The frontend is responsible for the user interface and user interaction.

It is built with:

* HTML
* CSS
* JavaScript

The frontend includes:

* Landing page
* Login page with role selection
* Student dashboard
* Instructor dashboard
* Admin dashboard

The dashboards communicate with the backend API using JavaScript `fetch()` requests.

## Backend Layer

The backend is built using ASP.NET Core Web API.

The backend is responsible for:

* Handling API requests
* Managing academic data
* Connecting to the database
* Providing REST endpoints for the frontend

The main backend folders are:

```text
Controllers/
Data/
Models/
Migrations/
```

## Controllers

Controllers expose REST API endpoints for the frontend.

The project includes controllers for:

* Students
* Courses
* Assignments
* Grades
* Users

Each controller supports common CRUD operations such as:

```text
GET
POST
PUT
DELETE
```

## Models

Models represent the main data entities of the system.

The main models are:

* Student
* Course
* CourseAssignment
* Grade
* User

These models define the structure of the data used by the system.

## Data Layer

The data layer uses Entity Framework Core.

The main database context is:

```text
AppDbContext
```

`AppDbContext` connects the models to the SQLite database and defines the database tables through `DbSet` properties.

## Database

The project uses SQLite as a local database.

SQLite was chosen because it is simple, lightweight, and suitable for a portfolio project or academic prototype.

The database stores:

* Students
* Courses
* Assignments
* Grades
* Users

The local database file is ignored by Git and is not committed to GitHub.

## API Communication

The frontend communicates with the backend through REST API calls.

Example API endpoints:

```text
GET    /api/students
POST   /api/students
PUT    /api/students/{id}
DELETE /api/students/{id}
```

The same structure is used for courses, assignments, grades, and users.

## Role-Based Dashboards

UniTrack includes three main user roles:

### Student

The student dashboard displays academic data such as grades and assignments.

### Instructor

The instructor dashboard displays courses and assignments and allows the creation of courses, assignments, and grades.

### Administrator

The admin dashboard displays users and students and supports user/student management actions.

## Current Architecture Type

UniTrack uses a client-server architecture.

The browser acts as the client, while the ASP.NET Core Web API acts as the server. The server communicates with the SQLite database through Entity Framework Core.

## Future Architecture Improvements

Future versions of the system may include:

* Real authentication
* JWT authorization
* Role-based access control in the backend
* Service layer between controllers and database context
* DTOs for request and response models
* Input validation
* Deployment to a cloud server
* Unit and integration tests
