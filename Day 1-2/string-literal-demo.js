const name = "Mike";
const sessionNumber = "1";
console.log(`Hi I'm ${name} and this is session ${sessionNumber}`);

let student = {
    name: "Mike",
    score:100,
    attendance:99,
}
console.log(student.name)
console.log(student.score)
console.log(student.attendance)

const fruits = ["apple","banana","orange"];
fruits.forEach(element => {
    console.log(element)
});

function listItems(items) {
    items.forEach(element => {
        console.log(element)
    });
}
listItems(fruits)

