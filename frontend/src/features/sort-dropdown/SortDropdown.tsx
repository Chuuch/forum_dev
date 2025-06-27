import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SortDropdown({ selected, onSelect }: { selected: string; onSelect: (sort: string) => void }) {
    return (
      <Select
        value={selected}
        onValueChange={(value) => onSelect(value)}
      >
        <SelectTrigger className="bg-white dark:bg-transparent dark:backdrop-blur-lg rounded-lg">
            <SelectValue placeholder="Сортиране" />
        </SelectTrigger>
        <SelectContent className="dark:bg-transparent dark:backdrop-blur-lg">
        <SelectItem value="newest" className=" dark:hover:bg-gray-900/80">Най-нови</SelectItem>
        <SelectItem value="popular" className=" dark:hover:bg-gray-900/80">Най-популярни</SelectItem>
        <SelectItem value="commented" className="dark:hover:bg-gray-900/80">Най-коментирани</SelectItem>
      </SelectContent>
      </Select>
    );
  }