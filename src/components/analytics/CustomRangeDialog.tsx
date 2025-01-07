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
    to: Date | undefined;
  }>({
    from: new Date(),
    to: undefined,
  });

  const handleRangeSelect = (range: { from: Date; to: Date | undefined }) => {
    if (range.from && range.to) {
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
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select custom date range</DialogTitle>
        </DialogHeader>
        <Calendar
          mode="range"
          selected={selectedRange}
          onSelect={(range) => {
            if (range) {
              setSelectedRange(range);
              if (range.from && range.to) {
                handleRangeSelect(range);
              }
            }
          }}
          numberOfMonths={2}
          className="rounded-md border"
        />
      </DialogContent>
    </Dialog>
  );
};