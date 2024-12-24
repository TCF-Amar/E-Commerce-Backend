import cartModel from "../models/cartModel.js";
// Add a product to the cart
const addToCart = async (req, res) => {
  try {
    const { user, product, size, quantity } = req.body;

    // Validate inputs
    if (!user || !product || !size || !quantity) {
      return res.status(400).json({
        success: false,
        message: "All fields (user, product, size, quantity) are required.",
      });
    }

    // Find or create cart for the user
    let userCart = await cartModel.findOne({ user });
    if (!userCart) {
      userCart = new cartModel({ user, products: [] });
    }

    // Check if the product with the same size exists
    const existingProduct = userCart.products.find(
      (p) => p.product.toString() === product && p.size === size
    );

    if (existingProduct) {
      // Update quantity if product with the same size exists
      existingProduct.quantity += quantity;
    } else {
      // Add new product to cart
      userCart.products.push({ product, size, quantity });
    }

    // Save updated cart
    await userCart.save();

    return res.status(200).json({
      success: true,
      message: existingProduct
        ? "Product quantity updated"
        : "Product added to cart",
      cart: userCart, // Optionally send back the updated cart
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Remove a product from the cart

// Remove a product from the cart
const removeFromCart = async (req, res) => {
  try {
    const { user, cartItemId } = req.body;

    // Validate inputs
    if (!user || !cartItemId) {
      return res.status(400).json({
        success: false,
        message: "User ID and cart item ID are required.",
      });
    }

    // Find user's cart
    const userCart = await cartModel.findOne({ user });

    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user.",
      });
    }

    // Find the index of the cart item to remove
    const itemIndex = userCart.products.findIndex(
      (item) => item._id.toString() === cartItemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found.",
      });
    }

    // Remove item from products array
    userCart.products.splice(itemIndex, 1);

    // Save the updated cart
    await userCart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart.",
      cart: userCart, // Optionally send back the updated cart
    });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// get cart item by only user id.
const getCartByUser = async (req, res) => {
  try {
    const { user } = req.body;

    // Validate inputs
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // Find user's cart
    const userCart = await cartModel.findOne({ user });

    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart found.",
      cart: userCart, // Optionally send back the updated cart
    });
  } catch (error) {
    console.error("Error in getCartByUser:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export { addToCart, removeFromCart, getCartByUser };
