import Link from 'next/link';
import { useGlobalState, setGlobalState } from '@components/CartPreview';

export default function Header() {
  let [count, setCount] = useGlobalState('count');

  return (
    <header className="app-header">
      <h1>
        <Link href="/">
          <a><img src="https://www.lifefitness.com/resource/crblob/1164/260e4ad4ec1b7642864fbe5a149d147c/logo-svg-data.svg" altText="Life Fitness"/></a>
        </Link>
      </h1>
      <nav className="main-nav">
        <ul>
          <li className="main-nav-item">
            <Link href="/">
              <a>All Products</a>
            </Link>
          </li>
          {/* <li className="main-nav-item">
            <Link href="/cheeses"><a>Cheeses</a></Link>
          </li>
          <li className="main-nav-item">
            <Link href="/meats"><a>Meats</a></Link>
          </li>
          <li className="main-nav-item">
            <Link href="/boards"><a>Boards</a></Link>
          </li> */}
          <li className="main-nav-item">
            <Link href="/cart">
              <a className="cart cartLink">Shopping Cart<span class="badge">{ count }</span></a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
