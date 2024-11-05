import Template from "@/app/(data)/Templates";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";
import CopyButton from "./_components/CopyButton";

export interface HISTORY {
  // forEach(arg0: (element: { aiResponse: string | any[] }) => void): unknown;
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

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
      <div className="mb-6">
        <h2 className="font-bold text-3xl">History</h2>
        <p className="text-gray-500">
          Search your previously generated AI content history
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Template
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AI Response
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Copy
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {HistoryList.length > 0 ? (
              HistoryList.map((item: HISTORY) => {
                const { name, icon } = GetTemplateData(item.templateSlug);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Image
                          src={icon}
                          width={25}
                          height={25}
                          alt={name}
                          className="flex-shrink-0"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-3">
                        {item.aiResponse}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "Unknown date"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <CopyButton textToCopy={item.aiResponse || ""} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No history found for your account.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
