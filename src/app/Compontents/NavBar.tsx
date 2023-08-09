import Logo from "Images/Logo.svg";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface LinkProps {
  label: string;
  link: string;
}

const linkStyle: string =
  "flex items-center pl-[30px] pr-[30px] h-full text-xl font-semibold no-underline hover:link2 link-underline2 link-underline-black2";
const activeStyle: string = linkStyle + " text-white bg-tab";
const nonActiveStyle: string = linkStyle + " text-white";

function currentTab(currentRoute: string) {
  const newArray: string[] = currentRoute.split("/");
  for (let i: number = 0; i < newArray.length; i++) {
    if (newArray[i] === "material") {
      return "/material";
    }
  }
  return "/";
}

export function NavBar() {
  const currentRoute: string = usePathname();
  const newRoute: string = currentTab(currentRoute);

  const mainLinks: LinkProps[] = [
    { link: "/", label: "Front" },
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
      {item.label}
    </Link>
  ));

  return (
    <nav className="h-16 flex justify-between items-center bg-primary drop-shadow-lg">
      <Image
        className="w-72 h-16 p-2.5"
        src={Logo}
        priority={true}
        alt="PFC FLEX LOGO"
      />
      <div className="flex h-16">{mainItems}</div>
    </nav>
  );
}
