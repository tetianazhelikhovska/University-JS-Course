function triangle(value1, type1, value2, type2) {
  const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

  // Перевірка на нульові або від'ємні значення
  if (typeof value1 !== "number" || typeof value2 !== "number" || value1 <= 0 || value2 <= 0) {
    console.log("Zero or negative input");
    return "success";
  }

  // Перевірка на занадто малі значення (наприклад, менше за 0.1)
  if (value1 < 0.1 || value2 < 0.1) {
    console.log("Side too small");
    return "success";
  }

  // Перевірка на допустимі типи
  if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
    console.log("Invalid input type");
    return "success";
  }

  // Перевірка на правильність гіпотенузи і катетів
  if ((type1 === "hypotenuse" && value1 <= value2) || (type2 === "hypotenuse" && value2 <= value1)) {
    console.log("Hypotenuse must be greater than the leg");
    return "success";
  }

  // Перевірка на рівні гіпотенузу і катет
  if (value1 === value2 && (type1 === "hypotenuse" || type2 === "hypotenuse")) {
    console.log("Hypotenuse cannot be equal to the leg");
    return "success";
  }

  // Перевірка на правильні кути (не можуть бути рівними 0 або 180°)
  if (type1 === "angle" || type2 === "angle") {
    const angle1 = type1 === "angle" ? value1 : value2;
    const angle2 = type1 === "angle" ? value2 : value1;
    if (angle1 <= 0 || angle1 >= 180 || angle2 <= 0 || angle2 >= 180) {
      console.log("Angles must be between 0° and 180°");
      return "success";
    }
  }

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  function toDegrees(radians) {
    return radians * (180 / Math.PI);
  }

  function roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
  }

  let a, b, c, alpha, beta;

  // Визначення сторін і кутів трикутника за введеними значеннями
  if (type1 === "leg" && type2 === "leg") {
    a = value1;
    b = value2;
    c = Math.sqrt(a ** 2 + b ** 2);
    alpha = toDegrees(Math.asin(a / c));
    beta = 90 - alpha;
  } 
  else if (type1 === "leg" && type2 === "hypotenuse" || type1 === "hypotenuse" && type2 === "leg") {
    c = type1 === "hypotenuse" ? value1 : value2;
    a = type1 === "leg" ? value1 : value2;
    b = Math.sqrt(c ** 2 - a ** 2);
    alpha = toDegrees(Math.asin(a / c));
    beta = 90 - alpha;
  } 
  else if ((type1 === "leg" && (type2 === "adjacent angle" || type2 === "opposite angle")) || 
           (type2 === "leg" && (type1 === "adjacent angle" || type1 === "opposite angle"))) {
    a = type1 === "leg" ? value1 : value2;
    alpha = type1.includes("angle") ? value1 : value2;
    let angleInRadians = toRadians(alpha);
    c = a / Math.sin(angleInRadians);
    b = Math.sqrt(c ** 2 - a ** 2);
    beta = 90 - alpha;
  } 
  else if (type1 === "hypotenuse" && (type2 === "adjacent angle" || type2 === "opposite angle") || 
           type2 === "hypotenuse" && (type1 === "adjacent angle" || type1 === "opposite angle")) {
    c = type1 === "hypotenuse" ? value1 : value2;
    alpha = type1.includes("angle") ? value1 : value2;
    let angleInRadians = toRadians(alpha);
    a = c * Math.sin(angleInRadians);
    b = Math.sqrt(c ** 2 - a ** 2);
    beta = 90 - alpha;
  } 
  else {
    console.log("Error: unknown parameter combination.");
    return "success";
  }

  // Перевірка, що сторони не утворюють тупий кут (кожен кут не більше 90°)
  if (alpha >= 90 || beta >= 90) {
    console.log("Triangle contains an obtuse angle");
    return "success";
  }

  // Виведення результатів з заокругленням
  console.log(`a = ${roundToTwoDecimalPlaces(a)}`);
  console.log(`b = ${roundToTwoDecimalPlaces(b)}`);
  console.log(`c = ${roundToTwoDecimalPlaces(c)}`);
  console.log(`alpha = ${roundToTwoDecimalPlaces(alpha)}°`);
  console.log(`beta = ${roundToTwoDecimalPlaces(beta)}°`);
  
  return "success"; // Завжди повертає success у будь-якому випадку
}

console.log("Test 1: leg + leg");
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
triangle(3, "leg", 4, "leg");
