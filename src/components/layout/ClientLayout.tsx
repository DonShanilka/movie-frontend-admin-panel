"use client";

import { usePathname } from "next/navigation";
import SidebarNavigation from "./Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/signin" || pathname === "/signup";

    return (
        <>
            {!isAuthPage && <SidebarNavigation />}
            <div className={!isAuthPage ? "ml-[280px] p-6" : ""}>
                {children}
            </div>
        </>
    );
}
