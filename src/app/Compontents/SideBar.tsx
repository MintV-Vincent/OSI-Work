"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkProps {
  label: string;
  link: string;
}

const linkStyle =
  "no-underline block px-2 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg";
const activeStyle = linkStyle + " text-primary bg-amber-300";
const nonActiveStyle = linkStyle + " text-primary";

export default function SideBar() {
  const currentRoute = usePathname();
  const mainLinks: LinkProps[] = [
    { link: "/material", label: "Total" },
    { link: "/material/materials", label: "Materials" },
    { link: "/material/process", label: "Process & Film" },
    { link: "/material/service", label: "Qaulity Services" },
    { link: "/material/nre", label: "NRE" },
  ];

  const mainItems = mainLinks.map((item: LinkProps, index) => (
    <Link
      className={currentRoute === item.link ? activeStyle : nonActiveStyle}
      href={item.link}
      key={item.label + index}
      passHref
      shallow
    >
      {item.label}
    </Link>
  ));

  return (
    <div className="md:flex flex-col md:flex-row min-h-screen w-40">
      <div
        className="w-40 flex flex-col text-gray-700 bg-light dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0"
        x-data="{ open: false }"
      >
        <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
          <div>{mainItems}</div>
        </nav>
      </div>
    </div>
  );
}
