import { 
    ShoppingBag,
    ShoppingCart,
    Home,
    Store
} from "lucide-react"
import { 
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter
} from "../ui/sidebar"
import Link from "next/link"
import { getCategories } from "@/lib/api/categories"
import { CategoryType } from "@/lib/types"

const AppSidebar = async () => {
  const categories: CategoryType[] = await getCategories();
  
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-md bg-blue-100 dark:bg-blue-950">
            <Store className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
          </div>
          <span className="text-sm font-medium">
            Kenakata.com
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={"Home"}>
                  <Link href="/home">
                    <Home/>
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={"Products"}>
                  <Link href="/products">
                    <ShoppingBag/>
                    <span>Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={"Cart"}>
                  <Link href="/cart">
                    <ShoppingCart/>
                    <span>Cart</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar