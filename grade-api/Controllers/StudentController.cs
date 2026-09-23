using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

public class Student
{
    public string Id { get; private set; }
    public string Name { get; set; } = string.Empty;
    public int Score { get; set; }
    public bool IsFav { get; set; }
    public string? CourseId { get; set; }

    [JsonIgnore]
    public Course? Course { get; set; }
    public string? CourseName => Course?.Name;

    public Student(string id, string name, int score, string? courseId = null)
    {
        Id = id;
        Name = name;
        Score = score;
        CourseId = courseId;
    }
}

public class UpdateScoreRequest
{
    public int Score { get; set; }
}

public class UpdateFavoriteRequest
{
    public bool IsFav { get; set; }
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
        public async Task<ActionResult<List<Student>>> GetAll(
            [FromQuery] string? courseId,
            [FromQuery] string? search,
            [FromQuery] int? minScore,
            [FromQuery] int? maxScore,
            [FromQuery] string? sortBy,
            [FromQuery] string? sortDirection)
        {
            var query = _context.Students
                .Include(student => student.Course)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(courseId))
                query = query.Where(student => student.CourseId == courseId);

            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(student => student.Name.Contains(search));

            if (minScore.HasValue)
                query = query.Where(student => student.Score >= minScore.Value);

            if (maxScore.HasValue)
                query = query.Where(student => student.Score <= maxScore.Value);

            var descending = string.Equals(sortDirection, "desc", StringComparison.OrdinalIgnoreCase);
            query = sortBy?.ToLowerInvariant() switch
            {
                "course" => descending
                    ? query.OrderByDescending(student => student.Course!.Name)
                    : query.OrderBy(student => student.Course!.Name),
                "score" => descending
                    ? query.OrderByDescending(student => student.Score)
                    : query.OrderBy(student => student.Score),
                "name" => descending
                    ? query.OrderByDescending(student => student.Name)
                    : query.OrderBy(student => student.Name),
                _ => query.OrderBy(student => student.Name)
            };

            var students = await query.ToListAsync();
            return Ok(students);
        }

         
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetById(string id)
        {
            var student = await _context.Students
                .Include(item => item.Course)
                .FirstOrDefaultAsync(item => item.Id == id);
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

            var student = new Student(await GenerateUniqueId(), request.Name, request.Score, request.CourseId);
            
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
            student.CourseId = updated.CourseId;
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

        [HttpPatch("{id}/favorite")]
        public async Task<IActionResult> UpdateFavorite(string id, UpdateFavoriteRequest request)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
                return NotFound();

            student.IsFav = request.IsFav;
            await _context.SaveChangesAsync();

            return Ok(student);
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