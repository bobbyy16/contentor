import React from "react";
import Image from "next/image";
import { TEMPLATE } from "./TemplateListSection";

interface TemplateCardProps {
  item: TEMPLATE;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ item }) => {
  return (
    <div className="p-5 shadow-md rounded-md border bg-white flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all">
      <Image src={item.icon} alt="icon" width={50} height={50} />
      <h2 className="font-medium text-lg">{item.name}</h2>
      <p className="text-gray-500 line-clamp-2">{item.desc}</p>
    </div>
  );
};

export default TemplateCard;
