import { Button } from "@/components/ui/button";

type ReturnFormProps = {
  onSuccess: () => void;
};

export const ReturnForm = ({ onSuccess }: ReturnFormProps) => {
  return (
    <div>
      <Button onClick={onSuccess}>Submit Return</Button>
    </div>
  );
};