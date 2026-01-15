import { Activity, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Impressum */}
          <div>
            <h3 className="text-white mb-4">Impressum</h3>
            <div className="text-sm space-y-2">
              <p className="text-white">Agentur für Patientenbetreuung Heorhii Hudiiev</p>
              <p>Inhaber: Heorhii Hudiiev</p>
              <p className="mt-3">Albert-Schweitzer-Straße 56</p>
              <p>81735 München</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:contact@gmed-health.com" className="hover:text-blue-400 transition-colors">
                  contact@gmed-health.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Activity className="w-4 h-4 flex-shrink-0" />
                <a href="https://www.gmed-health.com" className="hover:text-blue-400 transition-colors">
                  www.gmed-health.com
                </a>
              </li>
            </ul>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="text-white mb-4">Umsatzsteueridentifikationsnummer</h3>
            <p className="text-sm mb-4">gemäß § 27 a Umsatzsteuergesetz:</p>
            <p className="text-sm text-white mb-6">147/220/51409</p>
            <p className="text-sm">
              Bei Fragen und Anregungen zum Inhalt der Website schicken Sie uns bitte eine E-Mail an:{" "}
              <a href="mailto:contact@gmed-health.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                contact@gmed-health.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-center">
          <p>© 2023 Agentur für Patientenbetreuung Heorhii Hudiiev</p>
        </div>
      </div>
    </footer>
  );
}