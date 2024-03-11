import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const SortBy = searchParams.get("SortBy") || "";

  const handleChange = e => {
    searchParams.set("SortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      type='white'
      value={SortBy}
      onChange={handleChange}
    />
  );
};

export default SortBy;
