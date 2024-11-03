"use client";
import { TEMPLATE } from "@/app/dashboard/_components/TemplateListSection";
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PROPS {
  selectedTemplate?: TEMPLATE | undefined;
  userFormInput?: any;
}

const FormSection = ({ selectedTemplate, userFormInput }: PROPS) => {
  const [formData, setFormData] = useState<any>();

  const onSubmit = (e: any) => {
    e.preventDefault();
    userFormInput(formData);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="p-5 shadow-md border rounded-lg bg-white">
        {/* @ts-ignore */}
        <Image src={selectedTemplate?.icon} alt="icon" width={70} height={70} />
        <br />
        <h1 className="font-bold text-2xl mb-2 text-primary">
          {selectedTemplate?.name}
        </h1>
        <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>

        <form action="" className="mt-6" onSubmit={onSubmit}>
          {selectedTemplate?.form?.map((item, index) => (
            <div className="my-2 flex flex-col gap-2 mb-7">
              <label htmlFor="" className="font-bold">
                {item.label}
              </label>
              {item.field == "input" ? (
                <Input
                  name={item.name}
                  required={item?.required}
                  onChange={handleInputChange}
                />
              ) : item.field == "textarea" ? (
                <Textarea
                  name={item.name}
                  required={item?.required}
                  onChange={handleInputChange}
                />
              ) : null}
            </div>
          ))}
          <button type="submit" className="w-full py-4 bg-primary text-white">
            Generate content
          </button>
        </form>
      </div>
    </>
  );
};

export default FormSection;
