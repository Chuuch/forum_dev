import { Input } from "@/components/ui/input";

// TODO: Add search functionality

type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
  };
  
  export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
         <Input
        className="w-96 border rounded-xl bg-white px-2 py-4"
        type="text"
        placeholder="Търси постове..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }