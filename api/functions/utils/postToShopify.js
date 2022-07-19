const fetch = require("node-fetch");
exports.postToShopify = async ({ query, variables }) => {
  try {
    const result = await fetch("https://brianadams-netlify.myshopify.com/api/unstable/graphql.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          "3027c9c730ca4fe71c3c062005011fb8",
      },
      body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());

    if (result.errors) {
      console.log({ errors: result.errors });
    } else if (!result || !result.data) {
      console.log({ result });
      return "No results found.";
    }

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
