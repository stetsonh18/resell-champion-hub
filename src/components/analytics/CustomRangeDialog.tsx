import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { DateRange } from "./types";
import { startOfDay, endOfDay, subDays } from "date-fns";

type CustomRangeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRangeSelect: (current: DateRange, previous: DateRange) => void;
};

export const CustomRangeDialog = ({ 
  open, 
  onOpenChange, 
  onRangeSelect 
}: CustomRangeDialogProps) => {
  const [selectedRange, setSelectedRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(),
    to: new Date(),
  });

  const handleRangeSelect = (range: { from: Date; to: Date }) => {
    const currentRange = {
      from: startOfDay(range.from),
      to: endOfDay(range.to)
    };
    
    const daysDiff = Math.floor((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24));
    
    const previousRange = {
      from: startOfDay(subDays(range.from, daysDiff)),
      to: endOfDay(range.from)
    };

    onRangeSelect(currentRange, previousRange);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-fit p-0 gap-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Select custom date range</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={(range) => {
              if (range?.from && range?.to) {
                setSelectedRange({ from: range.from, to: range.to });
                handleRangeSelect({ from: range.from, to: range.to });
              }
            }}
            numberOfMonths={2}
            className="rounded-md border"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};