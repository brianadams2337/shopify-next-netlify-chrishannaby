import React from 'react';
import Link from 'next/link';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-hooks-web';
import { connectStateResults, searchState } from 'react-instantsearch-dom';

const StateResults = ( searchState ) => (
  <div>
    The query typed is <q>{searchState.query}</q>
  </div>
);

const searchClient = algoliasearch('F45D81JRIB', '7d8c3febdbeccf1bcde9076b24ca9041');

function Hit({ hit }) {
  return (
    <article>
      <li className="product-card">
        <Link href={hit.url}>
          <a>
            <h3 className="product-card-title">{hit.title}</h3>
          </a>
        </Link>
      </li>
    </article>
  );
}

function AlgoliaApp() {
  return (
    <InstantSearch indexName="netlify_c172167d-17aa-494c-bf94-273fd3ef5be0_main_all" searchClient={searchClient} searchState={searchState}>
      <div className="left-panel">
        <SearchBox />
        <StateResults />
        <Configure hitsPerPage={3} />
        <Hits hitComponent={Hit} />
        <Hits />
      </div>
    </InstantSearch>
  );
}


export { AlgoliaApp }
