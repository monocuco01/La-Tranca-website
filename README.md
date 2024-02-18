// Importa Product al principio del archivo
const Product = require("./products");

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

// En tu modelo CartItem
const CartItem = sequelize.define("CartItem", {
  // ... tus otros campos
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

CartItem.associate = (models) => {
  CartItem.belongsTo(Product, { foreignKey: "productId" });
  CartItem.belongsTo(models.Cart, { foreignKey: "cartId" });
};

module.exports = CartItem;


card
const Cart = require("../models/cart");
const Product = require("../models/products");
const CartItem = require("../models/cartItem"); // Importar el modelo CartItem

// Obtener todos los carritos
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll();
    res.status(200).json(carts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los carritos" });
  }
};
exports.getCartById = async (req, res) => {
  const cartId = req.params.id;

  try {
    const cart = await Cart.findByPk(cartId, {
      include: [
        {
          model: Product,
        },
      ],
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

// Crear un nuevo carrito// Crear un nuevo carrito
// ...
exports.createCart = async (req, res) => {
  try {
    // Verificar si hay productDetails en el cuerpo de la solicitud
    if (!req.body.productDetails || !Array.isArray(req.body.productDetails)) {
      return res
        .status(400)
        .json({ error: "Se requiere un array de productDetails" });
    }

    // Crear el carrito
    const newCart = await Cart.create();

    // Asociar productos al carrito y crear elementos en la tabla CartItem
    const cartItems = [];
    for (const productDetail of req.body.productDetails) {
      const { productId, quantity } = productDetail;

      // Crear elemento en la tabla CartItem
      const cartItem = await CartItem.create({
        productId,
        cartId: newCart.id,
        quantity: quantity || 1, // Si no se proporciona la cantidad, establecer a 1 por defecto
      });

      cartItems.push(cartItem);
    }

    // Recuperar el carrito con la información de productos asociados
    const cartWithProducts = await Cart.findByPk(newCart.id, {
      include: Product,
    });

    // Obtener la cantidad de productos en el carrito
    const productCount = cartWithProducts.Products.length;

    res.status(201).json({
      cart: cartWithProducts,
      cartId: newCart.id,
      productCount: productCount,
      cartItems: cartItems, // Agregamos los elementos del carrito a la respuesta
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el carrito" });
  }
};

// Actualizar un carrito por ID
exports.updateCart = async (req, res) => {
  const cartId = req.params.id;

  try {
    const [updatedRows] = await Cart.update(req.body, {
      where: { id: cartId },
    });

    if (updatedRows > 0) {
      res.status(200).json({ message: "Carrito actualizado correctamente" });
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el carrito" });
  }
};

// Eliminar un carrito por ID
exports.deleteCart = async (req, res) => {
  const cartId = req.params.id;

  try {
    const deletedRowCount = await Cart.destroy({
      where: { id: cartId },
    });

    if (deletedRowCount > 0) {
      res.status(200).json({ message: "Carrito eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el carrito" });
  }
};
