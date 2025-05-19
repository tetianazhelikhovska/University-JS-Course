document.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.getElementById("home");
  const catalogBtn = document.getElementById("catalog");
  const mainContent = document.getElementById("main-content");

  function setActiveNavButton(button) {
    document.querySelectorAll("nav button").forEach(btn => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
  }

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

  // AJAX-запит для завантаження JSON
  function ajaxGetJSON(url, successCallback, errorCallback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const data = JSON.parse(xhr.responseText);
            successCallback(data);
          } catch (e) {
            errorCallback(e);
          }
        } else {
          errorCallback(new Error(`HTTP status ${xhr.status}`));
        }
      }
    };
    xhr.send();
  }

  function loadCategoriesPage() {
    setActiveNavButton(catalogBtn);

    ajaxGetJSON(
      "data/categories.json",
      (categories) => {
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

        const tabs = mainContent.querySelectorAll(".tab");
        tabs.forEach(tab => {
          tab.addEventListener("click", () => {
            const category = tab.getAttribute("data-category");

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            if (category === "specials") {
              const randomIndex = Math.floor(Math.random() * categories.length);
              loadProductList(categories[randomIndex].shortname);
            } else {
              loadProductList(category);
            }
          });
        });

        tabs[0].classList.add("active");
        loadProductList(categories[0].shortname);
      },
      (error) => {
        console.error("Помилка при завантаженні категорій:", error);
        mainContent.innerHTML = `<p>Не вдалося завантажити категорії. Помилка: ${error.message}</p>`;
      }
    );
  }

  function loadProductList(categoryShortname) {
    ajaxGetJSON(
      `data/${categoryShortname}.json`,
      (data) => {
        const productListContainer = mainContent.querySelector(".product-list");
        productListContainer.innerHTML = "";

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
      },
      (error) => {
        console.error(`Помилка при завантаженні категорії ${categoryShortname}:`, error);
        const productListContainer = mainContent.querySelector(".product-list");
        productListContainer.innerHTML = `<p>Не вдалося завантажити товари. Помилка: ${error.message}</p>`;
      }
    );
  }

  homeBtn.addEventListener("click", loadHomePage);
  catalogBtn.addEventListener("click", loadCategoriesPage);

  loadHomePage();
});
