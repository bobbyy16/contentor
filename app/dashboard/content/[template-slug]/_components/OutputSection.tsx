import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface Props {
  aiOutput: string;
  error: string | null;
}

function OutputSection({ aiOutput, error }: Props) {
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      editorInstance.setMarkdown(error ? `Error: ${error}` : aiOutput);
    }
  }, [aiOutput, error]);

  const handleCopy = () => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      const markdownContent = editorInstance.getMarkdown();
      navigator.clipboard
        .writeText(markdownContent)
        .then(() => {
          alert("Content copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy text:", err);
        });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border">
      <div className="flex justify-between items-center p-3 sm:p-5">
        <h2 className="text-black font-medium text-base sm:text-lg">
          Your Result
        </h2>
        <Button
          size="sm"
          className="flex items-center gap-2"
          onClick={handleCopy}
        >
          <Copy className="w-4 h-4" /> Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue={
          error ? `Error: ${error}` : "Your result will be displayed here"
        }
        initialEditType="wysiwyg"
        height="calc(100vh - 200px)"
        useCommandShortcut={true}
      />
    </div>
  );
}

export default OutputSection;
