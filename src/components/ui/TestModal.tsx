"use client";

import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export default function TestModal() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Modal
        trigger={<Button variant="default">Open Modal</Button>}
        title="Delete Account"
        description="This action cannot be undone. Are you sure?"
        footer={
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        }
      >
        <p className="text-sm text-muted-foreground">
          Deleting your account will permanently remove all your data from our
          servers.
        </p>
      </Modal>
    </div>
  );
}
