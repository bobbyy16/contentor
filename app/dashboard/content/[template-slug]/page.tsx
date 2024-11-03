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

export interface PROPS {
  params: {
    "template-slug": string;
  };
}

const CreateNewContent = (props: PROPS) => {
  const [loading, setLoading] = useState<any>(false);
  const [aiOutput, setAiOutput] = useState<string>("");

  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == props.params["template-slug"]
  );
  const generateAIContent = async (FormData: any) => {
    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;

    const finalAiPrompt = JSON.stringify(FormData) + ", " + selectedPrompt;
    const result = await chatSession.sendMessage(finalAiPrompt);
    // console.log(result.response.text());
    setAiOutput(result?.response.text());
    setLoading(false);
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
            userFormInput={(v: any) => generateAIContent(v)}
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
