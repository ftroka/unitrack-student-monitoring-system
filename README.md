# UniTrack - Student Academic Monitoring System

UniTrack is a web-based academic monitoring system designed to help students, instructors, and administrators manage academic information in one place.

The project includes a frontend interface, role-based dashboards, and an ASP.NET Core Web API backend connected to a SQLite database using Entity Framework Core.

## Main Features

* Landing page for project introduction
* Login page with role selection
* Student dashboard
* Instructor dashboard
* Admin dashboard
* Role-based navigation
* ASP.NET Core Web API backend
* SQLite database integration
* Entity Framework Core models and migrations
* REST APIs for students, courses, assignments, grades, and users
* Frontend connected to backend APIs using JavaScript fetch

## User Roles

### Student

Students can view academic information such as grades, assignments, and academic progress.

### Instructor

Instructors can view courses and assignments and manage academic activities.

### Administrator

Administrators can view users, roles, and system information.

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* C#
* ASP.NET Core Web API
* Entity Framework Core
* SQLite

### Tools

* Visual Studio Code
* Git
* GitHub
* GitHub Desktop

## Project Structure

```text
unitrack-student-monitoring-system/
  backend/
    UniTrack.Api/
      Controllers/
      Data/
      Models/
      Migrations/
      Program.cs
      appsettings.json
      UniTrack.Api.csproj

  frontend/
    index.html
    login.html
    student-dashboard.html
    instructor-dashboard.html
    admin-dashboard.html
    style.css
    script.js

  docs/
  diagrams/
  README.md
  .gitignore
  LICENSE
```

## Backend API Endpoints

```text
GET  /api/students
GET  /api/students/{id}
POST /api/students

GET  /api/courses
GET  /api/courses/{id}
POST /api/courses

GET  /api/assignments
GET  /api/assignments/{id}
POST /api/assignments

GET  /api/grades
GET  /api/grades/{id}
POST /api/grades

GET  /api/users
GET  /api/users/{id}
POST /api/users
```

## How to Run the Backend

Open a terminal inside:

```text
backend/UniTrack.Api
```

Restore packages:

```bash
dotnet restore
```

Build the project:

```bash
dotnet build
```

Run the API:

```bash
dotnet run
```

The API will run locally on a URL similar to:

```text
http://localhost:5033
```

Example endpoint:

```text
http://localhost:5033/api/students
```

## How to Run the Frontend

Open the frontend files using Live Server in Visual Studio Code.

Start from:

```text
frontend/index.html
```

Then navigate to:

```text
Login → Student / Instructor / Admin dashboard
```

## Database

The project uses SQLite as a local database.

The database is generated locally and is not committed to GitHub.

Ignored database files:

```text
*.db
*.db-shm
*.db-wal
```

## Current Status

The project currently includes:

* Frontend pages and dashboards
* Role-based frontend navigation
* ASP.NET Core backend
* Entity Framework Core database context
* SQLite database migration
* Seed data
* REST APIs
* Frontend integration with backend APIs

## Future Improvements

* Add real authentication
* Add JWT authorization
* Add create/edit/delete forms in the frontend
* Improve dashboard statistics
* Add search and filtering
* Add validation
* Add deployment
* Add unit tests

## License

This project is licensed under the MIT License.
