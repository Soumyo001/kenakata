import Navbar from "@/components/layout/nav-bar"
import Footer from "@/components/layout/footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
        <Navbar/>
        <main className="flex-1">
          {children}
        </main>
        <Footer/>
    </div>
  )
}