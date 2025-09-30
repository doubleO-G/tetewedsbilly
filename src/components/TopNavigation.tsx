import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const TopNavigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navigationItems = [
    { path: "/", label: "Home" },
    { path: "/meet-couple", label: "Meet Stacey & Richard" },
    { path: "/support", label: "Support Our Wedding" },
  ];

  const NavLink = ({ path, label, onClick }: { path: string; label: string; onClick?: () => void }) => (
    <Link to={path} onClick={onClick}>
      <NavigationMenuLink
        className={cn(
          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
          isActive(path) && "bg-accent text-accent-foreground"
        )}
      >
        {label}
      </NavigationMenuLink>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl font-semibold text-primary">
            Stacey & Richard
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavLink path={item.path} label={item.label} />
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left font-serif text-xl text-primary">
                  Stacey & Richard
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 text-lg font-medium py-2 px-4 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive(item.path) && "bg-accent text-accent-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};

export default TopNavigation;