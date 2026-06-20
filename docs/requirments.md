# UniTrack Requirements

UniTrack is a student academic monitoring system designed to help students, instructors, and administrators manage academic information through a web-based platform.

## Project Goal

The goal of UniTrack is to provide a simple academic monitoring system where users can access and manage students, courses, assignments, grades, and users based on their role.

## User Roles

The system includes three main user roles:

```text
Student
Instructor
Administrator
```

## Functional Requirements

### General Requirements

* The system shall provide a landing page that introduces UniTrack.
* The system shall provide a login page with role selection.
* The system shall redirect users to different dashboards based on the selected role.
* The system shall provide a responsive frontend interface.
* The system shall communicate with the backend through REST API requests.

### Student Requirements

* The student shall be able to access the student dashboard.
* The student shall be able to view grades.
* The student shall be able to view assignments.
* The student shall be able to view academic progress information.
* The student dashboard shall load academic data from the backend API.

### Instructor Requirements

* The instructor shall be able to access the instructor dashboard.
* The instructor shall be able to view courses.
* The instructor shall be able to view assignments.
* The instructor shall be able to create new courses.
* The instructor shall be able to create new assignments.
* The instructor shall be able to create new grades.
* The instructor shall be able to delete courses.
* The instructor shall be able to delete assignments.

### Administrator Requirements

* The administrator shall be able to access the admin dashboard.
* The administrator shall be able to view users.
* The administrator shall be able to view students.
* The administrator shall be able to create new students.
* The administrator shall be able to delete students.
* The administrator shall be able to delete users.
* The administrator dashboard shall display user statistics.

## Backend Requirements

The backend shall be implemented using ASP.NET Core Web API.

The backend shall provide REST API endpoints for:

* Students
* Courses
* Assignments
* Grades
* Users

Each main API resource shall support CRUD operations:

```text
Create
Read
Update
Delete
```

## API Requirements

### Students API

```text
GET    /api/students
GET    /api/students/{id}
POST   /api/students
PUT    /api/students/{id}
DELETE /api/students/{id}
```

### Courses API

```text
GET    /api/courses
GET    /api/courses/{id}
POST   /api/courses
PUT    /api/courses/{id}
DELETE /api/courses/{id}
```

### Assignments API

```text
GET    /api/assignments
GET    /api/assignments/{id}
POST   /api/assignments
PUT    /api/assignments/{id}
DELETE /api/assignments/{id}
```

### Grades API

```text
GET    /api/grades
GET    /api/grades/{id}
POST   /api/grades
PUT    /api/grades/{id}
DELETE /api/grades/{id}
```

### Users API

```text
GET    /api/users
GET    /api/users/{id}
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}
```

## Data Requirements

The system shall store and manage the following data entities:

### Student

* Id
* FullName
* Email
* StudentNumber
* Program
* YearOfStudy

### Course

* Id
* CourseName
* CourseCode
* Credits
* InstructorName

### Assignment

* Id
* CourseId
* Title
* Description
* Deadline
* Status

### Grade

* Id
* StudentId
* CourseId
* Value
* Status
* CreatedAt

### User

* Id
* FullName
* Email
* PasswordHash
* Role

## Database Requirements

* The system shall use SQLite as the local database.
* The system shall use Entity Framework Core for database access.
* The system shall include database migrations.
* The system shall include seed data for demonstration purposes.
* The local database file shall not be committed to GitHub.

## Frontend Requirements

The frontend shall be implemented using:

* HTML
* CSS
* JavaScript

The frontend shall include:

* Landing page
* Login page
* Student dashboard
* Instructor dashboard
* Admin dashboard

The frontend shall use JavaScript `fetch()` to communicate with the backend API.

## Non-Functional Requirements

### Usability

* The interface should be simple and easy to understand.
* The dashboards should present information clearly using cards, tables, and forms.

### Maintainability

* The project should use a clear folder structure.
* Frontend, backend, documentation, and diagrams should be separated.
* API logic should be organized inside controllers.
* Data models should be organized inside the Models folder.

### Portability

* The project should run locally using Visual Studio Code and the .NET SDK.
* The database should be lightweight and easy to recreate.

### Security

* The current version uses demo role selection.
* Real authentication and authorization shall be added in a future version.
* Password hashing is represented only as demo data in the current version.

## Current Scope

The current version is an MVP portfolio version.

It includes:

* Static frontend pages
* Role-based dashboard navigation
* ASP.NET Core Web API backend
* SQLite database
* Entity Framework Core migrations
* Seed data
* CRUD API endpoints
* Create forms in the frontend
* Delete buttons in the frontend

## Future Requirements

Future versions may include:

* Real login and registration
* JWT authentication
* Role-based backend authorization
* Edit forms in the frontend
* Search and filtering
* Better validation
* Error messages for users
* Deployment
* Unit tests
