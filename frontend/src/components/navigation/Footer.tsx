import { Link } from "react-router-dom";



const links = [
  { href: "/terms-of-service", label: "Общи условия" },
  { href: "/privacy-policy", label: "Политика за поверителност" },
  { href: "/disclaimer", label: "Отказ от отговорност" },
  { href: "/moderation-policy", label: "Политика за модерация" },
  { href: "/contact", label: "Контакти" },
];



export function Footer() {
  return (
    <footer className="mx-auto bg-gray-900 backdrop-blur-lg bg-transparent rounded-t-xl opacity-90 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-500">
      <div className="flex flex-row justify-center items-start mt-10 gap-4 text-md">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className="text-xs leading-5 text-gray-400 hover:text-teal-300 transition-all duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center border-gray-900/10 lg:mt-10">
        <p className="text-xs leading-5 dark:text-teal-300 text-teal-300 mb-10">
          &copy; 2025 TheDailyBlock. Всички права запазени.
        </p>
      </div>
    </footer>
  );
}
