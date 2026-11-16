import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  useLoaderData,
  useNavigate,
  useSearchParams,
  type ClientLoaderFunctionArgs,
} from "react-router";
import api from "~/api/api";
import type { PageResponse } from "~/api/types";
import AddLeadModal from "~/components/AddLeadModal";

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const url = new URL(request.url);

  const page = url.searchParams.get("page") ?? "0";
  const name = url.searchParams.get("name") ?? "";
  const status = url.searchParams.get("status") ?? "";

  const res = await api.get<PageResponse>("/leads", {
    params: {
      page,
      ...(name && { name }),
      ...(status && { status }),
    },
  });
  return res.data;
};

const Leads = () => {
  const data = useLoaderData<typeof clientLoader>();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [name, setName] = useState(searchParams.get("name") ?? "");
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 0));

  useEffect(() => {
    const params = new URLSearchParams();

    if (status) params.set("status", status);
    if (name) params.set("name", name);
    if (page > 0) params.set("page", String(page));

    setSearchParams(params, { replace: true });
  }, [status, name, page, setSearchParams]);

  const getStatusBadgeStyle = (status: string | null) => {
    switch (status) {
      case "NEW":
        return "bg-new-bg text-new-text border-new-text/20";
      case "CONTACTED":
      case "QUALIFIED":
        return "bg-negotiation-bg text-negotiation-text border-negotiation-text/20";
      case "WON":
        return "bg-active-bg text-active-text border-active-text/20";
      case "LOST":
        return "bg-error-bg text-error-text border-error-text/20";
      default:
        return "bg-hover text-secondary-text border-borders";
    }
  };

  return (
    <main className="space-y-6 px-5 py-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-primary-text text-2xl font-bold tracking-tight md:text-3xl">
            Leads
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            className="text-input bg-surface focus:border-primary-button focus:outline-none sm:w-64"
            type="text"
            placeholder="Hledat podle jména..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setPage(0);
            }}
          />

          <select
            name="status"
            id="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(0);
            }}
            className="border-borders bg-surface text-primary-text focus:border-primary-button cursor-pointer rounded-md border-2 p-2 focus:outline-none"
          >
            <option value="">Všechny statusy</option>
            <option value="NEW">NEW</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="QUALIFIED">QUALIFIED</option>
            <option value="WON">WON</option>
            <option value="LOST">LOST</option>
          </select>
        </div>
      </div>

      <AddLeadModal/>

      <div className="bg-surface border-borders overflow-hidden rounded-lg border shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-app-bg border-borders text-secondary-text border-b text-xs font-semibold tracking-wider uppercase">
              <tr>
                <th className="px-6 py-3.5">Jméno klienta</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Telefon</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Přidán</th>
              </tr>
            </thead>

            <tbody className="divide-borders divide-y">
              {data.content.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-muted-text px-6 py-10 text-center"
                  >
                    Žádní klienti neodpovídají zadanému filtru.
                  </td>
                </tr>
              ) : (
                data.content.map((client) => {
                  const { id, name, email, phoneNumber, status, createdAt } =
                    client;
                  return (
                    <tr
                      key={id}
                      className="hover:bg-hover transition-colors duration-150 cursor-pointer"
                      onClick={() => navigate(`/${id}`)}
                    >
                      <td className="text-primary-text px-6 py-4 font-medium">
                        {name}
                      </td>
                      <td className="text-secondary-text px-6 py-4">{email}</td>
                      <td className="text-secondary-text px-6 py-4 font-mono text-xs">
                        {phoneNumber}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeStyle(status)}`}
                        >
                          {status ?? "BEZ STATUSU"}
                        </span>
                      </td>
                      <td className="text-muted-text px-6 py-4">
                        {createdAt
                          ? dayjs(createdAt).format("DD. MM. YYYY")
                          : "—"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {data.totalPages > 1 && (
          <div className="border-borders bg-surface flex items-center justify-between border-t px-6 py-3.5">
            <p className="text-secondary-text text-sm">
              Stránka{" "}
              <span className="text-primary-text font-semibold">
                {data.number + 1}
              </span>{" "}
              z{" "}
              <span className="text-primary-text font-semibold">
                {data.totalPages}
              </span>
            </p>

            <div className="flex gap-2">
              <button
                disabled={data.first}
                onClick={() => setPage(page - 1)}
                className="border-borders bg-surface text-primary-text hover:bg-hover cursor-pointer rounded-md border px-3.5 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
              >
                PŘEDCHOZÍ
              </button>
              <button
                disabled={data.last}
                onClick={() => setPage(page + 1)}
                className="bg-primary-button hover:bg-hover-button cursor-pointer rounded-md px-3.5 py-1.5 text-xs font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40"
              >
                NÁSLEDUJÍCÍ
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Leads;
