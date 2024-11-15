import Template from "@/app/(data)/Templates";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";
import CopyButton from "./_components/CopyButton";

export interface HISTORY {
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
      <div className="m-2 sm:m-5 p-4 sm:p-5 border rounded-lg bg-white">
        <p className="text-center">Please sign in to view your history.</p>
      </div>
    );
  }

  const HistoryList: HISTORY[] = await db
    .select()
    .from(AIOutput)
    .where(eq(AIOutput.createdBy, user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(AIOutput.createdAt))
    .then((results) =>
      results.map((item) => ({
        id: item.id,
        formData: item.formData,
        aiResponse: item.aiResponse || "",
        templateSlug: item.templateSlug,
        createdBy: item.createdBy,
        createdAt: item.createdAt || "",
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
    <div className="m-2 sm:m-5 p-4 sm:p-5 border rounded-lg bg-white">
      <div className="mb-4 sm:mb-6">
        <h2 className="font-bold text-2xl sm:text-3xl">History</h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Search your previously generated AI content history
        </p>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
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
                      {item.createdAt ? item.createdAt : "Unknown date"}
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

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {HistoryList.length > 0 ? (
          HistoryList.map((item: HISTORY) => {
            const { name, icon } = GetTemplateData(item.templateSlug);
            return (
              <div
                key={item.id}
                className="border rounded-lg p-4 space-y-3 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={icon}
                      width={20}
                      height={20}
                      alt={name}
                      className="flex-shrink-0"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {name}
                    </span>
                  </div>
                  <CopyButton textToCopy={item.aiResponse || ""} />
                </div>

                <div className="text-sm text-gray-900 line-clamp-2">
                  {item.aiResponse}
                </div>

                <div className="text-xs text-gray-500">
                  {item.createdAt ? item.createdAt : "Unknown date"}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-4">
            No history found for your account.
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
