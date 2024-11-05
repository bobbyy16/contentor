import { Search } from "lucide-react";
import React from "react";

interface PROPS {
  onSearchInput: (value: string) => void;
}

const SearchSection = ({ onSearchInput }: PROPS) => {
  return (
    <div
      className="p-10 bg-gradient-to-br from-black via-gray-800 to-gray-900 
    text-white flex flex-col justify-center items-center"
    >
      <h2 className="text-3xl font-bold">Browse All Templates</h2>
      <p>What would you like to create today?</p>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center p-2 border rounded-md bg-white text-primary my-5">
          <Search className="text-primary" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full"
            onChange={(e) => {
              onSearchInput(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
