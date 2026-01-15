import { Activity, Phone, Mail, Menu, LogIn, ChevronDown, Globe, User } from "lucide-react";
import logo from "figma:asset/dfb83cb5936b44ca2202c18d197b3196619183a4.png";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'de' | 'en' | 'ru'>('de');
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <header ref={headerRef} className={`bg-white sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation - Left aligned */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Agency for Patient Care" className="h-12" />
            </Link>
            
            {/* Navigation - Left aligned next to logo with 20px margin */}
            <nav className="hidden md:flex items-center gap-8 font-medium tracking-normal ml-5">
              <div className="relative">
                <button 
                  onClick={() => toggleMenu('care')}
                  className="hover:text-gray-600 transition-colors flex items-center gap-1 cursor-pointer"
                  style={{ fontSize: '16px' }}
                >
                  Care
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <button 
                  onClick={() => toggleMenu('patient')}
                  className="hover:text-gray-600 transition-colors flex items-center gap-1 cursor-pointer"
                  style={{ fontSize: '16px' }}
                >
                  Patient Resources
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <button 
                  onClick={() => toggleMenu('trust')}
                  className="hover:text-gray-600 transition-colors flex items-center gap-1 cursor-pointer"
                  style={{ fontSize: '16px' }}
                >
                  Trust & Safety
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </nav>
          </div>

          {/* Login - Right aligned */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => toggleMenu('language')}
                className="hover:text-gray-600 transition-colors flex items-center gap-2 cursor-pointer"
                style={{ fontSize: '16px' }}
              >
                <span className="text-2xl">{currentLanguage?.flag}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <Link to="/appointment" className="hover:opacity-80 transition-opacity font-medium tracking-normal pb-1.5 bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent relative">
              Request appointment
              <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-orange-500 to-purple-600"></span>
            </Link>
            <a href="#login" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2 font-medium tracking-normal pb-1.5">
              <User className="w-4 h-4" />
              Login
            </a>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-700">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Full-width dropdown menu - Care at Gmed */}
      {activeMenu === 'care' && (
        <div className="fixed left-0 right-0 top-[73px] bg-white border-t border-gray-200 shadow-lg z-40">
          <div className="py-8 px-16">
            <div className="grid grid-cols-3 gap-8">
              {/* Column 1 - Menu Items */}
              <div className="flex flex-col gap-2">
                <Link to="/patient-centered-care" onClick={() => setActiveMenu(null)} className="px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition-colors pb-1.5 underline-offset-[6px]">
                  Patient-Centered Care
                </Link>
                <Link to="/about-gmed" onClick={() => setActiveMenu(null)} className="px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition-colors pb-1.5 underline-offset-[6px]">
                  About Gmed
                </Link>
                <Link to="/appointment" onClick={() => setActiveMenu(null)} className="px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition-colors pb-1.5 underline-offset-[6px]">
                  Request Appointment
                </Link>
                <Link to="/find-doctor" onClick={() => setActiveMenu(null)} className="px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition-colors pb-1.5 underline-offset-[6px]">
                  Find a Doctor
                </Link>
                <Link to="/locations" onClick={() => setActiveMenu(null)} className="px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition-colors pb-1.5 underline-offset-[6px]">
                  Locations
                </Link>
              </div>
              
              {/* Column 2 - Empty */}
              <div></div>
              
              {/* Column 3 - Medical Image */}
              <div className="flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1739298061768-41a8a7d8b38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xpbmljJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NTcyMzg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Medical Professional"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-width dropdown menu - Patient Care */}
      {activeMenu === 'patient' && (
        <div className="fixed left-0 right-0 top-[73px] bg-white border-t border-gray-200 shadow-lg z-40">
          <div className="py-8 px-16">
            <div className="grid grid-cols-3 gap-8">
              {/* Column 1 - Menu Items */}
              <div className="flex flex-col gap-2">
                <Link to="/patient-services" onClick={() => setActiveMenu(null)} className="px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition-colors pb-1.5 underline-offset-[6px]">
                  Patient Services
                </Link>
                <Link to="/medical-records" onClick={() => setActiveMenu(null)} className="px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition-colors pb-1.5 underline-offset-[6px]">
                  Medical Records
                </Link>
                <Link to="/insurance" onClick={() => setActiveMenu(null)} className="px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition-colors pb-1.5 underline-offset-[6px]">
                  Insurance & Billing
                </Link>
                <Link to="/patient-portal" onClick={() => setActiveMenu(null)} className="px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition-colors pb-1.5 underline-offset-[6px]">
                  Patient Portal
                </Link>
              </div>
              
              {/* Column 2 - Empty */}
              <div></div>
              
              {/* Column 3 - Medical Image */}
              <div className="flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1739298061768-41a8a7d8b38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xpbmljJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NTcyMzg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Patient Care"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-width dropdown menu - Trust & Confidentiality */}
      {activeMenu === 'trust' && (
        <div className="fixed left-0 right-0 top-[73px] bg-white border-t border-gray-200 shadow-lg z-40">
          <div className="py-8 px-16">
            <div className="grid grid-cols-3 gap-8">
              {/* Column 1 - Menu Items */}
              <div className="flex flex-col gap-2">
                <Link to="/privacy-policy" onClick={() => setActiveMenu(null)} className="px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition-colors pb-1.5 underline-offset-[6px]">
                  Privacy Policy
                </Link>
                <Link to="/data-security" onClick={() => setActiveMenu(null)} className="px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition-colors pb-1.5 underline-offset-[6px]">
                  Data Security
                </Link>
                <Link to="/hipaa-compliance" onClick={() => setActiveMenu(null)} className="px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition-colors pb-1.5 underline-offset-[6px]">
                  HIPAA Compliance
                </Link>
                <Link to="/patient-rights" onClick={() => setActiveMenu(null)} className="px-6 py-3 text-gray-700 hover:text-blue-600 hover:underline transition-colors pb-1.5 underline-offset-[6px]">
                  Patient Rights
                </Link>
              </div>
              
              {/* Column 2 - Empty */}
              <div></div>
              
              {/* Column 3 - Medical Image */}
              <div className="flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1739298061768-41a8a7d8b38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xpbmljJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NTcyMzg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Trust & Confidentiality"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Language Dropdown Menu */}
      {activeMenu === 'language' && (
        <div className="absolute right-4 top-[73px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  setSelectedLanguage(language.code as 'de' | 'en' | 'ru');
                  setActiveMenu(null);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                  selectedLanguage === language.code ? 'bg-gray-100' : ''
                }`}
              >
                <span className="text-2xl">{language.flag}</span>
                <span style={{ fontSize: '16px' }}>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}