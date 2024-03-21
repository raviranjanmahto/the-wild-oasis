import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";
import styled from "styled-components";
import AddGuest from "./addGuest";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.6rem 0.6rem;
  box-shadow: var(--shadow-sm);
`;

const GuestTableOperations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedSearch = useRef(null);

  const handleSearchChange = e => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debouncedSearch.current) {
      clearTimeout(debouncedSearch.current);
    }

    debouncedSearch.current = setTimeout(() => {
      searchParams.set("search", value);
      setSearchParams(searchParams);
    }, 600); // Adjust the delay as needed (e.g., 600ms)
  };

  return (
    <TableOperations>
      <AddGuest />
      <Input
        type='text'
        id='search'
        placeholder='Search by fullName...'
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <SortBy
        options={[
          { value: "id-desc", label: "Sort by recent" },
          { value: "id-asc", label: "Sort by earlier" },
          { value: "fullName-asc", label: "Sort by name (A-Z)" },
          { value: "fullName-desc", label: "Sort by name (Z-A)" },
        ]}
      />
    </TableOperations>
  );
};

export default GuestTableOperations;
