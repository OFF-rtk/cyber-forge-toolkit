"use client";

import { use, useState } from "react";
import { MysticalInput } from "@/components/ui/form/MysticalInput";
import { SacredTextarea } from "@/components/ui/form/SacredTextArea";
import { Button } from "@/components/ui/button";
import { 
    Avatar,
    AvatarFallback,
    AvatarImage 
} from "@/components/ui/avatar";
import { CinzelFont, CrimsonPro } from "@/components/ui/fonts";

export default function Page() {
    const [soulName, setSoulName] = useState("John Elden Ring");
    const [email, setEmail] = useState("keeper@realm.com");
    const [bio, setBio] = useState("A humbe keeper of the sacred archives, forging tools in the digital void.");
    const [keeperMark, setKeeperMark] = useState("J")


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Saving profile:", {soulName, email, bio});
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
            <div>
                <h3 className={`${CinzelFont.className} text-2xl font-semibold text-bone tracking-wide`}>
                    Visage
                </h3>
                <p className={`${CrimsonPro.className} text-dust mt-1`}>
                    This is your identity within the realm.
                </p>

                <div className="mt-6 flex items-center gap-6">
                    <Avatar className="h-20 w-20 ring-2 ring-ember-600/30">
                        <AvatarImage src="https://github.com/shadcn.png" alt={soulName} />
                        <AvatarFallback className="bg-ash text-bone text-3xl font-medium">
                            {keeperMark}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex gap-2">
                        <Button type="button" variant="outline" className="border-ember-600/30 text-dust hover:text-bone hover:bg-ash-800/50">
                            Change Visage
                        </Button>
                        <Button type="button" variant="ghost" className="text-dust hover:text-blood">
                            Remove
                        </Button>
                    </div>
                </div>
            </div>

            <div className="h-[2px] bg-gradient-to-r from-transparent via-ember-600/20 to-transparent" />

            <div className="space-y-8">
                <div>
                    <h3 className={`${CinzelFont.className} text-2xl font-semibold text-bone tracking-wide`}>
                        Keeper's Inscription
                    </h3>
                    <p className={`${CrimsonPro.className} text-dust mt-1`}>
                        Update your public name and email address.
                    </p>
                </div>

                <MysticalInput
                    label="Soul Name"
                    id="soulName"
                    value={soulName}
                    onChange={(e) => setSoulName(e.target.value)}
                    placeholder="Your Soul Name"
                />

                <MysticalInput
                    label="Email Address"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                />

                <SacredTextarea
                    label = "Sacred Bio"
                    id = "bio"
                    value = {bio}
                    onChange={(e) => setBio(e.target.value)}
                    helperText="Write a brief description of your purpose."
                    rows={3}
                />
            </div>

            <div className="h-[2px] bg-gradient-to-r from-transparent via-ember-600/20 to-transparent" />

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" className="border-ember-600 text-dust hover:text-bone hover:bg-ash-800/50 transition-colors duration-200">
                    Cancel
                </Button>
                <Button type="submit" className="bg-ember-600 hover:bg-ember-bright text-bone">
                    Save Changes
                </Button>
            </div>
        </form>
    )
}