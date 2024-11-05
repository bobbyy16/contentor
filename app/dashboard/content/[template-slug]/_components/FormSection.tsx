"use client";
import { TEMPLATE } from "@/app/dashboard/_components/TemplateListSection";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface PROPS {
  selectedTemplate?: TEMPLATE | undefined;
  userFormInput?: (data: { [key: string]: string }) => void;
  loading: boolean;
}

const FormSection = ({ selectedTemplate, userFormInput, loading }: PROPS) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userFormInput?.(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="p-5 shadow-md border rounded-lg bg-white">
        {/* @ts-expect-error */}
        <Image src={selectedTemplate?.icon} alt="icon" width={70} height={70} />
        <br />
        <h1 className="font-bold text-2xl mb-2 text-primary">
          {selectedTemplate?.name}
        </h1>
        <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>

        <form action="" className="mt-6" onSubmit={onSubmit}>
          {selectedTemplate?.form?.map((item) => (
            <div className="my-2 flex flex-col gap-2 mb-7" key={item.name}>
              <label htmlFor={item.name} className="font-bold">
                {item.label}
              </label>
              {item.field === "input" ? (
                <Input
                  name={item.name}
                  required={item?.required}
                  onChange={handleInputChange}
                />
              ) : item.field === "textarea" ? (
                <Textarea
                  name={item.name}
                  required={item?.required}
                  onChange={handleInputChange}
                />
              ) : null}
            </div>
          ))}
          <Button type="submit" className="w-full py-4" disabled={loading}>
            {loading && <Loader2Icon className="animate-spin" />}
            Generate content
          </Button>
        </form>
      </div>
    </>
  );
};

export default FormSection;
