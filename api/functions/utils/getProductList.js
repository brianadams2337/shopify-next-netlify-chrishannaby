const { postToShopify } = require("./postToShopify");

exports.getProductList = async () => {
  try {
    const shopifyResponse = await postToShopify({
      query: `
        query getProductList {
          products(sortKey: TITLE, first: 1) {
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
    const msg = Array.from([
        {
          "node": {
            "id": "gid://shopify/Product/1974238216214",
            "handle": "aged-wood-dress-1",
            "description": "",
            "title": "Aged Steel Dress",
            "totalInventory": 10,
            "variants": {
              "edges": [
                {
                  "node": {
                    "id": "gid://shopify/ProductVariant/19523153133590",
                    "title": "Default Title"
                  }
                }
              ]
            },
            "priceRange": {
              "maxVariantPrice": {
                "amount": "0.0",
                "currencyCode": "CAD"
              },
              "minVariantPrice": {
                "amount": "0.0",
                "currencyCode": "CAD"
              }
            },
            "images": {
              "edges": [{"node": {}}]
            }
          }
        },
        {
          "node": {
            "id": "gid://shopify/Product/1974238216214",
            "handle": "aged-wood-dress-1",
            "description": "",
            "title": "Aged test Dress",
            "totalInventory": 10,
            "variants": {
              "edges": [
                {
                  "node": {
                    "id": "gid://shopify/ProductVariant/19523153133590",
                    "title": "Default Title"
                  }
                }
              ]
            },
            "priceRange": {
              "maxVariantPrice": {
                "amount": "0.0",
                "currencyCode": "CAD"
              },
              "minVariantPrice": {
                "amount": "0.0",
                "currencyCode": "CAD"
              }
            },
            "images": {
              "edges": [{"node": {}}]
            }
          }
        }
      ]);
    return msg;
  }
};
