import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
const ViewCodeBlock = ({children, code}:any) => {
    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        toast.success('Code copied to clipboard!');
    };
  return (
    <div>
        <Dialog>
  <DialogTrigger>{children}</DialogTrigger>
  <DialogContent className="min-w-5xl max-h-[600px] overflow-auto">
    <DialogHeader>
      <DialogTitle>Source code <Button onClick={handleCopy}><Copy /></Button></DialogTitle>
      <DialogDescription>
        <div>
            <SyntaxHighlighter>
      {code}
    </SyntaxHighlighter>
        </div>
        
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default ViewCodeBlock