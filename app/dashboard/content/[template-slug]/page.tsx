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

// Define a type for the form data
interface FormData {
  [key: string]: string; // Adjust this based on the expected structure of your form data
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
  const { user } = useUser();

  const GenerateAIContent = async (formData: FormData) => {
    setLoading(true);

    try {
      const SelectedPrompt = selectedTemplate?.aiPrompt || "";
      const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;

      const result = await chatSession.sendMessage(FinalAIPrompt);

      const aiResponse = await result.response.text();
      console.log(aiResponse);
      setAiOutput(aiResponse);

      await SaveInDb(formData, selectedTemplate?.slug, aiResponse);
    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
      setLoading(false);
    }
  };

  const SaveInDb = async (formData: FormData, slug: string, aiRes: string) => {
    try {
      const result = await db.insert(AIOutput).values({
        formData: formData,
        templateSlug: slug,
        aiResponse: aiRes,
        createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
        createdAt: moment().format("DD/MM/YYYY"),
      });

      console.log(result);
    } catch (error) {
      console.error("Error saving to DB:", error);
    }
  };

  return (
    <div className="p-10">
      <Link href="/dashboard">
        <Button className="flex items-center gap-2 py-5">
          <ArrowLeft /> Back
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: FormData) => GenerateAIContent(v)}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
