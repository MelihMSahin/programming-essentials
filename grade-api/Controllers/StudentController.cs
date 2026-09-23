using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class Student
{
    public string Id { get; private set; }
    public string Name { get; set; } = string.Empty;
    public int Score { get; set; }

    public Student(string id, string name, int score)
    {
        Id = id;
        Name = name;
        Score = score;
    }
}

public class UpdateScoreRequest
{
    public int Score { get; set; }
}

namespace StudentApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly ILogger<StudentsController> _logger;
        private readonly AppDbContext _context;

        public StudentsController(ILogger<StudentsController> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        private static readonly Random random = new();

        private async Task<string> GenerateUniqueId()
        {
            string id;

            do
            {
                id = random.Next(1, 100).ToString(); 
            }
            while (await _context.Students.FindAsync(id) != null);

            return id;
        }

        [HttpGet]
        public async Task<ActionResult<List<Student>>> GetAll()
        {
            var students = await _context.Students.ToListAsync();
            return Ok(students);
        }

         
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetById(string id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null) return NotFound();
            return Ok(student);
        }
 

        [HttpPost]
        public async Task<ActionResult<Student>> Create(StudentDto request)
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var student = new Student(await GenerateUniqueId(), request.Name, request.Score);
            
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetById),
                new { id = student.Id },
                student);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, StudentDto updated)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var student = await _context.Students.FindAsync(id);

            if (student == null)
                return NotFound();

            student.Name = updated.Name;
            student.Score = updated.Score;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("{id}/score")]
        public async Task<IActionResult> UpdateScore(string id, UpdateScoreRequest request)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
                return NotFound();

            student.Score = request.Score;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
                return NotFound();

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}