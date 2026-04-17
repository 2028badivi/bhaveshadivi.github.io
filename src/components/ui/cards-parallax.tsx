"use client";
import { FC } from "react";

import Image from "next/image";

// Types
export interface iCardItem {
  title: string;
  description: string;
  tag: string;
  src: string;
  link: string;
  color: string;
  textColor: string;
}

interface iCardProps extends Omit<iCardItem, "src" | "link" | "tag"> {
  i: number;
  src: string;
}

// Constants
const TOP_VALUES: Record<number, string> = {
  1: "1/2",
  2: "1/2",
  3: "1/2",
  4: "1/2",
};

// Components
const Card: FC<iCardProps> = ({ title, description, color, textColor, i, src }) => {
  return (
    <div className="h-screen flex items-center justify-center sticky top-0 md:p-0 px-4">
      <div
        className="relative flex flex-col w-[700px] rotate-0 md:w-[600px] mx-auto shadow-md"
        style={{ backgroundColor: color, top: TOP_VALUES[i] ?? undefined }}
      >
        <div className="relative h-[260px] w-full bg-black/10">
          <Image className="w-full h-full object-contain p-10" src={src} alt={title} fill />
        </div>
        <div className="px-10 py-8 md:px-12 md:py-10">
          <div className="font-tiemposHeadline text-4xl md:text-5xl font-black tracking-tight" style={{ color: textColor }}>
            {title}
          </div>
          <div
            className="font-manrope text-base md:text-lg font-medium mt-3 tracking-wide"
            style={{ lineHeight: 1.4, color: textColor }}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * CardSlide component displays a series of cards in a vertical scroll layout
 * Each card contains a title, description, and decorative elements
 */
interface iCardSlideProps {
  items: iCardItem[];
}

const CardsParallax: FC<iCardSlideProps> = ({ items }) => {
  return (
    <div className="min-h-screen">
      {items.map((project, i) => {
        return <Card key={`p_${i}`} {...project} i={i} />;
      })}
    </div>
  );
};

export { CardsParallax };
