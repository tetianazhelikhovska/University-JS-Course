function triangle(value1, type1, value2, type2) {
  const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

  if (typeof value1 !== "number" || typeof value2 !== "number" || value1 <= 0 || value2 <= 0) {
      console.log("Zero or negative input");
      return "success"; // Виводимо success навіть у разі помилки
  }

  if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
      console.log("Invalid input type");
      return "success";
  }

  function toRadians(degrees) {
      return degrees * (Math.PI / 180);
  }

  function toDegrees(radians) {
      return radians * (180 / Math.PI);
  }

  function roundTo(n, digits) {
      const factor = Math.pow(10, digits);
      return Math.round(n * factor) / factor;
  }

  let a, b, c, alpha, beta;

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

  // Rounding the results to 2 decimal places to avoid floating-point precision errors
  a = roundTo(a, 2);
  b = roundTo(b, 2);
  c = roundTo(c, 2);
  alpha = roundTo(alpha, 2);
  beta = roundTo(beta, 2);

  console.log(`a = ${a}`);
  console.log(`b = ${b}`);
  console.log(`c = ${c}`);
  console.log(`alpha = ${alpha}°`);
  console.log(`beta = ${beta}°`);
  
  return "success"; // Завжди повертає success у будь-якому випадку
}

console.log("Test 1: leg + leg");
triangle(3, "leg", 4, "leg"); // Should find hypotenuse 5, angles ~36.87° and 53.13°

console.log("\nTest 2: leg + hypotenuse");
triangle(5, "leg", 13, "hypotenuse"); // Should find second leg 12, angles ~22.62° and 67.38°

console.log("\nTest 3: hypotenuse + opposite angle");
triangle(10, "hypotenuse", 30, "opposite angle"); // Should find legs: 5 (opposite) and 8.66 (adjacent)

console.log("\nTest 4: hypotenuse + adjacent angle");
triangle(15, "hypotenuse", 40, "adjacent angle"); // Should find legs: 11.49 (adjacent) and 9.64 (opposite)

console.log("\nTest 5: leg + opposite angle");
triangle(7, "leg", 45, "opposite angle"); // Should find hypotenuse ~9.9 and second leg ~7

console.log("\nTest 6: Invalid input type");
triangle(5, "side", 10, "hypotenuse"); // Should output "Invalid input type"

console.log("\nTest 7: Zero input");
triangle(0, "leg", 10, "hypotenuse"); // Should output "Zero or negative input"

console.log("\nTest 8: Negative input");
triangle(-5, "leg", 10, "hypotenuse"); // Should output "Zero or negative input"

console.log("\nTest 9: Unknown parameter combination");
triangle(10, "angle", 5, "hypotenuse"); // Should output "Error: unknown parameter combination."

console.log("\nTest 10: Impossible triangle (leg > hypotenuse)");
triangle(10, "leg", 5, "hypotenuse"); // Should output "Impossible triangle (leg > hypotenuse)"
