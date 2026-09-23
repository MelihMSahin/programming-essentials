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

        private static readonly List<Student> students = new();

        static StudentsController()
        {
            students.Add(new Student(GenerateUniqueId(), "Example Student", 50));
            students.Add(new Student(GenerateUniqueId(), "Alice", 85));
            students.Add(new Student(GenerateUniqueId(), "Bob", 72));
            students.Add(new Student(GenerateUniqueId(), "Cali", 91));
        }

        private static string GenerateUniqueId()
        {
            string id;

            do
            {
                id = random.Next(1, 100).ToString(); 
            }
            while (students.Any(s => s.Id == id));

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
        public ActionResult<Student> Create(StudentDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var student = new Student(GenerateUniqueId(), request.Name, request.Score);

            students.Add(student);

            return CreatedAtAction(
                nameof(GetById),
                new { id = student.Id },
                student);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, StudentDto updated)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var student = students.FirstOrDefault(s => s.Id == id);

            if (student == null)
                return NotFound();

            student.Name = updated.Name;
            student.Score = updated.Score;

            return NoContent();
        }

        [HttpPatch("{id}/score")]
        public IActionResult UpdateScore(string id, UpdateScoreRequest request)
        {
            var student = students.FirstOrDefault(s => s.Id == id);

            if (student == null)
                return NotFound();

            student.Score = request.Score;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var student = students.FirstOrDefault(s => s.Id == id);

            if (student == null)
                return NotFound();

            students.Remove(student);

            return NoContent();
        }
    }
}