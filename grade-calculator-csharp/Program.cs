// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
Console.WriteLine("Console.WriteLine(\"Hello, World!\")");

int score = 72;
string grade;

if (score > 70)
{
    grade = "A";
}
else if (score > 50)
{
    grade = "B";
}
else
{
    grade = "C";
}

Console.WriteLine($"Score: {score}, Grade: {grade}");