// Source - https://stackoverflow.com/a/53859978
// Posted by Curt, modified by community. See post 'Timeline' for change history
// Retrieved 2026-09-14, License - CC BY-SA 4.0
const students = [{
    name: "Mike",
    score: 100,}, 
    {
    name: "Nike",
    score: 60, }, 
    {
    name: "Tike",
    score: 40,
}];


function getGrade(score) {
    if (score > 70) {
        return "A"
    }
    else if (score > 50) {
        return "B"
    }
    else {
        return "C"
    }
}

const studentsWithGrades = students.map(student => ({
  ...student,
  grade: getGrade(student.score)
}));
//console.log(JSON.stringify(studentsWithGrades));

const triple = (n) => {
    return n * 3;
}

console.log(triple(2));