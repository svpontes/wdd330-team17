import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductsDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices("tents");
const productId = getParam("product");

const product = new ProductsDetails(productId, dataSource);
product.init();

/*import {setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);*/
