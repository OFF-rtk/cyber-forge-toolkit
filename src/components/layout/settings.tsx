"use client";

import { useState } from "react";
import SettingsTab from "../ui/SettingsTab";
import Profile from "../ui/Settings/Profile";
import { OpenSans } from "../ui/fonts";

export default function Settings() {

  const [tab, setTab] = useState("profile-tab")

  return(
    <div className="bg-black min-h-screen w-full flex flex-col items-center">
      <h1 className={`text-zinc-300 text-5xl ${OpenSans.className} tracking-wide p-4`}>Settings</h1>
      <SettingsTab 
        tabs={[{
          label: "Profile",
          key: "profile-tab"
        }, {
          label: "API",
          key: "api-tab"
        }, {
          label: "Billing",
          key: "billings-tab"
        }]}
        currentTab={tab}
        onTabChange={setTab}
      />
      <hr className="bg-zinc-300 max-w-120 w-120 mt-2 mb-5"></hr>
      {tab === "profile-tab" && <Profile />}
    </div>
  )
}