import Button from "@/components/Button";
import { Modal, ModalContent, ModalTriggerButton } from "@/components/Modal";
import Search from "@/components/Search";
import { Plus, PlusIcon } from "lucide-react";

export default async function Home() {
  return (
    <div className="p-12">
      <section className="flex flex-col gap-2">
        <Search />
        <Modal>
          <ModalTriggerButton>
            <PlusIcon />
          </ModalTriggerButton>
          <ModalContent>Hello</ModalContent>
        </Modal>
      </section>
    </div>
  );
}
