import { OpenSans } from "./fonts";

export default function FormGroup({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-2 py-4">
      <label
        htmlFor={htmlFor}
        className={`text-zinc-500 ${OpenSans.className} tracking-widest text-lg`}
      >
        {label}
      </label>
      <div className="rounded-md">
        {children}
      </div>
    </div>
  );
}
