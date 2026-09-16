import ThemeToggle from "./theme-toggle"
import { Store, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import Container from "./container"

const Navbar = () => {
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur'>
        <Container className="flex items-center justify-between h-16 gap-4">
            <Link className='flex items-center gap-2 py-1' href="/">
                <div className='w-8 h-8 shrink-0 flex justify-center items-center rounded-md bg-blue-100 dark:bg-blue-950'>
                    <Store className='w-4 h-4 text-blue-600 dark:text-blue-400'/>
                </div>
                <span className='text-base font-medium'>Kenakata.com</span>
            </Link>
            <nav className='flex items-center gap-2'>
                <Button variant={"ghost"} asChild>
                    <Link href={"/products"}>
                        Products
                    </Link>
                </Button>
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    asChild
                    aria-label='Cart'
                >
                    <Link href={'/cart'}>
                        <ShoppingCart className='w-5 h-5'/>
                    </Link>
                </Button>
                <ThemeToggle/>
            </nav>
        </Container>
    </header>
  )
}

export default Navbar