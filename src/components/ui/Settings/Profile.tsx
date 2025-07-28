"use client"

import { Button } from "../button";
import FormGroup from "../FormGroup";
import Modal from "../modal";
import SettingsCard from "../SettingsCard";
import SettingsInput from "../SettingsInput";
import { useState } from "react";

export default function Profile() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div>
            <form>
                <SettingsCard title="Edit Profile">
                    <FormGroup label="Name" htmlFor="name">
                        <SettingsInput id="name" value={name} onChange={setName} placeholder="Enter your name..." required/>
                    </FormGroup>
                    <FormGroup label="Email" htmlFor="email">
                        <SettingsInput id="email" value={email} onChange={setEmail} placeholder="Enter your name..." required/>
                    </FormGroup>
                    <FormGroup label="Password" htmlFor="password">
                        <SettingsInput id="password" value={password} onChange={setPassword} placeholder="Enter your name..." required/>
                    </FormGroup>
                    {<Modal
                        trigger={<Button type="submit" className="hover:bg-black text-zinc-500 mt-3 ">Save Profile</Button>}
                        title="Save Profile"
                        footer={
                            <div className="space-x-2">
                                <Button type="submit" className="hover:bg-black text-zinc-500 mt-3 ">Save</Button>
                                <Button type="submit" className="hover:bg-black text-zinc-500 mt-3 ">Cancel</Button>
                            </div>  
                        }
                    >
                        <p>Saving your profile will change your name to {name} and your email to {email} and your password to {password}</p>
                    </Modal>}
                </SettingsCard>  
            </form>
        </div>
    )
}