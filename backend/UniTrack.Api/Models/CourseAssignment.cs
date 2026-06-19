namespace UniTrack.Api.Models;

public class CourseAssignment
{
    public int Id { get; set; }

    public int CourseId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime Deadline { get; set; }

    public string Status { get; set; } = string.Empty;
}