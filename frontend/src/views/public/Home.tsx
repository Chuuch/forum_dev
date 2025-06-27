import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

import arbitrum from "/arbitrum.svg";
import binance from "/binance.png";
import certora from "/certora.svg";
import code4rena from "/code4rena.png";
import cyfrin from "/cyfrin.svg";
import immunefy from "/immunefi.png";
import MetaMask_Fox from "/MetaMask_Fox.svg.png";
import OpenZeppelin from "/OpenZeppelin.svg";
import Optimism from "/Optimism.png";
import polkadot from "/polka.svg";
import Polygon from "/Polygon_Icon.svg.png";
import sherlock from "/sherlock.svg";
import solana from "/solana.png";
import trail from "/trail.svg";

const logos = [
  {
    name: "Arbitrum",
    image: arbitrum,
    width: 200,
    height: 200,
    link: "https://arbitrum.io/",
  },
  {
    name: "Binance",
    image: binance,
    width: 200,
    height: 200,
    link: "https://www.binance.com/",
  },
  {
    name: "Certora",
    image: certora,
    width: 200,
    height: 200,
    link: "https://www.certora.com/",
  },
  {
    name: "Cyfrin",
    image: cyfrin,
    width: 200,
    height: 200,
    link: "https://www.cyfrin.com/",
  },
  {
    name: "Immunefy",
    image: immunefy,
    width: 300,
    height: 300,
    link: "https://immunefi.com/",
  },
  {
    name: "MetaMask Fox",
    image: MetaMask_Fox,
    width: 100,
    height: 100,
    link: "https://metamask.io/",
  },
  {
    name: "OpenZeppelin",
    image: OpenZeppelin,
    width: 150,
    height: 150,
    link: "https://www.openzeppelin.com/",
  },
  {
    name: "Optimism",
    image: Optimism,
    width: 80,
    height: 80,
    link: "https://www.optimism.io/",
  },
  {
    name: "Polkadot",
    image: polkadot,
    width: 200,
    height: 100,
    link: "https://www.polkadot.com/",
  },
  {
    name: "Polygon",
    image: Polygon,
    width: 100,
    height: 100,
    link: "https://www.polygon.technology/",
  },
  {
    name: "Sherlock",
    image: sherlock,
    width: 400,
    height: 100,
    link: "https://www.sherlock.xyz/",
    },
  {
    name: "Code4rena",
    image: code4rena,
    width: 100,
    height: 100,
    link: "https://www.code4rena.com/",
  },
  {
    name: "Solana",
    image: solana,
    width: 100,
    height: 100,
    link: "https://www.solana.com/",
  },
  {
    name: "Trail",
    image: trail,
    width: 200,
    height: 100,
    link: "https://www.trail.xyz/",
  },

]

const firstRowLogos = logos.slice(0, Math.ceil(logos.length / 2));
const secondRowLogos = logos.slice(Math.ceil(logos.length / 2));

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
          </motion.div>
        </div>
        <div className="flex flex-col items-start justify-start self-start rounded-3xl bg-transparent backdrop-blur-lg w-5/6 h-full">
          {/* First row: left to right */}
          <div className="relative overflow-hidden w-full mb-4 h-40 flex items-center">
            <div className="flex animate-scroll-left items-center h-full p-10">
              {[...firstRowLogos, ...firstRowLogos].map((logo, index) => (
                <img
                  key={`row1-${index}`}
                  src={logo.image}
                  alt={logo.name}
                  className="object-contain cursor-pointer opacity-90 hover:opacity-100 mx-6 flex items-center justify-center"
                  style={{ width: logo.width, height: logo.height }}
                  onClick={() => window.open(logo.link, '_blank')}
                />
              ))}
            </div>
          </div>
          {/* Second row: right to left */}
          <div className="relative overflow-hidden w-full">
            <div className="flex animate-scroll-right p-10">
              {[...secondRowLogos, ...secondRowLogos].map((logo, index) => (
                <img
                  key={`row2-${index}`}
                  src={logo.image}
                  alt={logo.name}
                  className="object-contain cursor-pointer opacity-90 hover:opacity-100 mx-6 flex items-center justify-center"
                  style={{ width: logo.width, height: logo.height }}
                  onClick={() => window.open(logo.link, '_blank')}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
