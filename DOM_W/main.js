let products;
let cartButton = document.querySelector(".cart-button");
let modal = document.querySelector(".modal");
let cartItems = [];
function updateTotal() {
  let total = document.querySelector(".total");
  let totalNumber = 0;
  cartItems.forEach((e) => {
    totalNumber += e.quantity * e.price;
  });
  total.innerHTML = `${totalNumber} $`;
}

fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((res) => {
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
          <input id="${e.id}" class="add-button" type="button" value="Add to cart" />
        </div>
      </div>
    `;
    });
    let addToCartButtons = document.querySelectorAll(".add-button");
    addToCartButtons.forEach((e) => {
      e.addEventListener("click", (event) => {
        let clickedID = event.target.getAttribute("id");
        let clickedProduct;
        products.forEach((e) => {
          if (e.id == clickedID) {
            clickedProduct = e;
          }
        });
        let cartItem = {
          id: clickedProduct.id,
          price: clickedProduct.price,
          quantity: 1,
        };
        let exist = false;
        cartItems.forEach((e) => {
          if (e.id == cartItem.id) {
            exist = true;
          }
        });

        if (exist) {
          alert("Item already in cart");
        } else {
          if (clickedProduct.stock == 0) {
            alert("Not in stock");
          } else {
            cartItems.push(cartItem);
            updateTotal();

            modal.innerHTML += `<div id="item${clickedID}" class="modal-item">
          <h2>${clickedProduct.title} </h2>
          <div class="quantity">
            <div id="${clickedID}" class="minus">-</div>
            <div id="count${clickedID}" class="count">1</div>
            <div id="${clickedID}" class="plus">+</div>
          </div>
          <div class="price">${clickedProduct.price} $</div>
          <i id="${clickedID}" class="fa-solid fa-trash delete"></i>
        </div>`;
            let minuses = document.querySelectorAll(".minus");
            let pluses = document.querySelectorAll(".plus");
            let deletes = document.querySelectorAll(".delete");
            pluses.forEach((e) => {
              e.addEventListener("click", (event) => {
                cartItems.forEach((e) => {
                  if (e.id == event.target.getAttribute("id")) {
                    e.quantity++;
                  }
                });
                clickedCount = document.querySelector(
                  "#count" + event.target.getAttribute("id")
                );

                clickedCount.innerHTML++;
                updateTotal();
              });
            });
            minuses.forEach((e) => {
              e.addEventListener("click", (event) => {
                cartItems.forEach((e) => {
                  if (e.id == event.target.getAttribute("id")) {
                    if (e.quantity > 1) {
                      e.quantity--;
                    }
                  }
                });
                clickedCount = document.querySelector(
                  "#count" + event.target.getAttribute("id")
                );
                if (clickedCount.innerHTML > 1) {
                  clickedCount.innerHTML--;
                  updateTotal();
                } else {
                  alert("Cannot update quantity");
                }
              });
            });
            deletes.forEach((e) => {
              e.addEventListener("click", (event) => {
                console.log(cartItems);

                let newCartItems = cartItems.filter(
                  (e) => e.id != event.target.getAttribute("id")
                );
                cartItems = newCartItems;
                document
                  .querySelector("#item" + event.target.getAttribute("id"))
                  .remove();
                updateTotal();
              });
            });
          }
        }
      });
    });
  });

cartButton.addEventListener("click", () => {
  modal.classList.toggle("active");
});
