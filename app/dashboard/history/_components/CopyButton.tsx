"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Button
      onClick={handleCopy}
      className={`${
        isCopied ? "bg-gray-800 text-white" : "bg-primary text-white"
      } transform transition-transform duration-200 hover:scale-105`}
    >
      {isCopied ? "Copied!" : "Copy"}
    </Button>
  );
};

export default CopyButton;
