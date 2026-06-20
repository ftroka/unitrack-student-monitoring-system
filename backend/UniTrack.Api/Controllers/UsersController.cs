using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UniTrack.Api.Data;
using UniTrack.Api.Models;

namespace UniTrack.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<User>>> GetUsers()
    {
        var users = await _context.Users.ToListAsync();

        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserById(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<User>> CreateUser(User user)
    {
        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
    }
    [HttpDelete("{id}")]
public async Task<IActionResult> DeleteUser(int id)
{
    var user = await _context.Users.FindAsync(id);

    if (user == null)
    {
        return NotFound();
    }

    _context.Users.Remove(user);

    await _context.SaveChangesAsync();

    return NoContent();
}
[HttpPut("{id}")]
public async Task<IActionResult> UpdateUser(int id, User updatedUser)
{
    if (id != updatedUser.Id)
    {
        return BadRequest();
    }

    var user = await _context.Users.FindAsync(id);

    if (user == null)
    {
        return NotFound();
    }

    user.FullName = updatedUser.FullName;
    user.Email = updatedUser.Email;
    user.PasswordHash = updatedUser.PasswordHash;
    user.Role = updatedUser.Role;

    await _context.SaveChangesAsync();

    return NoContent();
}
}