public class Student {
    public string Name { get; set; }
    public int Score { get; set; }

    public Student(string name, int score)
    {
        Name = name;
        Score = score;
    }

    public string GetGrade()
    {
        if (Score > 70)
        {
            return "A";
        }
        if (Score > 50)
        {
            return "B";
        }

        return "C";
    }
}