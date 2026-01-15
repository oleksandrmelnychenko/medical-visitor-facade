import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 max-w-[1200px] py-3">
        <nav className="flex items-center gap-2" style={{ fontSize: '12px' }}>
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors lowercase">
            home
          </Link>
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-gray-400" />
              {item.href ? (
                <Link to={item.href} className="text-gray-600 hover:text-blue-600 transition-colors lowercase">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 lowercase">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
