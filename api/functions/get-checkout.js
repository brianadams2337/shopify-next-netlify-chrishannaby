/**
 * API Endpoint
 *
 * * Purpose: Get link to Shopify hosted Checkout
 * @param {string} cartId
 *
 * Example:
 *```
 * fetch('/.netlify/functions/get-checkout', {
 *   method: 'POST',
 *   body: JSON.stringify({ cartId: '12345' })
 * })
 * ```
 *
 * ! POST method is intentional for future enhancement
 *
 * TODO: Add enhancement for pagination
 */

const { postToShopify } = require("./utils/postToShopify");

exports.handler = async (event) => {
  const { cartId } = JSON.parse(event.body);

  try {
    console.log("--------------------------------");
    console.log("Getting Checkout URL...");
    console.log("--------------------------------");
    const shopifyResponse = await postToShopify({
      query: `
        query checkoutURL($cartId: ID!) {
          cart(id: $cartId) {
            checkoutUrl
          }
        }
       `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(shopifyResponse),
    };
  } catch (error) {
    console.log(error);
  }
};
