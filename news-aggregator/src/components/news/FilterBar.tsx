import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface FilterBarProps {
  sources: { id: string; name: string }[];
  keyword: string;
  setKeyword: (val: string) => void;
  source: string;
  setSource: (val: string) => void;
}

export function FilterBar({
  sources,
  keyword,
  setKeyword,
  source,
  setSource,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm border">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <Input
          placeholder="Search news in title..."
          className="pl-9"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="w-full sm:w-[250px]">
        <Select value={source} onValueChange={setSource}>
          <SelectTrigger>
            <SelectValue placeholder="All Allowed Sources" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Allowed Sources</SelectItem>
            {sources.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
