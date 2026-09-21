interface Student {
     name: string;
     age: number;
     cohort: string;
     score: number;
     employer?: string;
   }
 
// Define a "Student" interface and refactor this so learner is strongly
// typed against it. Use IntelliSense (hover over "learner.") to see the
// benefit once the interface is in place.

let learner: Student = {
  name: "Priya Sharma",
  age: 24,
  cohort: "JavaScript Accelerator",
  score: 84,
};

function getGrade(score: number): "A" | "B" | "C" {
  if (score >= 70) return "A";
  else if (score >= 50) return "B";
  else return "C";
}

console.log(`${learner.name}: ${getGrade(learner.score)}`);

let learners: Student[] = [
  {
    name: "Priya Sharma",
    age: 24,
    cohort: "JavaScript Accelerator",
    score: 84,
  },
  {
    name: "Dhruv Deb",
    age: 20,
    cohort: "JavaScript Accelerator",
    score: 1000,
  },
];

learners.forEach(element => {
  console.log(`${element.name}: ${getGrade(element.score)}`);  
});
