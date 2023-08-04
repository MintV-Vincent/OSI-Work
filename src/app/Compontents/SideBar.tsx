import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkProps {
  label: string;
  link: string;
}

const linkStyle: string =
  "no-underline block px-2 py-2 mt-4 text-sm font-semibold rounded-lg hover:text-hover duration-300 ";
const activeStyle: string = linkStyle + " text-white bg-tab";
const nonActiveStyle: string = linkStyle + " text-white";

export default function SideBar() {
  const currentRoute: string = usePathname();
  const mainLinks: LinkProps[] = [
    { link: "/material", label: "Total" },
    { link: "/material/materials", label: "Materials" },
    { link: "/material/process", label: "Process & Film" },
    { link: "/material/service", label: "Quality Services" },
    { link: "/material/nre", label: "NRE" },
  ];

  const mainItems: JSX.Element[] = mainLinks.map((item: LinkProps, index) => (
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
        className="w-40 flex flex-col bg-primary pt"
        x-data="{ open: false }"
      >
        <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
          <div>{mainItems}</div>
        </nav>
      </div>
    </div>
  );
}
