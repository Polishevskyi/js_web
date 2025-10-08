module.exports = {
  pageTitle: '.title',
  cartItem: '.cart_item',
  cartItemName: '.inventory_item_name',
  shoppingCartBadge: '.shopping_cart_badge',
  removeButton: (productName) => `[data-test="remove-${productName}"]`,
  removeButtonFirst: '[data-test^="remove"]',
  continueShoppingButton: '#continue-shopping',
  checkoutButton: '#checkout',
  cartQuantity: '.cart_quantity',
};
