import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <header>
        <title>TDB | Начало</title>
      </header>
      <div className="flex flex-col items-center justify-center bg-transparent text-white py-40 relative scrollbar-custom">
        <div className="px-4 sm:px-6 lg:px-8 z-10 lg:flex items-center">
          <motion.div
            className="lg:text-left space-y-4 left-50 mb-50 max-w-3xl lg:ml-[800px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-sky-400 ">
              <span className="text-teal-400 text-8xl">The Daily Block</span><br />
              Българският форум <br /> за{" "}
              <span className="text-purple-400">Блокчейн</span> и{" "}
              <span className="text-pink-400">Уеб 3 </span> технологии.
            </h1>
            <p className="text-lg dark:text-gray-300 text-gray-400 ">
              Потопете се в света на{" "}
              <span className="text-teal-300 font-semibold">
                децентрализираните технологии
              </span>
              , където иновациите срещат сигурността. Бъдете в крак с най-новите
              тендеции в
              <span className="text-blue-300 font-semibold">
                {" "}
                блокчейн протоколите
              </span>
              , смарт контрактите и
              <span className="text-purple-300 font-semibold">
                {" "}
                софтуерното инженерство
              </span>
              .
            </p>
            <p className="mt-2 text-md text-gray-400/80 dark:text-gray-300 italic">
              Независимо дали сте програмист, инвеститор или просто любопитен -
              вие сте на правилното място.
            </p>
            <div className="flex justify-center items-center">
            <Button
              variant="default"
              size="lg"
              className="bg-gray-200 hover:bg-gray-100 text-white font-bold text-lg rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <Link to="/about" className="flex items-center gap-2 text-slate-900">
                Научи повече
                <GraduationCap size={16} />
              </Link>
            </Button>
            </div>

            {/* DailyBlock Logo */}
          </motion.div>

        </div>
      </div>
    </>
  );
}
