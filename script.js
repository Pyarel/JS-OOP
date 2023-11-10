'use strict';

const Person = function (firstName, birthYear) {
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never do this
  //If we have a thousand objects, those thousand objects will carry the object method
  this.calcAge = function () {
    console.log(2037 - this.birthYear);
  };
};
const jonas = new Person('Jonas', 1991);
console.log(jonas);
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically returns {}

const pyarel = new Person('Pyarel', 1998);
console.log(pyarel);

//Objects are instance of constructor fn
console.log(pyarel instanceof Person);

//Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

console.log(Person.prototype);

console.log(pyarel.calcAge());

//every object has a proto property
console.log(pyarel.__proto__);

//Check if pyarel is of the protope of Person
console.log(pyarel.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(pyarel));

// Step 3 : {} linked to prototype
// It sets the proto property on object to the prototype of the constructor function

Person.prototype.species = 'Homo Sapiens';
console.log(pyarel.species);
console.log(pyarel); // Property is not inside of pyarel object
//It has access to species property because it is accessible on the prototype

//We can check this using..
console.log(pyarel.hasOwnProperty('firstName')); //true
console.log(pyarel.hasOwnProperty('species')); // false

//Prototypal Inheritance and the prototype chain
/**
 * Constructor function has a property called Prototype which is an object.
 * Person.prototype also has a refernece back to the Person which is the constructor function
 * Person.prototype is NOT a prototype of Person, but all the objects created by Person
 * When we call a object with new operator first thing that happens is an empty object is created
 * this keyword in constructor function call is set to the new object
 * the new object is linked (__proto__ property) to the constructor function's prototype property
 * the new object is returned from the constructor function call
 * If a method is not present in the constructor function, it looks up to the prototype . This is called Prototype chain
 * If we have a thousand object and they do not have to carry the object method from constructor fn, they can simply look up to the prototype
 *
 *
 */

/**
 * PROTOTYPE CHAIN
 * Series of links between objects linked through prototypes
 * (Similar to the scope chain)
 * For eg : jonas.hasOwnProperty('name'); //this is a property not found in jonas object or Person.prototype. But it is present in Object.prototype
 */
/**
 * LECTURE: Prototypal inheritance on Built-In objects
 */
//Check the top of prototype chain
console.log(jonas.__proto__.__proto__); //Object.prototype
console.log(jonas.__proto__.__proto__.__proto__); //null

//Constructor fn of the prototype
console.dir(Person.prototype.constructor);

// Array prototype
const arr = [3, 6, 4, 5, 6, 9, 3]; // new Array === []
console.log(arr.__proto__ === Array.prototype);

//Top of prototype chain
console.log(arr.__proto__.__proto__);

//Create a method on prototype and use it
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1); // Check the prototype
// HTMLHeadingElement --> HTMLElement --> Element --> Node --> Object

console.dir(x => x + 1); // Function is a object and its prototype has methods such as call, apply and bind. That is how
// we are able to call methods on functions

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelarate = function () {
  this.speed += 10;
  console.log(`${this.make} speed increased to ${this.speed} km/hr`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} speed decreased to ${this.speed} km/hr`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelarate();
mercedes.brake();

/**
 * LECTURE: ES6 CLASSES
 */
//class expression
const PersonCl1 = class {};

//class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    (this.firstName = firstName), (this.birthYear = birthYear);
  }
  //Methods will be added to the prototype property of PersonCl class
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}!`);
  }
}
const jessica = new PersonCl('Jessica', 1995);
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);
console.log(PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}!`);
// };

jessica.greet();

/**
 * 1. Classes are not hoisted
 * 2. Classes are first class citizen (Pass them to fn's and return them from fn's)
 * 3. Classes are exectued in strict mode
 */

////////////////////////////////////////////////////////////
/**
 * LECTURE: Setters and Getters
 */
const account = {
  owner: 'Jonas',
  movements: [200, 530, 345, 545, 223],

  get latest() {
    //Slice returns an array with just the last element
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest); //returns 300
account.latest = 50;
console.log(account.movements);

//EXAMPLE 2

class PersonCl2 {
  constructor(fullName, birthYear) {
    (this.fullName = fullName), (this.birthYear = birthYear);
  }
  //Methods will be added to the prototype property of PersonCl class
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}!`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    // else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }
}

const mike = new PersonCl2('Mike Ross', 1993);
console.log(mike.age); // Getters can be accessed as a property
console.log(mike);

const michelle = new PersonCl2('Michelle', 1993);
console.log(mike.age);
console.log(michelle);

/**
 * LECTURE: STATIC METHODS
 */
//Array.from() which converts any object to array

console.log(Array.from(document.querySelectorAll('h1'))); //[h1]
// console.log([1, 2, 3].from()); // TypeError: [1,2,3].from() is not a function

//Because Array.from() is attached to the constructor and not the prototype
//For eg
Person.hey = function () {
  console.log('Hey There👋');
  console.log(this); //refers to the constructor fn as that is calling the method
};
Person.hey();
//but
// jonas.hey(); results in an error as the function is not available on the prototype but on the constructor

//To create a static method
class PersonCl3 {
  constructor(fullName, birthYear) {
    (this.fullName = fullName), (this.birthYear = birthYear);
  }
  //Instance methods - accessible on object prototype
  //Methods will be added to the prototype property of PersonCl class
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}!`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    // else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }
  //Static method
  static hey() {
    console.log('Hey There👋');
    console.log(this);
  }
}
PersonCl3.hey();

const mishal = new PersonCl3('Mishal', 1993);

/**
 * LECTURE: object.create
 */
//Easier way rather than constructor fn
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    (this.firstName = firstName), (this.birthYear = birthYear);
  },
};

//steven is an empty object which is linked to PersonProto
const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 1994;
steven.calcAge();

console.log(steven.__proto__ == PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
class Car1 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelarate() {
    this.speed += 10;
    console.log(`${this.make} speed increased to ${this.speed} km/hr`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} speed decreased to ${this.speed} km/hr`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const bmw1 = new Car1('BMW', 120);
const mercedes1 = new Car1('Mercedes', 95);

console.log(bmw1.speedUS);
bmw1.accelarate();
console.log(bmw1.speedUS);
bmw1.speedUS = 100;
console.log(bmw1.speedUS);
mercedes1.brake();

/**
 * Inheritance between "Classes" : Constructor functions
 */

const Person4 = function (firstName, birthYear) {
  (this.firstName = firstName), (this.birthYear = birthYear);
};
Person4.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
const Student = function (firstName, birthYear, course) {
  //Eliminate the duplicate code
  //   (this.firstName = firstName),
  //   (this.birthYear = birthYear),
  // Person4(firstName, birthYear) // This results in a error as it is regular fn call. And in regular fn call this keyword is undefined
  Person4.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mikeal = new Student('Mikeal', 2020, 'Computer Science');
console.log(mikeal);
mikeal.introduce();

// Now we have to make the student class extend Person 4 class
Student.prototype = Object.create(Person4.prototype);

//We cannot do this, Because this stmt says that student.prototype should be same as Person4.prototype. We don't want that!
// Student.prototype = Person4.prototype;

const percy = new Student('Percy', 2000, 'Law');
percy.calcAge();

console.log(mikeal.__proto__);

console.log(mikeal instanceof Student); //true
console.log(mikeal instanceof Person); // true

//FIX
Student.prototype.constructor = Student;

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
const Car2 = function (make, currentSpeed) {
  (this.make = make), (this.currentSpeed = currentSpeed);
};
const ElectricCar = function (make, currentSpeed, charge) {
  Car2.call(this, make, currentSpeed);
  this.charge = charge;
};

Car2.prototype.brake = function () {
  this.currentSpeed -= 5;
  console.log(`${this.make} going at ${this.currentSpeed} km/h`);
};

Car2.prototype.accelarate = function () {
  this.currentSpeed += 20;
  console.log(`${this.make} going at ${this.currentSpeed} km/h`);
};

//Link the prototype
ElectricCar.prototype = Object.create(Car2.prototype);

ElectricCar.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

//Overwrite the accelerate method of the Car2 class
ElectricCar.prototype.accelarate = function () {
  this.currentSpeed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.currentSpeed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new ElectricCar('Tesla', 100, 56);
tesla.accelarate();
tesla.brake();
tesla.chargeBattery(97);

/**
 * Inheritance between "Classes" :  ES6 classes
 */

class PersonCll {
  constructor(fullName, birthYear) {
    (this.fullName = fullName), (this.birthYear = birthYear);
  }
  //Methods will be added to the prototype property of PersonCl class
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}!`);
  }
}

class Student1 extends PersonCll {
  constructor(fullName, birthYear, course) {
    //Always need to happen first
    super(fullName, birthYear); //we won't be able to access this keyword without this
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

// const martha = new Student1('Matha Jones', 2012); // This still works
const martha = new Student1('Matha Jones', 2012, 'Computer Science');
console.log(martha);
martha.introduce();
martha.calcAge();
martha.greet();

/**
 * Inheritance between "Classes" :  Object.create
 */
const PersonProto1 = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    (this.firstName = firstName), (this.birthYear = birthYear);
  },
};

//steven is an empty object which is linked to PersonProto
const steven1 = Object.create(PersonProto1);

//Inheritance = jay--inherits from-->StudentProto--inherits from-->PersonProto1
const StudentProto = Object.create(PersonProto1);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto1.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

/**
 * LECTURE: Another class example + Encapsulation: Protected properties and methods
 * + Private class fields + methods
 */

//1) Public fields
//2) Private fields
//3) Public methods
//4) Public methods

//there is also a static version
//Static method are available on instances, only on classes
class Account {
  //Public fields(instances)
  locale = navigator.language;

  //Private fields
  #movements = [];
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin; // Private property
    // this._pin = pin;//Protected property
    // this._movements = []; //Protected property

    console.log(`Thanks for opening an account, ${owner}`);
  }

  //Public interface
  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val); //We can call other methods inside a method
    return this;
  }

  getMovements() {
    return this.#movements;
  }

  //Protected method
  //   _approveLoan(val) {
  //     return true;
  //   }
  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan Approved!!');
    }
    return this;
  }

  //Private Method
  #approveLoan(val) {
    return true;
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);

//Not good practice
// acc1.movements.push(200);
// acc1.movements.push(-20);
// console.log(acc1);

acc1.deposit(200);
acc1.withdraw(20);
console.log(acc1);

acc1.requestLoan(1000);

//Accessing protected property
// console.log(acc1._movements); // works but BAD practice!

//Accessing protected method
// acc1._approveLoan(); //true, works but BAD practice!

//Accessing private property
// console.log(acc1.#movements); // SyntaxError
// console.log(acc1.#pin);// SyntaxError

///////////////////////////////////////////////////////////////
/**
 * LECTURE: Chaining methods
 */
acc1.deposit(500).deposit(300).withdraw(35).requestLoan(2000).withdraw(40);
console.log(acc1.getMovements());

///////////////////////////////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
class Car4 {
  constructor(make, currentSpeed) {
    this.make = make;
    this.currentSpeed = currentSpeed;
  }
  accelarate() {
    this.speed += 10;
    console.log(`${this.make} speed increased to ${this.currentSpeed} km/hr`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} speed decreased to ${this.currentSpeed} km/hr`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class ElectricCar1 extends Car4 {
  //Private fields
  #charge;
  constructor(make, currentSpeed, charge) {
    super(make, currentSpeed);
    this.#charge = charge;
  }
  //Public methods
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`${this.make} charged to ${this.#charge}`);
    return this;
  }
  accelarate() {
    this.currentSpeed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.currentSpeed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const tesla1 = new ElectricCar1('Tesla', 150, 33);
tesla1.accelarate().chargeBattery(100).brake.call(tesla1);
