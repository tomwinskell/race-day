// constructor function for a runner
let Runner = function(firstName, lastName, age, early) {
  this.name = firstName + " " + lastName;
  this.age = age;
  this.early = early;
}

const responses = {
  under18: "Youth registrants run at 12:30 pm (regardless of registration)",
  lateAdults: "Late adults run at 11:00 am",
  earlyAdults: "Early adults run at 9:30 am"
}

// prototype for a runner to get a race number
Runner.prototype.getRaceNumber = function() {

  // create empty array to store assigned race numbers
  let raceNumbers = [];

  // read race numbers already assigned from local storage
  const stored = readFromLocalStorage("raceNumbers");
  if (stored === undefined || stored.length > 200) {
    saveToLocalStorage("raceNumbers", raceNumbers);
  } else {
    raceNumbers = readFromLocalStorage("raceNumbers");
  }

  // get a unique number
  const n = assignUniqNumber(this.age, this.early, raceNumbers);

  // add the unique number to the array
  raceNumbers.push(n);

  // save the current array of assigned numbers to local storage
  saveToLocalStorage("raceNumbers", raceNumbers);

  // logic for responses
  if (n >= 1000 ) {
    return `${this.name} - Your race number is ${n}. ${responses.earlyAdults}.`
  } else if (this.age < 18) {
    return `${this.name} - Your race number is ${n}. ${responses.under18}.`
  } else {
    return `${this.name} - Your race number is ${n}. ${responses.lateAdults}.`
  }
}

// return uniq number using array of race numbers
function assignUniqNumber(age, early, array) {
  let n = check1000(age, early); // returns number based on age and if early
  if (array.includes(n)) {
    return assignUniqNumber(age, early, array); // calls itself if number already exists in array
  } else {
    return n; // if not found in array number is returned
  }
}

// get number based on age and if early
function check1000(age, early) {
  let n = 0;
  if (age >= 18 && early) {
    n = Math.floor(Math.random() * (1999 - 1000) + 1000);
  } else {
    n = Math.floor(Math.random() * (999 - 1) + 1);
  }
  return n;
}

// write array to local storage
function saveToLocalStorage(arrayName, array) {
  const string = JSON.stringify(array)
  return localStorage.setItem(arrayName, string);
}

// get the array from local storage
function readFromLocalStorage(stringName) {
  const toParse = localStorage.getItem(stringName);
  return JSON.parse(toParse);
}

const early = new Runner("Thomas", "Winskell", 38, true);
const late = new Runner('Abi', 'Winskell', 39, false);
const child = new Runner('Thalia', 'Winskell', 5, true);

console.log(early.getRaceNumber());
console.log(late.getRaceNumber());
console.log(child.getRaceNumber());