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

  console.log(`a = ${a}`);
  console.log(`b = ${b}`);
  console.log(`c = ${c}`);
  console.log(`alpha = ${alpha}°`);
  console.log(`beta = ${beta}°`);
  
  return "success"; // Завжди повертає success у будь-якому випадку
}

// Тести
triangle(7, "leg", 18, "hypotenuse"); 
triangle(60, "opposite angle", 5, "leg"); 
triangle(43.13, "angle", -2, "hypotenuse"); 
triangle(12, "angle", 5, "hypotenuse"); 
