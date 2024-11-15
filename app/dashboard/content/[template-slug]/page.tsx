"use client";

import React, { useState } from "react";
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Template from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AI_Model";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

interface FormData {
  [key: string]: string;
}

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Template?.find(
    (item) => item.slug === props.params["template-slug"]
  );

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const GenerateAIContent = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      if (!selectedTemplate?.slug) {
        console.error("Template slug is missing.");
        setError("Template slug is missing.");
        setLoading(false);
        return;
      }

      const SelectedPrompt = selectedTemplate?.aiPrompt || "";
      const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;

      const result = await chatSession.sendMessage(FinalAIPrompt);
      const aiResponse = await result.response.text();

      setAiOutput(aiResponse);
      await SaveInDb(formData, selectedTemplate.slug, aiResponse);
    } catch (error) {
      console.error("Error generating AI content:", error);
      setError(
        "There was an issue generating content. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const SaveInDb = async (formData: FormData, slug: string, aiRes: string) => {
    try {
      const result = await db.insert(AIOutput).values({
        formData: JSON.stringify(formData),
        templateSlug: slug,
        aiResponse: aiRes,
        createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
        createdAt: moment().format("DD/MM/YYYY"),
      });

      console.log(result);
    } catch (error) {
      console.error("Error saving to DB:", error);
      setError("Error saving to the database. Please try again later.");
    }
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button className="flex items-center gap-2 py-3 md:py-5 w-full md:w-auto justify-center md:justify-start">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
        <div className="w-full md:sticky md:top-4 md:h-fit">
          <FormSection
            selectedTemplate={selectedTemplate}
            userFormInput={(v: FormData) => GenerateAIContent(v)}
            loading={loading}
          />
        </div>

        <div className="w-full md:col-span-2">
          <OutputSection aiOutput={aiOutput} error={error} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
