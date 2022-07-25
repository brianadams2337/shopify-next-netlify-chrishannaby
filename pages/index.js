import Head from "next/head";
import ProductListing from "@components/ProductListing";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { getProductList } from "@api/getProductList";
import { AlgoliaApp } from "algoliaInstantSearch";


export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Fitness & Exercise Equipment for Your Facility or Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css" integrity="sha256-TehzF/2QvNKhGQrrNpoOb2Ck4iGZ1J/DI4pkd2oUsBc=" crossorigin="anonymous" />
        /** Algolia **/
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css" />
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js"></script>
        <script type="text/javascript">
          const myObj = new Object;
          myObj.appId = 'F45D81JRIB';
          myObj.apiKey = '7d8c3febdbeccf1bcde9076b24ca9041';
          myObj.siteId = 'c172167d-17aa-494c-bf94-273fd3ef5be0';
          myObj.branch = 'main';
          myObj.selector = 'div#algoliaSearchBox';
          algoliasearchNetlify(myObj);
        </script>
      </Head>

      <Header />
      
      <main>
      <section className="testimonial">
        <h2>
          UPGRADE YOUR HOME WORKOUTS
        </h2>
        <p>The New Run CX Treadmill</p>
        <a href="/product/run-cx-treadmill"><button>View Item &gt; </button></a>
      </section>
      <h2>
        FEATURED PRODUCTS
      </h2>

        <ul className="product-grid">
          {products.map((p, index) => {
            return <ProductListing key={`product${index}`} product={p.node} />;
          })}
        </ul>

      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const products = await getProductList()
  return {
    props: {
      products
    }
  }
}
