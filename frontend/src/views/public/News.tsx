// import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import NewsArticle from "../../components/cards/NewsArticle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

export default function News() {
  const [api, setApi] = useState<any>(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [api]);

  return (
    <>
      <header>
        <title>TDB | Блокчейн днес</title>
      </header>
      <div className="h-screen flex flex-col items-start justify-start max-w-7xl w-full rounded-lg p-6 space-y-24">
        <div className="flex flex-col w-1/2 mx-12 justify-start items-start gap-2 bg-transparent backdrop-blur-sm rounded-lg p-6">
          <h1 className="text-xl font-bold text-gray-300 text-left">Вижте последните новини от света на блокчейн технологиите.</h1>
        </div>

        {/* News carousel container */}
        <div className="flex items-center justify-center! w-full h-full max-h-1/2 px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true, // Enable loop for continuous scrolling
            }}
            setApi={setApi}
            className="w-full h-full"
          >
            <CarouselContent className="-ml-4 h-full">
              <CarouselItem className="pl-4 basis-1/3">
                <NewsArticle />
              </CarouselItem>
              <CarouselItem className="pl-4 basis-1/3">
                <NewsArticle />
              </CarouselItem>
              <CarouselItem className="pl-4 basis-1/3">
                <NewsArticle />
              </CarouselItem>
              <CarouselItem className="pl-4 basis-1/3">
                <NewsArticle />
              </CarouselItem>
              <CarouselItem className="pl-4 basis-1/3">
                <NewsArticle />
              </CarouselItem>
              <CarouselItem className="pl-4 basis-1/3">
                <NewsArticle />
              </CarouselItem>
              <CarouselItem className="pl-4 basis-1/3">
                <NewsArticle />
              </CarouselItem>
              <CarouselItem className="pl-4 basis-1/3">
                <NewsArticle />
              </CarouselItem>
              <CarouselItem className="pl-4 basis-1/3">
                <NewsArticle />
              </CarouselItem>
              <CarouselItem className="pl-4 basis-1/3">
                <NewsArticle />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="text-black bg-teal-300! hover:text-gray-700 hover:bg-teal-300! transition-all duration-300" />
            <CarouselNext className="text-black bg-teal-300! hover:text-gray-700 hover:bg-teal-300! transition-all duration-300" />
          </Carousel>
        </div>
      </div>
    </>
  );
}
