   let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    const indicatorsContainer = document.getElementById("indicators");

    function showSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      document.getElementById("slides").style.transform = `translateX(-${currentSlide * 100}%)`;
      updateIndicators();
    }

    function moveSlide(step) {
      showSlide(currentSlide + step);
    }

    function updateIndicators() {
      indicatorsContainer.innerHTML = "";
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("span");
        dot.className = "dot" + (i === currentSlide ? " active" : "");
        dot.onclick = () => showSlide(i);
        indicatorsContainer.appendChild(dot);
      }
    }

    function toggleMenu() {
      const menu = document.getElementById("mobileMenu");
      menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    }

    // Автоперемикання слайдів кожні 6 секунд
    setInterval(() => {
      moveSlide(1);
    }, 6000);

    showSlide(currentSlide);