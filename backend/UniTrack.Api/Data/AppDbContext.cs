using Microsoft.EntityFrameworkCore;
using UniTrack.Api.Models;

namespace UniTrack.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Student> Students { get; set; }

    public DbSet<Course> Courses { get; set; }

    public DbSet<Grade> Grades { get; set; }

    public DbSet<CourseAssignment> Assignments { get; set; }

    public DbSet<User> Users { get; set; }
}