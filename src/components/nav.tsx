import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  return (
    <nav className="nav">
      <div className="wrap">
        <Link className="nav-name" href="/">
          Serge Muhizi
        </Link>
        <div className="nav-right">
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
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
