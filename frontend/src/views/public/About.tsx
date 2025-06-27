import ProfileCard from "@/components/cards/ProfileCard";
import { motion } from "framer-motion";
import { GlobeLock } from "lucide-react";
import { FaLink } from "react-icons/fa";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <>
      <header>
        <title>TDB | За нас</title>
      </header>
      <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-5xl w-full mx-auto py-12 px-6 text-gray-300 bg-transparent backdrop-blur-lg rounded-lg p-6"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">За нас</h1>
        <p className="text-lg mb-6 text-gray-500">
          Добре дошли в{" "}
          <span className="text-primary font-semibold">TheDailyBlock</span> –
          вашето пространство за блокчейн иновации, софтуерно развитие и
          децентрализирани технологии. Ние сме общност от разработчици,
          инвеститори и ентусиасти, обединени от страстта към Web3 и бъдещето на
          дигиталния свят.
        </p>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-teal-400 mt-8 mb-2">
          <GlobeLock /> Нашата мисия
        </h2>
        <p className="mb-6 text-gray-500">
          Вярваме, че децентрализацията е бъдещето на интернет. Нашата цел е да
          предоставим качествено съдържание, технически анализи и дискусии за
          смарт контракти, DeFi, NFT, криптография и блокчейн архитектури.
        </p>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-pink-400 mt-8 mb-2">
          <IoIosHelpCircleOutline size={30} /> Какво ще намерите тук?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-500">
          <li>
            🔹 <span className="font-bold">Ръководства и уроци</span> за
            блокчейн и Web3 разработка
          </li>
          <li>
            🔹 <span className="font-bold">Последни новини</span> за крипто и
            децентрализирани технологии
          </li>
          <li>
            🔹 <span className="font-bold">Дискусии</span> за DeFi, NFT, Layer 2
            решения и сигурност
          </li>
          <li>
            🔹 <span className="font-bold">Професионални съвети</span> от опитни
            разработчици
          </li>
          <li>
            🔹 <span className="font-bold">Отворени позиции и проекти</span> в
            света на Web3
          </li>
        </ul>
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-purple-400 mt-8 mb-2">
          <FaLink /> Свържете се с нас
        </h2>
        <p className="text-gray-500">
          Искате да станете част от нашата общност? Присъединете се към нас в
          социалните мрежи или ни пишете на
          <Link
            to="mailto:support@yourforum.com"
            className="text-primary hover:underline"
          >
            {" "}
            support@dailyblock.com
          </Link>
          .
        </p>
        </motion.div>
        <div className="flex flex-col justify-start items-start mt-12">
          
            <ProfileCard />
          </div>
      </div>
    </>
  );
}
