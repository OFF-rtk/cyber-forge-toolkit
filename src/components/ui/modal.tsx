import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { OpenSans } from "./fonts";

type ModalProps = {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function Modal({ trigger, title, description, children, footer }: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      
      <DialogContent
        className={`${OpenSans.className} bg-zinc-800 border-none rounded-2xl tracking-wider sm:max-w-[500px] w-full`}
      >
        <div className="p-4 text-zinc-300">
          <DialogHeader>
            <DialogTitle className="text-2xl">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-sm text-zinc-500">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>

        <hr className="border-zinc-700 my-4" />

        <div className="px-4 text-zinc-400">{children}</div>

        {footer && <DialogFooter className="px-4 py-2">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
