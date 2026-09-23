using System.ComponentModel.DataAnnotations;

public class CourseDto
{
    [Required]
    public string Name { get; set; } = string.Empty;
}