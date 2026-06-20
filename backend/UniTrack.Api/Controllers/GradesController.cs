using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniTrack.Api.Data;
using UniTrack.Api.Models;

namespace UniTrack.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GradesController : ControllerBase
{
    private readonly AppDbContext _context;

    public GradesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Grade>>> GetGrades()
    {
        var grades = await _context.Grades.ToListAsync();

        return Ok(grades);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Grade>> GetGradeById(int id)
    {
        var grade = await _context.Grades.FindAsync(id);

        if (grade == null)
        {
            return NotFound();
        }

        return Ok(grade);
    }

    [HttpPost]
    public async Task<ActionResult<Grade>> CreateGrade(Grade grade)
    {
        _context.Grades.Add(grade);

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetGradeById), new { id = grade.Id }, grade);
    }
    [HttpDelete("{id}")]
public async Task<IActionResult> DeleteGrade(int id)
{
    var grade = await _context.Grades.FindAsync(id);

    if (grade == null)
    {
        return NotFound();
    }

    _context.Grades.Remove(grade);

    await _context.SaveChangesAsync();

    return NoContent();
}
[HttpPut("{id}")]
public async Task<IActionResult> UpdateGrade(int id, Grade updatedGrade)
{
    if (id != updatedGrade.Id)
    {
        return BadRequest();
    }

    var grade = await _context.Grades.FindAsync(id);

    if (grade == null)
    {
        return NotFound();
    }

    grade.StudentId = updatedGrade.StudentId;
    grade.CourseId = updatedGrade.CourseId;
    grade.Value = updatedGrade.Value;
    grade.Status = updatedGrade.Status;

    await _context.SaveChangesAsync();

    return NoContent();
}
}