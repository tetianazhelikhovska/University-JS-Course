// ============================
// Завдання 1.2.3 – 1.2.4
// Створення об'єктів car1 та car2
// ============================

// Об'єкт car1 через new Object()
let car1 = new Object();
car1.color = "blue";
car1.maxSpeed = 100;
car1.driver = {
    name: "Tania Luc",
    category: "A",
    personalLimitations: null
};
car1.tuning = true;
car1["number of accidents"] = 0;

// Об'єкт car2 через літерал об'єкта
let car2 = {
    color: "yellow",
    maxSpeed: 90,
    driver: {
        name: "John Lon",
        category: "B",
        personalLimitations: "No driving at night"
    },
    tuning: false,
    "number of accidents": 2
};

// ============================
// Завдання 1.2.5 – 1.2.6
// Додавання методу drive до car1 та car2
// ============================

car1.drive = function() {
  console.log("I can drive anytime");
};

car2.drive = function() {
  console.log("I am not driving at night");
};

// Демонстрація роботи методів
console.log("--- car1 drive ---");
car1.drive();
console.log("--- car2 drive ---");
car2.drive();

// ============================
// Завдання 1.2.7 – 1.2.10
// Створення конструктора Truck
// ============================

function Truck(color, weight, avgSpeed, brand, model) { //створює обєкт вантажівку
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model; 

    this.trip = function() {
      if (!this.driver) {
          console.log("No driver assigned for the trip."); //перевірка чи призначений водій
      } else {
          let nightDrive = this.driver.nightDriving ? "drives at night" : "does not drive at night";
          console.log(`Driver ${this.driver.name} ${nightDrive} and has ${this.driver.experience} years of experience.`);
      } //якшо водій є то перевіряє чи їздить він вночі і виводиться
  };
}

// Додавання методу AssignDriver через prototype
Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    }; //створює обєкт driver де ame, nightDriving, experience -присвоює ці знначення
};

// Створення двох об'єктів класу Truck з іншими значеннями
let truck1 = new Truck("blue", 7000, 95.5, "Mercedes", "Actros"); //2 обєкти класу Truck
let truck2 = new Truck("red", 6500, 80.0, "MAN", "TGX");

// Призначення водіїв з новими значеннями
truck1.AssignDriver("Alex Brown", true, 7);
truck2.AssignDriver("Eva Green", false, 4);

// Демонстрація роботи методу trip
console.log("--- truck1 trip ---");
truck1.trip();
console.log("--- truck2 trip ---");
truck2.trip();

// ============================
// Завдання 1.2.12 – 1.2.24
// Робота з класами ES6
// ============================

class Square { 
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Square: four equal sides and four right angles.");
    }

    length() { //сума довжин сторін
        console.log(`Perimeter: ${this.a * 4}`);
    }

    square() { //площа
        console.log(`Area: ${this.a ** 2}`);
    }

    info() { 
        console.log(`Sides: ${this.a}, ${this.a}, ${this.a}, ${this.a}`); //довжини сторін
        console.log("Angles: 90, 90, 90, 90"); //величини кутів
        this.length(); //сума довжин сторін
        this.square(); //площа
    }
}

class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Rectangle: opposite sides are equal, four right angles.");
    }

    length() {
        console.log(`Perimeter: ${2 * (this.a + this.b)}`);
    }

    square() {
        console.log(`Area: ${this.a * this.b}`);
    }

    info() {
        console.log(`Sides: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log("Angles: 90, 90, 90, 90");
        this.length();
        this.square();
    }
}

class Rhombus extends Square {
  constructor(a, alpha, beta) {
      super(a); //сторона ромба
      this._alpha = alpha; // тупий кут ромба
      this._beta = beta; //гострий кут
  }

  static help() {
      console.log("Rhombus: four equal sides, opposite angles are equal.");
  }

  get alpha() {
      return this._alpha; // геттер для кута alpha
  }

  set alpha(value) {
      if (value > 0 && value < 180) {
          this._alpha = value; // сеттер для кута alpha з перевіркою
      } else {
          console.log("Alpha angle must be between 0 and 180 degrees.");
      }
  }

  get beta() {
      return this._beta; // геттер для кута beta
  }

  set beta(value) {
      if (value > 0 && value < 180) {
          this._beta = value; // сеттер для кута beta з перевіркою
      } else {
          console.log("Beta angle must be between 0 and 180 degrees.");
      }
  }

  square() {
      let radAlpha = (this._alpha * Math.PI) / 180;
      console.log(`Area: ${this.a ** 2 * Math.sin(radAlpha)}`);
  }

  info() {
      console.log(`Sides: ${this.a}, ${this.a}, ${this.a}, ${this.a}`);
      console.log(`Angles: ${this._alpha}, ${this._beta}, ${this._alpha}, ${this._beta}`);
      this.length();
      this.square();
  }
}


class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b); //a b довжина і ширина
        this.alpha = alpha; //тупий кут
        this.beta = beta; //гострий кут
    }

    static help() {
        console.log("Parallelogram: opposite sides are equal, opposite angles are equal.");
    }

    square() {
        let radAlpha = (this.alpha * Math.PI) / 180;
        console.log(`Area: ${this.a * this.b * Math.sin(radAlpha)}`);
    }

    info() {
        console.log(`Sides: ${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log(`Angles: ${this.alpha}, ${this.beta}, ${this.alpha}, ${this.beta}`);
        this.length();
        this.square();
    }
}

// Виведення довідок для кожного класу
console.log("--- Square Help ---");
Square.help();
console.log("--- Rectangle Help ---");
Rectangle.help();
console.log("--- Rhombus Help ---");
Rhombus.help();
console.log("--- Parallelogram Help ---");
Parallelogram.help();

// Створення об'єктів
let square = new Square(4);
let rectangle = new Rectangle(4, 6);
let rhombus = new Rhombus(5, 120, 60);
let parallelogram = new Parallelogram(6, 8, 110, 70);

// Виведення інформації
console.log("--- Square Info ---");
square.info();
console.log("--- Rectangle Info ---");
rectangle.info();
console.log("--- Rhombus Info ---");
rhombus.info();
console.log("--- Parallelogram Info ---");
parallelogram.info();

// ============================
// Завдання 1.2.25 – 1.2.31
// Функції вищого порядку
// ============================

function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c }; //сторони
}

let triangle1 = Triangular();
let triangle2 = Triangular(5, 12, 13);
let triangle3 = Triangular(7, 24, 25);

// Створення масиву трикутників для обробки
let triangles = [triangle1, triangle2, triangle3];

triangles.forEach(triangle => {
  console.log(`a: ${triangle.a}, b: ${triangle.b}, c: ${triangle.c}`);
});

console.log(triangle1, triangle2, triangle3);

function PiMultiplier(num) {
    return function() {
        return Math.PI * num; //множення пі на число
    };
}

let piDouble = PiMultiplier(2);
let piSquare = PiMultiplier(2/3);
let piHalf = PiMultiplier(0.5);

console.log("--- PiMultiplier Results ---");
console.log(piDouble());
console.log(piSquare());
console.log(piHalf());

function Painter(color) {
    return function(obj) {
        if (obj.type) {
            console.log(`${color} ${obj.type}`); //виводить колір і і вміст властивостей type обєкта
        } else {
            console.log("No 'type' property occurred!");
        }
    };
}

let PaintBlue = Painter("Blue");
let PaintRed = Painter("Red");
let PaintYellow = Painter("Yellow");

let obj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
let obj2 = { type: "Truck", avgSpeed: 90, loadCapacity: 2400 };
let obj3 = { maxSpeed: 180, color: "purple", isCar: true };

console.log("--- Painter Results ---");
PaintBlue(obj1);
PaintRed(obj2);
PaintYellow(obj3);
