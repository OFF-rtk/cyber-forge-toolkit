import { Button } from "@/components/ui/button"; // <-- Import from Shadcn UI
import { OpenSans } from "./fonts";
import clsx from "clsx";


type SettingsTabProps = {
  tabs: { label: string; key: string }[];
  currentTab: string;
  onTabChange: (tab: string) => void;
};

export default function SettingsTab({
  tabs,
  currentTab,
  onTabChange,
}: SettingsTabProps) {
  return (
    <div className="flex p-4 justify-between w-120 bg-zinc-800 rounded-2xl mb-3">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={clsx(
            OpenSans.className,
            "text-zinc-500 tracking-widest text-lg",
            currentTab === tab.key
              ? "bg-zinc-950 text-white shadow-inner shadow-black/40"
              : "bg-zinc-800 text-zinc-400 hover:bg-black"
          )}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}
