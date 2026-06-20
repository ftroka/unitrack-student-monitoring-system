using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniTrack.Api.Data;
using UniTrack.Api.Models;

namespace UniTrack.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly AppDbContext _context;

    public StudentsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Student>>> GetStudents()
    {
        var students = await _context.Students.ToListAsync();

        return Ok(students);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Student>> GetStudentById(int id)
    {
        var student = await _context.Students.FindAsync(id);

        if (student == null)
        {
            return NotFound();
        }

        return Ok(student);
    }

    [HttpPost]
    public async Task<ActionResult<Student>> CreateStudent(Student student)
    {
        _context.Students.Add(student);

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetStudentById), new { id = student.Id }, student);
    }
    [HttpDelete("{id}")]
public async Task<IActionResult> DeleteStudent(int id)
{
    var student = await _context.Students.FindAsync(id);

    if (student == null)
    {
        return NotFound();
    }

    _context.Students.Remove(student);

    await _context.SaveChangesAsync();

    return NoContent();
}
[HttpPut("{id}")]
public async Task<IActionResult> UpdateStudent(int id, Student updatedStudent)
{
    if (id != updatedStudent.Id)
    {
        return BadRequest();
    }

    var student = await _context.Students.FindAsync(id);

    if (student == null)
    {
        return NotFound();
    }

    student.FullName = updatedStudent.FullName;
    student.Email = updatedStudent.Email;
    student.StudentNumber = updatedStudent.StudentNumber;
    student.Program = updatedStudent.Program;
    student.YearOfStudy = updatedStudent.YearOfStudy;

    await _context.SaveChangesAsync();

    return NoContent();
}
}