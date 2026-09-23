using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace StudentApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly AppDbContext context;

    public CoursesController(AppDbContext context)
    {
        this.context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Course>>> GetAll()
    {
        return Ok(await context.Courses.OrderBy(course => course.Name).ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Course>> GetById(string id)
    {
        var course = await context.Courses.FindAsync(id);
        return course == null ? NotFound() : Ok(course);
    }

    [HttpPost]
    public async Task<ActionResult<Course>> Create(CourseDto request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var course = new Course(Guid.NewGuid().ToString("N"), request.Name.Trim());
        context.Courses.Add(course);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = course.Id }, course);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, CourseDto request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var course = await context.Courses.FindAsync(id);
        if (course == null)
            return NotFound();

        course.Name = request.Name.Trim();
        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var course = await context.Courses.FindAsync(id);
        if (course == null)
            return NotFound();

        context.Courses.Remove(course);
        await context.SaveChangesAsync();
        return NoContent();
    }
}