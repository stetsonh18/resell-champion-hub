import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { 
  startOfDay, 
  endOfDay, 
  subDays, 
  subMonths, 
  startOfYear,
  startOfQuarter,
  endOfQuarter,
  subQuarters
} from "date-fns";

export type DateRange = {
  from: Date;
  to: Date;
};

type DateRangeSelectorProps = {
  onRangeChange: (current: DateRange, previous: DateRange) => void;
};

export const DateRangeSelector = ({ onRangeChange }: DateRangeSelectorProps) => {
  const [customRangeOpen, setCustomRangeOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{
    from: Date;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: undefined,
  });

  const handlePresetSelect = (preset: string) => {
    const now = new Date();
    let currentRange: DateRange;
    let previousRange: DateRange;

    switch (preset) {
      case "7d":
        currentRange = {
          from: startOfDay(subDays(now, 7)),
          to: endOfDay(now)
        };
        previousRange = {
          from: startOfDay(subDays(now, 14)),
          to: endOfDay(subDays(now, 7))
        };
        break;
      case "30d":
        currentRange = {
          from: startOfDay(subDays(now, 30)),
          to: endOfDay(now)
        };
        previousRange = {
          from: startOfDay(subDays(now, 60)),
          to: endOfDay(subDays(now, 30))
        };
        break;
      case "90d":
        currentRange = {
          from: startOfDay(subDays(now, 90)),
          to: endOfDay(now)
        };
        previousRange = {
          from: startOfDay(subDays(now, 180)),
          to: endOfDay(subDays(now, 90))
        };
        break;
      case "12m":
        currentRange = {
          from: startOfDay(subMonths(now, 12)),
          to: endOfDay(now)
        };
        previousRange = {
          from: startOfDay(subMonths(now, 24)),
          to: endOfDay(subMonths(now, 12))
        };
        break;
      case "ytd":
        const yearStart = startOfYear(now);
        const daysInCurrentPeriod = Math.floor((now.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24));
        currentRange = {
          from: yearStart,
          to: endOfDay(now)
        };
        previousRange = {
          from: startOfDay(subDays(yearStart, daysInCurrentPeriod)),
          to: startOfDay(yearStart)
        };
        break;
      case "thisQuarter":
        currentRange = {
          from: startOfQuarter(now),
          to: endOfQuarter(now)
        };
        previousRange = {
          from: startOfQuarter(subQuarters(now, 1)),
          to: endOfQuarter(subQuarters(now, 1))
        };
        break;
      case "lastQuarter":
        const lastQuarterEnd = endOfQuarter(subQuarters(now, 1));
        currentRange = {
          from: startOfQuarter(subQuarters(now, 1)),
          to: lastQuarterEnd
        };
        previousRange = {
          from: startOfQuarter(subQuarters(now, 2)),
          to: endOfQuarter(subQuarters(now, 2))
        };
        break;
      default:
        return;
    }

    onRangeChange(currentRange, previousRange);
  };

  const handleCustomRangeSelect = (range: { from: Date; to: Date | undefined }) => {
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

      onRangeChange(currentRange, previousRange);
      setCustomRangeOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <CalendarDays className="mr-2 h-4 w-4" />
            Select Range
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handlePresetSelect("7d")}>
            Last 7 days
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePresetSelect("30d")}>
            Last 30 days
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePresetSelect("90d")}>
            Last 90 days
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePresetSelect("12m")}>
            Last 12 months
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePresetSelect("ytd")}>
            Year to date
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePresetSelect("thisQuarter")}>
            This quarter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePresetSelect("lastQuarter")}>
            Previous quarter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setCustomRangeOpen(true)}>
            Custom range
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={customRangeOpen} onOpenChange={setCustomRangeOpen}>
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
                  handleCustomRangeSelect(range);
                }
              }
            }}
            numberOfMonths={2}
            className="rounded-md border"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};