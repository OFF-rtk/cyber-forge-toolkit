import { Button as ShadcnButton } from "@/components/ui/button";

type ButtonProps = {
  id: string;
  label: string;
  onClick: (tab: string) => void;
  className?: string;
};

export function Button({ id, label, onClick, className }: ButtonProps) {
  return (
    <ShadcnButton
      onClick={() => onClick(id)}
      className={className}
    >
      {label}
    </ShadcnButton>
  );
}
