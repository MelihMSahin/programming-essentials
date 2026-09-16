// Source - https://stackoverflow.com/a/53859978
// Posted by Curt, modified by community. See post 'Timeline' for change history
// Retrieved 2026-09-14, License - CC BY-SA 4.0
arrLength = 200;
let randScores = [...Array(arrLength)].map(e=>~~(Math.random()*100));

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

let grades = [Array(arrLength)]
for (let index = 0; index < arrLength; index++) {
    grades[index] = getGrade(randScores[index])
}
console.log(grades)

function sum(array) {
    let total = 0;
    array.forEach(element => { total += element; });
    return total;
}
console.log(sum(randScores)/arrLength);

