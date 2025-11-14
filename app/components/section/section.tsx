import React from "react";
import { Card, CardProps } from "~/components/card/card";

export interface SectionProps {
  title: string;
  cards: CardProps[];
  className?: string;
}

export function Section({ title, cards, className = "" }: SectionProps) {
  return (
    <div className={`flex flex-col gap-6 w-full ${className}`}>
      <div className="px-8">
        <h2 className="font-medium text-[24px] leading-[32px] text-[#181d27]">
          {title}
        </h2>
      </div>
      <div className="flex gap-[18px] items-stretch px-8">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

