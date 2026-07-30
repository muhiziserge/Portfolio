import Link from "next/link";

export function Nav() {
  return (
    <nav className="nav">
      <div className="wrap">
        <Link className="nav-name" href="/">
          Serge Muhizi
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/#work">Work</Link>
          </li>
          <li>
            <Link href="/#about">About</Link>
          </li>
          <li>
            <Link href="/#contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
