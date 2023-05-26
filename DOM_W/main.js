let products;

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((res) => {
    console.log(res.products);
    products = res.products;
    let productsContainer = document.querySelector(".products");
    products.forEach((e) => {
      productsContainer.innerHTML += `
          <div class="product-card">
        <div class="fav">
          <i class="fa-regular fa-heart"></i>
        </div>
        <img
          src=${e.thumbnail}
          alt="headphones"
        />
        <div class="product-content">
          <div class="header">
            <h3>${e.title} </h3>
            <h3> ${e.price} $</h3>
          </div>
          <p> ${e.description} </p>
          <div class="stars">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <input type="button" value="Add to cart" />
        </div>
      </div>
    `;
    });
  });
let cartButton = document.querySelector(".cart-button");
let modal = document.querySelector(".modal");
cartButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});
