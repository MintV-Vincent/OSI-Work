import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkProps {
  label: string;
  link: string;
}

const hoverStyle: string = "hover:link link-underline link-underline-black";
const linkStyle: string =
  "flex items-center pl-[30px] pr-[30px] h-full text-xl font-semibold no-underline";
const activeStyle: string = linkStyle + " text-white bg-tab";
const nonActiveStyle: string = linkStyle + " text-white";

function currentTab(currentRoute: string) {
  const newArray: string[] = currentRoute.split("/");
  for (let i: number = 0; i < newArray.length; i++) {
    if (newArray[i] === "material") {
      return "/material";
    }
    if (newArray[i] === "front") {
      return "/front";
    }
  }
  return "/";
}

export function NavBar() {
  const currentRoute: string = usePathname();
  const newRoute: string = currentTab(currentRoute);

  const mainLinks: LinkProps[] = [
    { link: "/", label: "Home" },
    { link: "/front", label: "Front" },
    { link: "/material", label: "Material" },
  ];

  const mainItems: JSX.Element[] = mainLinks.map((item: LinkProps, index) => (
    <Link
      className={newRoute === item.link ? activeStyle : nonActiveStyle}
      href={item.link}
      key={item.label + index}
      passHref
      shallow
    >
      <label className={hoverStyle + " w-full"}>{item.label}</label>
    </Link>
  ));

  return (
    <nav className="h-16 flex justify-between items-center bg-primary drop-shadow-lg">
      <div className="flex h-16">{mainItems}</div>
    </nav>
  );
}
