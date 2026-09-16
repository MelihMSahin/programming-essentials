let learnerName: string = "Sofia Mensah";
let learnerAge: number = 22;
let isEnrolled: boolean = true;

function buildWelcomeMessage(name: string, age: number): string {
  return "Welcome " + name + ", age " + age;
}

console.log(buildWelcomeMessage(learnerName, learnerAge));