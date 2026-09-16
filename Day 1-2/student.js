"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Define a "Student" interface and refactor this so learner is strongly
// typed against it. Use IntelliSense (hover over "learner.") to see the
// benefit once the interface is in place.
let learner = {
    name: "Priya Sharma",
    age: 24,
    cohort: "JavaScript Accelerator",
    score: 84,
};
function getGrade(score) {
    if (score >= 70)
        return "A";
    else if (score >= 50)
        return "B";
    else
        return "C";
}
console.log(`${learner.name}: ${getGrade(learner.score)}`);
let learners = [
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
//# sourceMappingURL=student.js.map