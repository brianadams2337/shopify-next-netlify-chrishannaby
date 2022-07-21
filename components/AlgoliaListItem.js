import Link from 'next/link';

export default function AlgoliaListItem({ product }) {
  return (
      <li className="product-card">
        <div className="product-card-text">
          <h3 className="product-card-title">{product.title}</h3>
        </div>
        <Link href={product.origin + product.url}>
          <a>
            <button>View Item {`>`} </button>
          </a>
        </Link>
      </li>
  );
}
