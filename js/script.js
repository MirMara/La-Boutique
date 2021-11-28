function setCartProductsNum() {
  cartProductsNum.textContent = `Numero prodotti: ${cartList.length}`;
}

function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct);

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener("click", (e) => {
    cartList.push(
      productsList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    setCartProductsNum();

    const modal = document.querySelector(".modal");
    modal.classList.toggle("modal2");

    setTimeout(() => {
      modal.classList.toggle("modal2");
    }, 2000)



    // Nel caso in cui volessimo aggiungere una interazione col LocalStorage
    localStorage.setItem("totCartitems", cartList.length);
  });
}


function createImg(parent, imgUrl, productTitle) {
  const image = document.createElement("img");
  image.src = imgUrl;
  image.alt = productTitle;

  parent.appendChild(image);
}

function createText(parent, productTitle, textPrice) {
  const title = document.createElement("h4");
  title.textContent = productTitle;

  const price = document.createElement("strong");
  price.textContent = `${textPrice} $`;

  parent.append(title, price);
}

function renderProducts(listItems) {
  listItems.map((product) => {
    createProduct(
      wrapperProducts,
      product.image,
      product.title,
      product.price,
      product.id
    );
  });
}

function handleShowCartBtn() {
  // showCartBtn.setAttribute("disabled", true);
  wrapper.removeChild(showCartBtn);
  wrapperProducts.classList.add("sideViewAnim");

  document.querySelectorAll(".product")
  .forEach((product) => wrapperProducts.removeChild(product));

  renderProducts(JSON.parse(localStorageTot) || cartList);

  setTimeout(() => {
    wrapperProducts.classList.remove("sideViewAnim");
  }, 1000);
}


// Async await
const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;

  // Nella eventualità di aggiungere una quantità per prodotto
  // productsList = data.map((product) => {
  //   product.quantity = 0;
  //   return product;
  // });

  return renderProducts(data);
};

let productsList = [];
const wrapper = document.querySelector(".wrapper");
const wrapperProducts = document.querySelector(".wrapper__products");

// Parte inerente alla logica del carrello
let cartList = [];

let localStorageTot = localStorage.getItem("totCartitems");
const cartBtn = document.querySelector(".cartBtn");
const cartProductsNum = document.querySelector(".cartProductsNum");
const clearCartBtn = document.querySelector(".clearCart");
const showCartBtn = document.querySelector(".showCartBtn");

if (localStorageTot === null) {
  localStorageTot = 0
};


// Flusso generale
cartProductsNum.textContent = `Numero prodotti: ${localStorageTot}`;
getProductsList();

clearCartBtn.addEventListener("click", () => {
  cartList.length = 0;
  localStorage.removeItem("totCartitems");
  setCartProductsNum();
});

showCartBtn.addEventListener("click", handleShowCartBtn);
 

//slideshow

function slideshow() {
  setTimeout(() => {
    document.querySelector(".overlay").className = "overlay2";

    setTimeout(() => {
      document.querySelector(".overlay2").className = "overlay3";

      setTimeout(() => {
        document.querySelector(".overlay3").className = "overlay";

      }, 3000);
    }, 3000);
  }, 3000);

}

window.onload = setInterval(function () {
  slideshow();
}, 9000);

// Review Section 

const reviews = [{
    Name: "Priscilla P.",
    rate: "🌟4/5",
    Comment: "Amo questo sito, trovo tutto ciò di cui ho bisogno, dai vestiti all'elettronica!",
  },

  {
    Name: "Elizabeth M.",
    rate: "🌟5/5",
    Comment: "Il miglior e-commerce di sempre",
  },

  {
    Name: "Mary R.",
    rate: "🌟5/5",
    Comment: "Il mio sito preferito, compro tutto qui!",
  }
]

let counter = 0;

function reviewsSlider() {
  if (counter > 2) counter = 0;
  document.getElementById("boxReviews").firstElementChild.innerHTML =
    reviews[counter].Name;
  document.getElementById("boxReviewsComment").firstElementChild.innerHTML =
    reviews[counter].Comment;
  document.getElementById("boxReviewsRate").firstElementChild.innerHTML =
    reviews[counter].rate;

  counter++;

  setTimeout(reviewsSlider, 3000);
}
reviewsSlider();