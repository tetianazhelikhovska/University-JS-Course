(function(window) { //оголошує анонімну функцію яка одразу викликається
  var speakWord = "Hello";
  var helloSpeaker = {};
  helloSpeaker.speak = function(name) {
      console.log(speakWord + " " + name);
  };
  window.helloSpeaker = helloSpeaker;
})(window);