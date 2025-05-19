document.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.getElementById("home");
  const catalogBtn = document.getElementById("catalog");
  const mainContent = document.getElementById("main-content");

  // Встановлюємо активну кнопку в навігації
  function setActiveNavButton(button) {
    document.querySelectorAll("nav button").forEach(btn => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
  }

  // Завантаження головної сторінки
  function loadHomePage() {
    setActiveNavButton(homeBtn);
    
    mainContent.innerHTML = `
      <div class="welcome-page">
        <span class="hand-icon"><img src="icons/dot.png" alt="Finger" class="icon" /></span>
        <h1>Вітаємо у нашому каталозі!</h1>
        <p>Оберіть категорію, щоб переглянути товари або послуги.</p>
      </div>
    `;
  }

  // Завантаження категорій і відображення табів
  async function loadCategoriesPage() {
    setActiveNavButton(catalogBtn);
    
    try {
      const response = await fetch("data/categories.json");
      const categories = await response.json();
      
      // Створюємо структуру сторінки категорій
      mainContent.innerHTML = `
        <div class="categories-page">
          <h2>Категорії</h2>
          <div class="tabs">
            ${categories.map(cat => `<div class="tab" data-category="${cat.shortname}">${cat.name}</div>`).join('')}
            <div class="tab" data-category="specials">Specials</div>
          </div>
          <div class="product-list"></div>
        </div>
      `;
      
      // Додаємо обробники подій для табів
      const tabs = mainContent.querySelectorAll(".tab");
      tabs.forEach(tab => {
        tab.addEventListener("click", () => {
          const category = tab.getAttribute("data-category");
          
          // Видаляємо активний клас з усіх табів
          tabs.forEach(t => t.classList.remove("active"));
          // Додаємо активний клас на вибраний таб
          tab.classList.add("active");
          
          if (category === "specials") {
            // Вибір випадкової категорії для Specials
            const randomIndex = Math.floor(Math.random() * categories.length);
            loadProductList(categories[randomIndex].shortname);
          } else {
            loadProductList(category);
          }
        });
      });
      
      // За замовчуванням вибираємо перший таб
      tabs[0].classList.add("active");
      loadProductList(categories[0].shortname);
      
    } catch (error) {
      console.error("Помилка при завантаженні категорій:", error);
      mainContent.innerHTML = `<p>Не вдалося завантажити категорії. Помилка: ${error.message}</p>`;
    }
  }

  // Завантаження списку продуктів вибраної категорії
  async function loadProductList(categoryShortname) {
    try {
      const response = await fetch(`data/${categoryShortname}.json`);
      const data = await response.json();
      
      const productListContainer = mainContent.querySelector(".product-list");
      productListContainer.innerHTML = "";
      
      // Заповнюємо список продуктів
      data.items.forEach(item => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        
    productCard.innerHTML = `
  <div class="product-info">
    <h3 class="product-name">${item.name}</h3>
    <p class="product-description">${item.description}</p>
    <p class="product-price">Ціна: ${item.price}</p>
  </div>
  <div class="product-image">
    <img src="${item.photo}" alt="${item.name}" style="width: 120px; height: 120px; border-radius: 10px; object-fit: cover;" />
  </div>
`;

        
        productListContainer.appendChild(productCard);
      });
      
    } catch (error) {
      console.error(`Помилка при завантаженні категорії ${categoryShortname}:`, error);
      const productListContainer = mainContent.querySelector(".product-list");
      productListContainer.innerHTML = `<p>Не вдалося завантажити товари. Помилка: ${error.message}</p>`;
    }
  }

  // Налаштування обробників подій для навігаційних кнопок
  homeBtn.addEventListener("click", () => {
    loadHomePage();
  });

  catalogBtn.addEventListener("click", () => {
    loadCategoriesPage();
  });

  // За замовчуванням завантажуємо головну сторінку
  loadHomePage();
});