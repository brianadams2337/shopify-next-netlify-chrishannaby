const { postToShopify } = require("./postToShopify");

exports.getProductList = async () => {
  try {
    const shopifyResponse = await postToShopify({
      query: `
        query getProductList {
          products(sortKey: ID, first: 100) {
            edges {
              node {
                id
                handle
                description
                title
                totalInventory
                variants(first: 5) {
                  edges {
                    node {
                      id
                      title
                      quantityAvailable
                      priceV2 {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                priceRange {
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      src
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });

    return shopifyResponse.products.edges;
  } catch (error) {
    const msg = Array.from(error);
    return msg;
  }
};
