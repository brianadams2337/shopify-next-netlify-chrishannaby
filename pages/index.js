import Head from "next/head";
import ProductListing from "@components/ProductListing";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { getProductList } from "@api/getProductList";

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Cheese and Meat Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <ul className="product-grid">
          test
        </ul>
      </main>

      <Footer />
    </>
  );
}
