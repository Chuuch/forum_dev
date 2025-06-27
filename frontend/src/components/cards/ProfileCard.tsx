import cyber from "@/assets/cyber.png";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaMasksTheater, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/chuchulev/",
    icon: FaInstagram,
    color: "#E1306C",
    darkColor: "#E1306C",
  },
  {
    name: "Twitter",
    href: "https://x.com/0xW3bster",
    icon: FaXTwitter,
    color: "#000000",
    darkColor: "#f9f9f9",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-chuchulev/",
    icon: FaLinkedin,
    color: "#0077B5",
    darkColor: "#0077B5",
  },
  {
    name: "Github",
    href: "https://github.com/chuuch",
    icon: FaGithub,
    color: "#181717",
    darkColor: "#f9f9f9",
  },
];

export default function ProfileCard() {
  return (
    <Card className="max-w-full w-full mx-auto shadow-md dark:bg-transparent backdrop-blur-lg rounded-lg p-6">
      <CardHeader>
      <h1 className="flex text-gray-300 text-2xl font-semibold w-full gap-2">
            <FaMasksTheater size={28} className="text-teal-300"/>
            Кой стои зад завесите?
          </h1>
      </CardHeader>
      <CardContent className="p-4 flex gap-6 items-center">
        {/* Profile Image */}
        <div className="w-64">
          <img
            src={cyber}
            alt="Profile"
            className="w-full h-full rounded-xl object-contain"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-300">Даниел Чучулев</h2>
          <p className="text-sm text-muted-foreground">
            Одитор | Фулстак Програмист
          </p>
          <p className="mt-2 text-sm text-gray-300 italic">
            Прогресът не е резултат от късмет или щастлива случайност, а от
            усилията полагани всекидневно.
          </p>
          <div className="flex gap-2 my-2">
            {socials.map((social, index) => {
              const Icon = social.icon;
              const color = useTheme().theme === "dark" ? social.darkColor! : social.color;
              return (
                <Link
                  key={index}
                  to={social.href}
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-primary transition-colors text-xl"
                >
                  <Icon style={{ color: color }} />
                </Link>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
