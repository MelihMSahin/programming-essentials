using System.Text.Json.Serialization;

public class Course
{
    public string Id { get; private set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    [JsonIgnore]
    public ICollection<Student> Students { get; set; } = new List<Student>();

    public Course() { }

    public Course(string id, string name)
    {
        Id = id;
        Name = name;
    }
}