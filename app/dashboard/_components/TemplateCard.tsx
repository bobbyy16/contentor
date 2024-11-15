import React from "react";
import Image from "next/image";
import { TEMPLATE } from "./TemplateListSection";
import Link from "next/link";

interface TemplateCardProps {
  item: TEMPLATE;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ item }) => {
  return (
    <Link href={"/dashboard/content/" + item?.slug}>
      <div className="p-3 shadow-md rounded-md border bg-white flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all">
        <Image src={item.icon} alt="icon" width={50} height={50} />
        <h3 className="font-medium text-lg line-clamp-1">{item.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-1 md:line-clamp-2">
          {item.desc}
        </p>
      </div>
    </Link>
  );
};

export default TemplateCard;
