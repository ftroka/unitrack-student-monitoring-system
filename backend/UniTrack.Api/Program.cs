using Microsoft.EntityFrameworkCore;
using UniTrack.Api.Data;
using UniTrack.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddControllers();

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
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
