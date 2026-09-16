'use client'
import { useTheme } from "next-themes"
import { Button } from "../ui/button"
import { Sun, Moon } from "lucide-react"

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light":"dark")}
    >
      <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
      <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
    </Button>
  )
}

export default ThemeToggle