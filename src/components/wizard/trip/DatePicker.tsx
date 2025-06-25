
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date: string;
  onSelect: (date: Date | undefined) => void;
  placeholder: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ date, onSelect, placeholder }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(new Date(date), "PPP") : <span>{placeholder}</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0 z-[99999]">
      <Calendar mode="single" selected={date ? new Date(date) : undefined} onSelect={onSelect} initialFocus />
    </PopoverContent>
  </Popover>
);
