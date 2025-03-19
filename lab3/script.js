(function() {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
  
  for (var i = 0; i < names.length; i++) {
      var firstLetter = names[i].charAt(0).toLowerCase();
      
      if (firstLetter === 'j') {
          byeSpeaker.speak(names[i]);
      } else {
          helloSpeaker.speak(names[i]);
      }
  }
  
  console.log("\nДодатковий функціонал: Відбір імен за сумою ASCII-кодів літер (поріг = 500)");
  
  function getAsciiSum(name) {
      return name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  }
  
  var threshold = 500;
  for (var i = 0; i < names.length; i++) {
      var asciiSum = getAsciiSum(names[i]);
      if (asciiSum > threshold) {
          console.log(names[i] + " має суму ASCII-кодів " + asciiSum + " і перевищує поріг.");
      }
  }
})();
