"use client";

import React, { useState } from "react";
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/AI_Model";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";

export interface PROPS {
  params: {
    "template-slug": string;
  };
}

interface FormDataType {
  name: string;
  email: string;
  message: string;
  // Add other fields as needed
}

const CreateNewContent = (props: PROPS) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [aiOutput, setAiOutput] = useState<string>("");

  const { user } = useUser();
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === props.params["template-slug"]
  );

  const generateAIContent = async (formData: FormDataType) => {
    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;

    const finalAiPrompt = JSON.stringify(formData) + ", " + selectedPrompt;
    const result = await chatSession.sendMessage(finalAiPrompt);
    const aiResponse = await result?.response.text();
    setAiOutput(aiResponse || "");
    await saveToDB(
      JSON.stringify(formData),
      selectedTemplate?.slug,
      aiResponse
    );
    setLoading(false);
  };

  const saveToDB = async (
    formData: string,
    slug: string | undefined,
    aiResponse?: string
  ) => {
    await db.insert(AIOutput).values({
      formData,
      templateSlug: slug,
      aiResponse,
      createdBy: user?.primaryEmailAddress?.emailAddress || "",
      createdAt: dayjs().format("DD/MM/YYYY"),
    });
  };

  return (
    <>
      <div className="p-10">
        <Link href={"/dashboard"}>
          <Button>
            <ArrowLeft /> Back
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <FormSection
            selectedTemplate={selectedTemplate}
            userFormInput={(v: FormDataType) => generateAIContent(v)}
            loading={loading}
          />
          <div className="col-span-2">
            <OutputSection aiOutput={aiOutput} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewContent;
