import { SettingsLayout } from "@/components/layout/SettingsLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SettingsLayout>{children}</SettingsLayout>;
}