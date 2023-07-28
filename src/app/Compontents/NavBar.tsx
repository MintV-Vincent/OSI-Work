"use client";
import Logo from "Images/Logo.svg";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface LinkProps {
  label: string;
  link: string;
}

const linkStyle =
  "flex items-center pl-[30px] pr-[30px] h-full no-underline hover:text-amber-600 duration-300";
const activeStyle = linkStyle + " text-primary bg-amber-300";
const nonActiveStyle = linkStyle + " text-primary";

export function NavBar() {
  const currentRoute = usePathname();
  const mainLinks: LinkProps[] = [
    { link: "/", label: "Front" },
    { link: "/material", label: "Material" },
  ];

  const mainItems = mainLinks.map((item: LinkProps, index) => (
    <Link
      className={currentRoute === item.link ? activeStyle : nonActiveStyle}
      href={item.link}
      key={item.label + index}
      passHref
      shallow
    >
      <label className="text-xl font-semibold">{item.label}</label>
    </Link>
  ));

  return (
    <nav className="h-16 flex justify-between items-center bg-light drop-shadow-lg">
      <Image
        className="w-auto h-16 p-2.5"
        src={Logo}
        priority={true}
        alt="PFC FLEX LOGO"
      />
      <div className="flex h-16">{mainItems}</div>
    </nav>
  );
}
