using Microsoft.EntityFrameworkCore;
using UniTrack.Api.Data;
using UniTrack.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    context.Database.Migrate();

    if (!context.Students.Any())
    {
        context.Students.AddRange(
            new Student
            {
                FullName = "Arjol Sinaj",
                Email = "arjol.sinaj@example.com",
                StudentNumber = "STU001",
                Program = "Business Informatics",
                YearOfStudy = 2
            },
            new Student
            {
                FullName = "Fabjan Troka",
                Email = "fabjan.troka@example.com",
                StudentNumber = "STU002",
                Program = "Computer Science",
                YearOfStudy = 3
            },
            new Student
            {
                FullName = "Elvis Lamaj",
                Email = "elvis.lamaj@example.com",
                StudentNumber = "STU003",
                Program = "Computer Engineering",
                YearOfStudy = 1
            }
        );

        context.SaveChanges();
    }

    if (!context.Courses.Any())
    {
        context.Courses.AddRange(
            new Course
            {
                CourseName = "Software Engineering",
                CourseCode = "SWE101",
                Credits = 6,
                InstructorName = "Dr. Mentor Kola"
            },
            new Course
            {
                CourseName = "Database Systems",
                CourseCode = "DBS201",
                Credits = 5,
                InstructorName = "Dr. Ana Leka"
            },
            new Course
            {
                CourseName = "Web Development",
                CourseCode = "WEB150",
                Credits = 5,
                InstructorName = "Dr. Ilir Domi"
            }
        );

        context.SaveChanges();
    }

    if (!context.Assignments.Any())
    {
        var softwareEngineering = context.Courses.First(c => c.CourseCode == "SWE101");
        var databaseSystems = context.Courses.First(c => c.CourseCode == "DBS201");
        var webDevelopment = context.Courses.First(c => c.CourseCode == "WEB150");

        context.Assignments.AddRange(
            new CourseAssignment
            {
                CourseId = softwareEngineering.Id,
                Title = "Requirements Analysis",
                Description = "Prepare a requirements document for an academic system.",
                Deadline = new DateTime(2026, 6, 25),
                Status = "Open"
            },
            new CourseAssignment
            {
                CourseId = databaseSystems.Id,
                Title = "Database Design",
                Description = "Create an ER diagram and database schema.",
                Deadline = new DateTime(2026, 6, 28),
                Status = "Open"
            },
            new CourseAssignment
            {
                CourseId = webDevelopment.Id,
                Title = "Frontend Layout",
                Description = "Build a responsive dashboard layout.",
                Deadline = new DateTime(2026, 7, 2),
                Status = "Planned"
            }
        );

        context.SaveChanges();
    }

    if (!context.Grades.Any())
    {
        var arjol = context.Students.First(s => s.StudentNumber == "STU001");
        var fabjan = context.Students.First(s => s.StudentNumber == "STU002");
        var elvis = context.Students.First(s => s.StudentNumber == "STU003");

        var softwareEngineering = context.Courses.First(c => c.CourseCode == "SWE101");
        var databaseSystems = context.Courses.First(c => c.CourseCode == "DBS201");
        var webDevelopment = context.Courses.First(c => c.CourseCode == "WEB150");

        context.Grades.AddRange(
            new Grade
            {
                StudentId = arjol.Id,
                CourseId = softwareEngineering.Id,
                Value = 9,
                Status = "Passed"
            },
            new Grade
            {
                StudentId = fabjan.Id,
                CourseId = databaseSystems.Id,
                Value = 8,
                Status = "Passed"
            },
            new Grade
            {
                StudentId = elvis.Id,
                CourseId = webDevelopment.Id,
                Value = 9,
                Status = "Passed"
            }
        );

        context.SaveChanges();
    }

    if (!context.Users.Any())
    {
        context.Users.AddRange(
            new User
            {
                FullName = "Arjol Sinaj",
                Email = "arjol.sinaj@example.com",
                PasswordHash = "demo-password-hash",
                Role = "Student"
            },
            new User
            {
                FullName = "Fabjan Troka",
                Email = "fabjan.troka@example.com",
                PasswordHash = "demo-password-hash",
                Role = "Student"
            },
            new User
            {
                FullName = "Elvis Lamaj",
                Email = "elvis.lamaj@example.com",
                PasswordHash = "demo-password-hash",
                Role = "Instructor"
            },
            new User
            {
                FullName = "Admin User",
                Email = "admin@example.com",
                PasswordHash = "demo-password-hash",
                Role = "Admin"
            }
        );

        context.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.MapControllers();

app.Run();