List<Student> students = [new Student("M",100), new Student("D", 60), new Student("F", 30)];

foreach (Student student in students)
{
    Console.WriteLine($"Name: {student.Name}, Grade: {student.GetGrade()}");
}

List<Student> aStudents = students.Where(s => s.GetGrade() == "A" || s.GetGrade() == "B").ToList();
List<string> aStudentNames = aStudents.Select(s => s.Name).ToList();
Console.WriteLine($"Students who passed: {string.Join(", ", aStudentNames)}");

string nameInput = Console.ReadLine();
string scoreInput = Console.ReadLine();
if (int.TryParse(scoreInput, out int score))
{
    Student newStudent = new Student(nameInput, Convert.ToInt32(scoreInput));
    Console.WriteLine($"Name: {newStudent.Name}, Grade: {newStudent.GetGrade()}");
}
else
{
    Console.WriteLine("Score Invalid");
}
