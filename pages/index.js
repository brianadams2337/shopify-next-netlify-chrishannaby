import Head from "next/head";
import Link from 'next/link';
import ProductListing from "@components/ProductListing";
import Header from "@components/Header";
import Footer from "@components/Footer";
import ScriptInjector from "@components/ScriptInjector";
import { getProductList } from "@api/getProductList";

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Fitness & Exercise Equipment for Your Facility or Home</title>
        <link rel="icon" href="/favicon.ico" />
        /** Algolia **/
        <script type="text/javascript" async src={`https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js?v=${process.env.ALGOLIA_APP_ID}`} />
        <script type="text/javascript">
          var myObj = new Object();
          myObj.appId = 'F45D81JRIB';
          myObj.apiKey = '7d8c3febdbeccf1bcde9076b24ca9041';
          myObj.siteId = 'c172167d-17aa-494c-bf94-273fd3ef5be0';
          myObj.branch = 'main';
          myObj.selector = 'div#algoliaSearchBox';
          myObj.placeholder = 'Search the Product Catalog';
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
        <Link href="/product/run-cx-treadmill">
          <button>View Item &gt; </button>
        </Link>
      </section>
      <div id="algoliaSearchBox"></div>
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
