import { useState, useEffect } from "react";
import { Menu, X, Settings2, Sparkles, Inbox } from "lucide-react";

interface HeaderProps {
  brandName: string;
  onEditToggle: () => void;
  unreadCount: number;
  isLocal?: boolean;
}

export default function Header({ brandName, onEditToggle, unreadCount, isLocal = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      id="portfolio-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF6EE]/90 backdrop-blur-md shadow-xs border-b border-[#E5DDD0] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="nav-logo"
          href="#"
          className="font-display font-bold text-xl tracking-tight text-[#2E2C29] flex items-center gap-1.5 group select-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#4E5B4F] group-hover:scale-130 transition-transform duration-300"></span>
          {brandName || "Portfolio"}
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              id={`nav-item-${item.name.toLowerCase()}`}
              key={item.name}
              href={item.href}
              className="text-[14px] font-semibold text-[#5D574F] hover:text-[#2E2C29] transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Actions Menu */}
        {isLocal && (
          <div className="hidden md:flex items-center gap-3">
            <button
              id="btn-open-customizer"
              onClick={onEditToggle}
              className="flex items-center gap-2 px-5 py-2 text-[13px] font-bold tracking-tight text-white bg-[#2E2C29] hover:bg-[#3E3A35] rounded-full transition-all duration-200 cursor-pointer shadow-xs active:scale-95 border border-[#E5DDD0]/10"
            >
              <Settings2 size={15} />
              <span>Customize Site</span>
              {unreadCount > 0 && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4E5B4F]/80 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4E5B4F]"></span>
                </span>
              )}
            </button>
          </div>
        )}

        {/* Mobile Buttons */}
        <div className="md:hidden flex items-center gap-3">
          {isLocal && (
            <button
              id="mobile-btn-customizer"
              onClick={onEditToggle}
              className="p-2 text-[#2E2C29] bg-[#EBE5D8] hover:bg-[#DDD5C5] rounded-full transition-colors relative"
              aria-label="Customize Site"
            >
              <Settings2 size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4E5B4F]/80 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4E5B4F]"></span>
                </span>
              )}
            </button>
          )}

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#2E2C29] hover:bg-[#EBE5D8]/50 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-pane"
          className="md:hidden absolute top-full left-0 right-0 bg-[#FAF6EE] border-b border-[#E5DDD0] shadow-md flex flex-col py-4 px-6 gap-4"
        >
          {navItems.map((item) => (
            <a
              id={`mobile-nav-item-${item.name.toLowerCase()}`}
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#5D574F] hover:text-[#2E2C29] py-1 border-b border-[#E5DDD0]/55"
            >
              {item.name}
            </a>
          ))}
          {isLocal && (
            <button
              id="mobile-panel-customize"
              onClick={() => {
                setMobileMenuOpen(false);
                onEditToggle();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 mt-2 bg-[#2E2C29] hover:bg-[#3E3A35] text-sm font-semibold rounded-full text-white cursor-pointer"
            >
              <Settings2 size={16} />
              Customizer & Inbox
              {unreadCount > 0 && (
                <span className="ml-1 bg-[#4E5B4F] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          )}
        </div>
      )}
    </header>
  );
}
