import { OpenSans } from "./fonts";

export default function SettingsCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${OpenSans.className} bg-zinc-800 rounded-2xl w-100 tracking-wider`}
    >
      <h2 className="text-xl font-medium text-zinc-300 h-25 tracking-wider rounded-t-2xl bg-zinc-700 p-9 shadow-md shadow-black/30 z-10 relative">{title}</h2>
      <div className="space-y-2 p-6 pb-9">{children}</div>
    </div>
  );
}
