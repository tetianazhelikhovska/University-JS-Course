function triangle(value1, type1, value2, type2) {
  const toRadians = (deg) => deg * (Math.PI / 180);
  const toDegrees = (rad) => rad * (180 / Math.PI);

  const MIN_VALUE = 1e-4;
  const MAX_VALUE = 1e4;

  // Перевірка на додатні значення
  if (value1 <= 0 || value2 <= 0) return "Значення мають бути додатними";
  // Перевірка на допустимий діапазон значень
  if (value1 < MIN_VALUE || value1 > MAX_VALUE || value2 < MIN_VALUE || value2 > MAX_VALUE) {
    return "Значення виходять за допустимий діапазон";
  }

  let a, b, c, alpha, beta;

  // Катет і гіпотенуза
  if ((type1 === "leg" && type2 === "hypotenuse") || (type1 === "hypotenuse" && type2 === "leg")) {
    a = type1 === "leg" ? value1 : value2;
    c = type1 === "hypotenuse" ? value1 : value2;

    if (a >= c) return "Катет не може бути більшим або дорівнювати гіпотенузі";
    
    b = Math.sqrt(c * c - a * a);
    alpha = toDegrees(Math.asin(a / c));
    beta = 90 - alpha;
  } 
  // Два катети
  else if (type1 === "leg" && type2 === "leg") {
    a = value1;
    b = value2;
    c = Math.sqrt(a * a + b * b);
    alpha = toDegrees(Math.atan(a / b));
    beta = 90 - alpha;
  } 
  // Катет і прилеглий кут
  else if ((type1 === "leg" && type2 === "adjacent angle") || (type1 === "adjacent angle" && type2 === "leg")) {
    alpha = type1 === "adjacent angle" ? value1 : value2;
    a = type1 === "leg" ? value1 : value2;

    if (alpha <= 0 || alpha >= 90) return "Неправильне значення кута";

    c = a / Math.cos(toRadians(alpha));
    b = Math.sqrt(c * c - a * a);
    beta = 90 - alpha;
  }
  // Катет і протилежний кут
  else if ((type1 === "leg" && type2 === "opposite angle") || (type1 === "opposite angle" && type2 === "leg")) {
    alpha = type1 === "opposite angle" ? value1 : value2;
    a = type1 === "leg" ? value1 : value2;

    if (alpha <= 0 || alpha >= 90) return "Неправильне значення кута";

    c = a / Math.sin(toRadians(alpha));
    b = Math.sqrt(c * c - a * a);
    beta = 90 - alpha;
  }
  // Гіпотенуза і кут
  else if ((type1 === "hypotenuse" && type2 === "angle") || (type1 === "angle" && type2 === "hypotenuse")) {
    c = type1 === "hypotenuse" ? value1 : value2;
    alpha = type1 === "angle" ? value1 : value2;

    if (alpha <= 0 || alpha >= 90) return "Неправильне значення кута";

    a = c * Math.sin(toRadians(alpha));
    b = c * Math.cos(toRadians(alpha));
    beta = 90 - alpha;
  } 
  // Гіпотенуза і протилежний кут
  else if ((type1 === "hypotenuse" && type2 === "opposite angle") || (type1 === "opposite angle" && type2 === "hypotenuse")) {
    c = type1 === "hypotenuse" ? value1 : value2;
    alpha = type1 === "opposite angle" ? value1 : value2;

    if (alpha <= 0 || alpha >= 90) return "Неправильне значення кута";

    a = c * Math.sin(toRadians(alpha));
    b = Math.sqrt(c * c - a * a);
    beta = 90 - alpha;
  } 
  // Гіпотенуза і прилеглий кут - Test 4
  else if ((type1 === "hypotenuse" && type2 === "adjacent angle") || (type1 === "adjacent angle" && type2 === "hypotenuse")) {
    c = type1 === "hypotenuse" ? value1 : value2;
    alpha = type1 === "adjacent angle" ? value1 : value2;

    if (alpha <= 0 || alpha >= 90) return "Неправильне значення кута";

    a = c * Math.sin(toRadians(alpha));  // Обчислення сторони a
    b = c * Math.cos(toRadians(alpha));  // Обчислення сторони b
    beta = 90 - alpha;  // Кут beta

    console.log(`a = ${a.toFixed(2)}, b = ${b.toFixed(2)}, c = ${c.toFixed(2)}`);
    console.log(`alpha = ${alpha.toFixed(2)}°, beta = ${beta.toFixed(2)}°`);
    return "Успіх!";
  }
  else {
    return "Невірні дані. Прочитайте інструкції ще раз.";
  }

  console.log(`a = ${a.toFixed(2)}, b = ${b.toFixed(2)}, c = ${c.toFixed(2)}`);
  console.log(`alpha = ${alpha.toFixed(2)}°, beta = ${beta.toFixed(2)}°`);
  return "Успіх!";
}

// Test cases
console.log("\nTest 1: leg + leg");
triangle(3, "leg", 4, "leg");

console.log("\nTest 2: leg + hypotenuse");
triangle(5, "leg", 13, "hypotenuse");

console.log("\nTest 3: hypotenuse + opposite angle");
triangle(10, "hypotenuse", 30, "opposite angle");

console.log("\nTest 4: hypotenuse + adjacent angle");
triangle(15, "hypotenuse", 40, "adjacent angle");

console.log("\nTest 5: leg + opposite angle");
triangle(7, "leg", 45, "opposite angle");

console.log("\nTest 6: Invalid input type");
triangle(5, "side", 10, "hypotenuse");

console.log("\nTest 7: Zero input");
triangle(0, "leg", 10, "hypotenuse");

console.log("\nTest 8: Negative input");
triangle(-5, "leg", 10, "hypotenuse");

console.log("\nTest 9: Unknown parameter combination");
triangle(10, "angle", 5, "hypotenuse");

console.log("\nTest 10: Impossible triangle (leg > hypotenuse)");
triangle(10, "leg", 5, "hypotenuse");

console.log("\nTest 11: Hypotenuse equal to leg");
triangle(7, "hypotenuse", 7, "leg");

console.log("\nTest 12: Very small sides");
triangle(0.05, "leg", 0.05, "leg");

 console.log("\nTest 13: Obtuse angle");
 triangle(3, "leg", 4, "leg");  // додаємо випадок з тупим кутом


 console.log("\nTest 1: Leg and Hypotenuse");
triangle(5, "leg", 13, "hypotenuse"); // Катет = 5, Гіпотенуза = 13

console.log("\nTest 2: Leg and Adjacent Angle");
triangle(6, "leg", 30, "adjacent angle"); // Катет = 6, Кут α = 30°

console.log("\nTest 3: Leg and Opposite Angle");
triangle(6, "leg", 30, "opposite angle"); // Катет = 6, Кут β = 30°

console.log("\nTest 4: Hypotenuse and Angle");
triangle(10, "hypotenuse", 30, "angle"); // Гіпотенуза = 10, Кут α = 30°

console.log("\nTest 5: Hypotenuse and Opposite Angle");
triangle(10, "hypotenuse", 45, "opposite angle"); // Гіпотенуза = 10, Кут β = 45°

console.log("\nTest 6: Invalid Angle (greater than 90)");
triangle(10, "hypotenuse", 100, "angle"); // Кут більше 90 градусів

console.log("\nTest 7: Invalid Input Type");
triangle(5, "side", 10, "hypotenuse"); // Невірний тип

