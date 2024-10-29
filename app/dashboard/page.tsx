"use client";

import React, { useState } from "react";
import SearchSection from "./_components/SearchSection";
import TemplateListSection from "./_components/TemplateListSection";

const Dashboard = () => {
  const [userSearchInput, setUserSearchInput] = useState<string>("");

  const handleSearch = (value: string) => {
    setUserSearchInput(value);
  };
  return (
    <>
      <div>
        {/* searchSection */}
        <SearchSection onSearchInput={handleSearch} />
        {/* TemplateList */}
        <TemplateListSection userSearchInput={userSearchInput} />
      </div>
    </>
  );
};

export default Dashboard;
