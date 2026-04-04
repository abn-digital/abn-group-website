"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  tag: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items?: Gallery4Item[];
}

const ABN_CASES: Gallery4Item[] = [
  {
    id: "retail-media",
    title: "Retail Media a escala para Cencosud",
    description:
      "Diseñamos e implementamos la estrategia de Retail Media para sus marcas en Argentina y Chile, logrando un ROAS promedio de 8x y reduciendo el CPA un 40% en 6 meses.",
    href: "#contact",
    tag: "ABN Digital",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "ai-bidding",
    title: "Predictive Bidding con IA para e-commerce",
    description:
      "Desarrollamos un sistema de bidding predictivo sobre Google Ads con modelos de ML en BigQuery. El cliente redujo su inversión un 22% manteniendo el mismo volumen de conversiones.",
    href: "#contact",
    tag: "Hike",
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "data-pipelines",
    title: "Automatización de +200 reportes con Detrics",
    description:
      "Una agencia con 80 clientes PPC eliminó 3 días de trabajo manual por mes al conectar Meta, Google y TikTok Ads a Looker Studio de forma automática vía Detrics.",
    href: "https://detrics.io",
    tag: "Detrics",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "programmatic",
    title: "Programmatic Display para lanzamiento en LATAM",
    description:
      "Gestionamos el lanzamiento regional de una fintech global en 6 países usando Programmatic Display y DMP propio, alcanzando 14M de impresiones segmentadas en 3 semanas.",
    href: "#contact",
    tag: "ABN Digital",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "cloud-automation",
    title: "Migración a Google Cloud y automatización de ops",
    description:
      "Hike lideró la migración del stack de marketing tech de un retailer a Google Cloud, conectando GA4, BigQuery y Looker en un sistema de inteligencia unificada de tiempo real.",
    href: "https://hikethecloud.com",
    tag: "Hike",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const tagColors: Record<string, string> = {
  "ABN Digital": "#ff3b3b",
  "Hike": "#007aff",
  "Detrics": "#af52de",
};

const Gallery4 = ({
  title = "Casos de Éxito",
  description = "Resultados reales de clientes reales. Así se ve el crecimiento cuando Marketing, Data y Tecnología trabajan como uno solo.",
  items = ABN_CASES,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => { carouselApi.off("select", updateSelection); };
  }, [carouselApi]);

  return (
    <section
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
        paddingBottom: "5rem",
      }}
    >
      <div className="container mx-auto" style={{ paddingTop: "5rem" }}>
        <div className="mb-8 flex items-end justify-between md:mb-14">
          <div className="flex flex-col gap-4">
            <HoverBorderGradient
              as="div"
              duration={3}
              containerClassName="cursor-default reveal"
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 px-3 py-1.5"
            >
              Casos de Éxito
            </HoverBorderGradient>
            <h2
              style={{
                fontFamily: "var(--font-spartan)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "white",
                lineHeight: 1.1,
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.7,
                maxWidth: "480px",
              }}
            >
              {description}
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": { dragFree: true },
            },
          }}
        >
          <CarouselContent
            className="ml-0"
            style={{ paddingLeft: "max(2rem, calc(50vw - 700px))" }}
          >
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[400px]"
              >
                <a href={item.href} className="group block rounded-2xl">
                  <div className="relative h-full min-h-[27rem] w-full overflow-hidden rounded-2xl md:aspect-[5/4] lg:aspect-[16/9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 md:p-8">
                      {/* Tag badge */}
                      <span
                        className="mb-3 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                        style={{
                          color: tagColors[item.tag] ?? "white",
                          borderColor: `${tagColors[item.tag] ?? "white"}40`,
                          background: `${tagColors[item.tag] ?? "white"}10`,
                        }}
                      >
                        {item.tag}
                      </span>
                      <div className="mb-2 text-lg font-bold text-white leading-tight md:text-xl">
                        {item.title}
                      </div>
                      <div className="mb-6 text-sm text-white/60 line-clamp-2 leading-relaxed">
                        {item.description}
                      </div>
                      <div className="flex items-center text-xs font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors duration-300">
                        Ver caso{" "}
                        <ArrowRight className="ml-2 size-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: currentSlide === index ? "2rem" : "0.5rem",
                background: currentSlide === index ? "#ff3b3b" : "rgba(255,255,255,0.15)",
              }}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
