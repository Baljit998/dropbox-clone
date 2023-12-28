"use client"

import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { db, storage } from "@/firebase"
import { deleteObject, ref } from "firebase/storage"
import { deleteDoc, doc } from "firebase/firestore"
import toast from "react-hot-toast"

export function DeleteModal() {
    const { user } = useUser();


    const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] =
    useAppStore((state) => [
        state.isDeleteModalOpen,
        state.setIsDeleteModalOpen,
        state.fileId,
        state.setFileId,
    ]);

    async function deleteFiles() {
        if (!user || !fileId) return;

        const toastId = toast.loading("Deleting...");

        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
      try {  
        deleteObject(fileRef).then(async () => {
  
            deleteDoc(doc(db, "users", user.id , "files", fileId)).then(() => {
                 
                   toast.success("Deleted Successfully", {
                    id: toastId,
                   });
            });
        })
        .finally(() => {
            setIsDeleteModalOpen(false);
        });
    } catch(error) {
          
        setIsDeleteModalOpen(false);
        toast.error(" error Deleting document", {
            id: toastId,
           });
    }
    }

  return (
    <Dialog
        open={isDeleteModalOpen}
        onOpenChange={(isOpen) => {
            setIsDeleteModalOpen(isOpen);
        }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your file!
          </DialogDescription>
        </DialogHeader>
       
       <div className="flex space-x-2 py-3">
        <Button
        size="sm"
        className="px-3 flex-1"
        variant={"ghost"}
        onClick={() => setIsDeleteModalOpen(false)}
        >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
        </Button>

        <Button
        type="submit"
        size="sm"
        variant={"destructive"}
        className="px-3 flex-1"
        onClick={() => deleteFiles()}
        >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
        </Button>

       </div>

      </DialogContent>
    </Dialog>
  )
}
