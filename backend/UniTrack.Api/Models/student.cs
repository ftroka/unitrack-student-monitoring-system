namespace UniTrack.Api.Models;

public class Student
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string StudentNumber { get; set; } = string.Empty;

    public string Program { get; set; } = string.Empty;

    public int YearOfStudy { get; set; }
}