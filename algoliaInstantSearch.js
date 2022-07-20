import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Highlight, RefinementList, Pagination } from 'react-instantsearch-dom';
// import { InstantSearch, SearchBox, Hits, Highlight, RefinementList } from 'react-instantsearch-hooks-web';
import Link from 'next/link';

const searchClient = algoliasearch('F45D81JRIB', '7d8c3febdbeccf1bcde9076b24ca9041');

// const AlgoliaApp = () => (
//   <InstantSearch searchClient={searchClient} indexName="netlify_c172167d-17aa-494c-bf94-273fd3ef5be0_main_all">
//     <SearchBox />
//     <Hits />
//   </InstantSearch>
// );

function Hit({ hit }) {
  return (
    <article>
      <li className="product-card">
        <div className="product-card-frame">
          <img className="prodimg" src={hit.img} alt={hit.image} />
        </div>
        <div className="product-card-text">
          <h3 className="product-card-title">{hit.title}</h3>
        </div>
        <Link href={hit.origin + hit.url}>
          <a>
            <button>View Item {`>`} </button>
          </a>
        </Link>
      </li>
    </article>
  );
}

function AlgoliaApp() {
  return (
    <InstantSearch searchClient={searchClient} indexName="netlify_c172167d-17aa-494c-bf94-273fd3ef5be0_main_all">
      <SearchBox />
      <Hits />
      <Pagination />
    </InstantSearch>
  );
}

export { AlgoliaApp }
