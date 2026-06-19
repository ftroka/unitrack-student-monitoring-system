using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniTrack.Api.Data;
using UniTrack.Api.Models;

namespace UniTrack.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssignmentsController : ControllerBase
{
    private readonly AppDbContext _context;

    public AssignmentsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<CourseAssignment>>> GetAssignments()
    {
        var assignments = await _context.Assignments.ToListAsync();

        return Ok(assignments);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CourseAssignment>> GetAssignmentById(int id)
    {
        var assignment = await _context.Assignments.FindAsync(id);

        if (assignment == null)
        {
            return NotFound();
        }

        return Ok(assignment);
    }

    [HttpPost]
    public async Task<ActionResult<CourseAssignment>> CreateAssignment(CourseAssignment assignment)
    {
        _context.Assignments.Add(assignment);

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAssignmentById), new { id = assignment.Id }, assignment);
    }
    [HttpDelete("{id}")]
public async Task<IActionResult> DeleteAssignment(int id)
{
    var assignment = await _context.Assignments.FindAsync(id);

    if (assignment == null)
    {
        return NotFound();
    }

    _context.Assignments.Remove(assignment);

    await _context.SaveChangesAsync();

    return NoContent();
}
}