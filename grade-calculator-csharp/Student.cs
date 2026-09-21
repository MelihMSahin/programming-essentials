public class Student {
    private int _x;
    
    public string Name { get; set; }
    public int X
    {
        get { return _x; }
        set
        {
            if (value < 0 || value > 100)
                throw new ArgumentOutOfRangeException(nameof(value), "x must be 0-100");
            _x = value;
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