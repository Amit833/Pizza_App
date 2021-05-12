const Menu = require("../models/menu");

exports.homeController = async (req, res, next) => {
  const pizzas = await Menu.find();
  console.log("piz=", pizzas);
  res.render("home", { pizzas: pizzas });
};
