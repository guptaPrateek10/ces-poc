"use client";

import React from "react";
import { HIGHTOLOW, LOWTOHIGH, RESET } from "../utils/constants";

type SortDropdownProps = {
  onSortChange: (value: string) => void;
};

const SortDropdown = ({ onSortChange }: SortDropdownProps) => {
  return (
    <>
      <select
        data-testid="sort-dropdown"
        onChange={(e) => onSortChange(e.target.value)}
        defaultValue=""
        name="sortByPrice"
        className="p-2 border rounded bg-gray-700 text-sm text-white border-none "
      >
        <option value="" disabled  hidden>
         Sort by price
        </option>
        <option value={HIGHTOLOW}>Price: High to Low</option>
        <option value={LOWTOHIGH}>Price: Low to High</option>
        <option value={RESET}>Reset</option>
      </select>
    </>
  );
};

export default SortDropdown;
