public class Student {
    private int score;
    
    public string Name { get; set; }
    public int Score
    {
        get { return score; }
        set
        {
            if (value < 0 || value > 100)
                throw new ArgumentOutOfRangeException(nameof(value), "score must be 0-100");
            score = value;
        }
    }

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