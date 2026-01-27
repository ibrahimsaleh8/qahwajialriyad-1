"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "الرئيسية",
    url: "/dashboard",
  },
  {
    title: "من نحن",
    url: "/dashboard/about",
  },
  {
    title: "خدماتنا",
    url: "/dashboard/services",
  },
  {
    title: "لماذا نحن",
    url: "/dashboard/whyus",
  },
  {
    title: "الكلمات المفتاحية",
    url: "/dashboard/keywords",
  },
  {
    title: "معرض الصور",
    url: "/dashboard/gallary",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="bg-[#F3EFEE]!">
      <SidebarContent className="py-10 bg-[#F3EFEE]!">
        <div className="px-5 text-xl font-bold">لوحة التحكم</div>
        <SidebarGroup>
          <SidebarGroupLabel>روابط</SidebarGroupLabel>
          <SidebarGroupContent>
            <ul className="flex flex-col gap-4 w-full">
              {items.map((item) => (
                <li className="w-full flex" key={item.title}>
                  <Link
                    className={`${pathname == item.url ? "bg-black text-white" : ""} w-full text-right px-3 py-2 rounded-sm font-medium hover:bg-black hover:text-white duration-300`}
                    href={item.url}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
