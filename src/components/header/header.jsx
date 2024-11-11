import Link from "next/link";
import Image from "next/image";

export const Header = () => (
  <header>
    <div className="topNav">
      <div className="nav-container">
        <Image src={"/vercel.svg"} alt="logo" width={50} height={50} />
        <nav>
          <Link href="/"> Home</Link>
          <Link href="/events"> Events</Link>
          <Link href="/about-us"> About Us</Link>
        </nav>
      </div>
      <p className="title">Page Title Goes Here</p>
    </div>
  </header>
);