export type DateRange = {
  from: Date;
  to: Date;
};

export type PreviousDateRange = {
  current: DateRange;
  previous: DateRange;
};

export type DateRangeSelectorProps = {
  onRangeChange: (current: DateRange, previous: DateRange) => void;
};