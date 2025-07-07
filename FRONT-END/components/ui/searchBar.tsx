import { SearchIcon, Filter } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  placeholder: string;
  onSearch: (searchTerm: string, roleFilter: string) => void;
  enableToggleFilter?: boolean;
  roleFilterOptions?: {
    value: string;
    label: string;
  }[];
}

export default function SearchBar({
  placeholder,
  onSearch,
  enableToggleFilter = true,
  roleFilterOptions = [],
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(
    roleFilterOptions.length > 0 ? roleFilterOptions[0].value : null
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value, roleFilter || roleFilterOptions[0].value);
  };

  const toggleRoleFilter = () => {
    const currentIndex = roleFilterOptions.findIndex(
      (option) => option.value === roleFilter
    );
    const nextIndex = (currentIndex + 1) % roleFilterOptions.length;
    setRoleFilter(roleFilterOptions[nextIndex].value);
    onSearch(
      searchTerm,
      roleFilterOptions[nextIndex].value
    );
  };

  return (
    <div className="flex items-center gap-2">
      {enableToggleFilter && (
        <div
          className="p-2 cursor-pointer rounded-full hover:bg-gray-200"
          onClick={toggleRoleFilter}
        >
          {roleFilter !== null && (
            <Filter className={roleFilter !== roleFilterOptions[0].value ? "text-blue-500" : ""} />
          )}
        </div>
      )}
      <div className="bg-white rounded-full flex items-center gap-2 px-4 py-2 text-black outline-none">
        <SearchIcon />
        <input
          type="text"
          placeholder={placeholder}
          className="outline-none"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      {roleFilter !== null && roleFilter !== roleFilterOptions[0]?.value && enableToggleFilter && (
        <div className="font-bold text-blue-500">
          فلترة: {roleFilterOptions.find((option) => option.value === roleFilter)?.label}
        </div>
      )}
    </div>
  );
}

