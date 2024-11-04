import Template from "@/app/(data)/Templates";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";
import CopyButton from "./_components/CopyButton";

export interface HISTORY {
  forEach(arg0: (element: { aiResponse: string | any[] }) => void): unknown;
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

// export const LOCAL_TEMPLATE = [
//   { slug: "template1", name: "Template 1", icon: "/icon1.png" },
//   { slug: "template2", name: "Template 2", icon: "/icon2.png" },
// ];

async function History() {
  const user = await currentUser();

  if (!user?.primaryEmailAddress?.emailAddress) {
    return (
      <div className="m-5 p-5 border rounded-lg bg-white">
        <p className="text-center">Please sign in to view your history.</p>
      </div>
    );
  }

  const HistoryList: HISTORY[] = await db
    .select()
    .from(AIOutput)
    .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress))
    .orderBy(desc(AIOutput.createdAt))
    .then((results) =>
      results.map((item) => ({
        id: item.id,
        formData: item.formData,
        aiResponse: item.aiResponse || "",
        templateSlug: item.templateSlug,
        createdBy: item.createdBy,
        createdAt: item.createdAt || new Date().toISOString(),
      }))
    );

  const GetTemplateData = (slug: string) => {
    const template = Template.find((item) => item.slug === slug);
    return {
      name: template?.name || "Unknown Template",
      icon: template?.icon || "/default-icon.png",
    };
  };

  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">
        Search your previously generated AI content history
      </p>
      <div className="grid grid-cols-7 font-bold bg-secondary mt-5 py-3">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2">AI RESPONSE</h2>
        <h2>DATE</h2>
        <h2>WORDS</h2>
        <h2>COPY</h2>
      </div>

      {HistoryList.length > 0 ? (
        HistoryList.map((item: HISTORY) => {
          const { name, icon } = GetTemplateData(item.templateSlug);
          return (
            <div
              key={item.id}
              className="grid grid-cols-7 my-5 py-3 px-3 border-b"
            >
              <h2 className="col-span-2 flex gap-2 items-center">
                <Image src={icon} width={25} height={25} alt={name} />
                {name}
              </h2>
              <h2 className="col-span-2 line-clamp-3">{item.aiResponse}</h2>
              <h2>
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "Unknown date"}
              </h2>
              <h2>{(item.aiResponse || "").split(" ").length}</h2>
              <h2>
                <CopyButton textToCopy={item.aiResponse || ""} />
              </h2>
            </div>
          );
        })
      ) : (
        <p className="text-center mt-5">No history found for your account.</p>
      )}
    </div>
  );
}

export default History;
