import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { useState, type SyntheticEvent } from "react";
import { useRevalidator } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import api, { type ApiErrorResponse } from "~/api/api";

const AddLeadModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
   const revalidator = useRevalidator();

  const resetForm = () => {
    setName("");
    setEmail("");
    setphoneNumber("");
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      resetForm();
    }
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await api.post("/leads", {
        name,
        email,
        phoneNumber
      });
      if (res.status == 201) {
        toast.success("Klient přidán!");
        revalidator.revalidate();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error("Neočekávaná chyba aplikace.");
      }
    }

    resetForm();
    setOpen(false);
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.Trigger asChild>
          <button className="bg-primary-button hover:bg-hover-button cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white transition-colors">
            Nový Klient
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-[1px]" />

          <Dialog.Content className="bg-surface border-borders fixed top-1/2 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border p-6 shadow-xl focus:outline-none">
            <Dialog.Title className="text-primary-text mb-4 text-lg font-semibold">
              Přidat klienta
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-secondary-text text-xs font-medium">
                  Název / Jméno *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Např. Jan Novák / Firma s.r.o."
                  className="text-input text-primary-text placeholder:text-muted-text focus:border-primary-button w-full cursor-text focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-secondary-text text-xs font-medium">
                  E-mail *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jan.novak@firma.cz"
                  className="text-input text-primary-text placeholder:text-muted-text focus:border-primary-button w-full cursor-text focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-secondary-text text-xs font-medium">
                  Telefon *
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setphoneNumber(e.target.value)}
                  placeholder="+420 123 456 789"
                  className="text-input text-primary-text placeholder:text-muted-text focus:border-primary-button w-full cursor-text focus:outline-none"
                />
              </div>

              <div className="mt-3 flex justify-end gap-2">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="text-secondary-text hover:bg-hover border-borders cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition-colors"
                  >
                    Zrušit
                  </button>
                </Dialog.Close>

                <button
                  type="submit"
                  className="bg-primary-button hover:bg-hover-button cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
                >
                  Uložit
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default AddLeadModal;
