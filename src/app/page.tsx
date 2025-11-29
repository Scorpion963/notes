import AddNoteForm from "@/components/AddNoteForm";
import Search from "@/components/Search";
import { Modal, ModalContent, ModalTriggerButton } from "@/components/ui/Modal";
import { Plus, PlusIcon } from "lucide-react";

export default async function Home() {
  return (
    <div className="p-12">
      <section className="flex flex-col gap-2">
        <Search />
        <Modal>
          <ModalTriggerButton className="w-fit self-end p-4">
            <PlusIcon />
          </ModalTriggerButton>
          <ModalContent>
            <AddNoteForm />
          </ModalContent>
        </Modal>
      </section>
    </div>
  );
}
