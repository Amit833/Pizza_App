import axios from "axios";
import Noty from "noty";
let addToCart = document.querySelectorAll(".add-to-cart");

let cartCounter = document.querySelector("#cartCounter");

function updateCart(pizza) {
  axios
    .post("/cart", pizza)
    .then((res) => {
      cartCounter.innerText = res.data.totalQty;

      new Noty({
        type: "success",
        timeout: 1000,
        text: "item added to your cart",
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 1000,
        text: "Something went wrong",
        progressBar: false,
      }).show();
    });
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
    console.log(pizza);
  });
});

// export const updateCart = async (pizza) => {
//   try {
//     const logIndata = await axios.post(`/cart`, pizza);
//     return logIndata;
//   } catch (err) {
//     return err.response.data;
//   }
// };
