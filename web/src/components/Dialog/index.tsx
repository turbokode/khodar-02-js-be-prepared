import { Dispatch, PropsWithChildren } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import './styles.css';
import { LucideIcon, X } from 'lucide-react';
import { ButtonWithIcon } from '../ButtonWithIcon';

interface DialogProps {
  open: boolean;
  onOpenChange: Dispatch<React.SetStateAction<boolean>>;
  title: string;
  IconTitle: LucideIcon;
  buttonText: string;
  IconButton: LucideIcon;
}

export function DialogLayout({
  open,
  onOpenChange,
  title,
  IconTitle,
  buttonText,
  IconButton,
  children
}: PropsWithChildren<DialogProps>) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            <IconTitle />
            <span>{title}</span>
          </Dialog.Title>
          {children}
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <ButtonWithIcon text={buttonText} Icon={IconButton} />
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <X size={14} color="#000000" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
