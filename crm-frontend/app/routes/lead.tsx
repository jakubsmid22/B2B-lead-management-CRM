import { useLoaderData, useParams, Link, useNavigate } from "react-router";
import api, { type ApiErrorResponse } from "~/api/api";
import { type Note, type Lead, type Status } from "~/api/types";
import type { Route } from "./+types/lead";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";

export const clientLoader = async ({ params }: Route.ClientLoaderArgs) => {
  const [leadRes, notesRes] = await Promise.all([
    api.get<Lead>(`/leads/${params.id}`),
    api.get<Note[]>(`/leads/${params.id}/notes`),
  ]);

  return {
    lead: leadRes.data,
    notes: notesRes.data,
  };
};

// Pomocná mapa pro barevné odlišení selectu podle tvých proměnných v @theme
const statusStyles: Record<Status, string> = {
  NEW: "bg-new-bg text-new-text border-new-text/20",
  CONTACTED:
    "bg-negotiation-bg text-negotiation-text border-negotiation-text/20",
  QUALIFIED:
    "bg-negotiation-bg text-negotiation-text border-negotiation-text/20",
  WON: "bg-active-bg text-active-text border-active-text/20",
  LOST: "bg-error-bg text-error-text border-error-text/20",
};

const Lead = () => {
  const data = useLoaderData<typeof clientLoader>();
  const { id } = useParams();
  const [status, setStatus] = useState<Status>(data.lead.status);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<Note[]>(data.notes);
  const navigate = useNavigate();

  const handleStatusChange = async (newStatus: Status) => {
    setStatus(newStatus);
    try {
      const res = await api.patch(`/leads/${id}/status`, { status: newStatus });
      if (res.status === 200) {
        toast.success("Status změněn.");
      }
    } catch (error: unknown) {
      setStatus(data.lead.status);
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        toast.error(error.response?.data?.error || "Chyba při změně statusu.");
      } else {
        toast.error("Neočekávaná chyba aplikace.");
      }
    }
  };

  const addNote = async () => {
    if (!noteText.trim()) return;

    try {
      const res = await api.post(`/leads/${id}/notes`, {
        content: noteText,
      });

      if (res.status === 201) {
        setNotes((prev) => [res.data, ...prev]);
        setNoteText("");
        toast.success("Poznámka přidána");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error("Neočekávaná chyba aplikace.");
      }
    }
  };

  const deleteNote = async (noteId: number) => {
    try {
      await api.delete(`/leads/notes/${noteId}`);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      toast.success("Poznámka smazána");
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error("Nepodařilo se smazat poznámku.");
      }
    }
  };

  const deleteLead = async () => {
    if (!window.confirm(`Opravdu chceš smazat klienta ${data.lead.name}?`)) {
      return;
    }

    try {
      await api.delete(`/leads/${id}`);
      navigate("/");
      toast.success("Poznámka smazána");
    } catch {
      toast.error("Nepodařilo se smazat poznámku.");
    }
  };

  return (
    <main className="mx-auto flex flex-col gap-6 p-4 md:p-6">
      <ToastContainer position="top-center" />

      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-secondary-text hover:text-primary-text inline-flex items-center gap-1 text-sm font-medium transition-colors"
        >
          ← Zpět na přehled klientů
        </Link>

        <button
          onClick={deleteLead}
          className="bg-error-bg text-error-text border-error-text/20 hover:bg-error-text cursor-pointer rounded-md border px-3.5 py-1.5 text-sm font-medium transition-colors hover:text-white"
        >
          Smazat klienta
        </button>
      </div>

      <section className="bg-surface border-borders rounded-xl border p-6 shadow-xs">
        <div className="border-borders flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-primary-text text-2xl font-bold">
                {data.lead.name}
              </h1>
              <span className="text-muted-text bg-app-bg border-borders rounded-md border px-2 py-0.5 text-xs font-medium">
                #{data.lead.id}
              </span>
            </div>
            <p className="text-secondary-text mt-1 text-sm">
              Detail kontaktních údajů a historie komunikace
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="lead-status"
              className="text-secondary-text text-xs font-medium tracking-wider uppercase"
            >
              Status:
            </label>
            <select
              id="lead-status"
              value={status}
              onChange={(e) => handleStatusChange(e.target.value as Status)}
              className={`cursor-pointer rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors focus:outline-none ${statusStyles[status]}`}
            >
              <option value="NEW" className="bg-surface text-primary-text">
                NEW
              </option>
            <option
                value="CONTACTED"
                className="bg-surface text-primary-text"
              >
                CONTACTED
              </option>
              <option
                value="QUALIFIED"
                className="bg-surface text-primary-text"
              >
                QUALIFIED
              </option>
              <option value="WON" className="bg-surface text-primary-text">
                WON
              </option>
              <option value="LOST" className="bg-surface text-primary-text">
                LOST
              </option>
            </select>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-app-bg border-borders rounded-lg border p-3.5">
            <span className="text-muted-text block text-xs font-medium tracking-wider uppercase">
              E-mail
            </span>
            <p className="text-primary-text mt-1 font-medium break-all">
              {data.lead.email}
            </p>
          </div>

          <div className="bg-app-bg border-borders rounded-lg border p-3.5">
            <span className="text-muted-text block text-xs font-medium tracking-wider uppercase">
              Telefon
            </span>
            <p className="text-primary-text mt-1 font-medium">
              {data.lead.phoneNumber || "Neuvedeno"}
            </p>
          </div>

          <div className="bg-app-bg border-borders rounded-lg border p-3.5">
            <span className="text-muted-text block text-xs font-medium tracking-wider uppercase">
              Vytvořeno
            </span>
            <p className="text-primary-text mt-1 font-medium">
              {dayjs(data.lead.createdAt).format("DD. MM. YYYY HH:mm")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface border-borders rounded-xl border p-6 shadow-xs">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-primary-text text-lg font-semibold">
            Poznámky ({notes.length})
          </h2>
        </div>
        <div className="mb-6 flex flex-col gap-3">
          <textarea
            rows={3}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Napiš poznámku ze schůzky nebo telefonátu..."
            className="text-input text-primary-text placeholder:text-muted-text focus:border-primary-button w-full cursor-text resize-y focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              onClick={addNote}
              disabled={!noteText.trim()}
              className="bg-primary-button hover:bg-hover-button disabled:bg-muted-text cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed"
            >
              Přidat poznámku
            </button>
          </div>
        </div>

        {/* Seznam poznámek */}
        <div className="flex flex-col gap-3">
          {notes.length === 0 ? (
            <p className="text-muted-text border-borders rounded-lg border border-dashed py-8 text-center text-sm">
              Zatím tu nejsou žádné poznámky.
            </p>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="bg-app-bg border-borders hover:bg-hover/60 flex items-start justify-between gap-4 rounded-lg border p-4 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-primary-text text-sm leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                  <span className="text-muted-text mt-2 block text-xs">
                    {dayjs(note.createdAt).format("DD. MM. YYYY HH:mm")}
                  </span>
                </div>

                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-error-text hover:bg-error-bg cursor-pointer rounded-md px-2.5 py-1 text-xs font-semibold transition-colors"
                >
                  Smazat
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Lead;
