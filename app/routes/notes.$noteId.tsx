import type {
  ErrorBoundaryComponent,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import type { CatchBoundaryComponent, Params } from "@remix-run/react";
import { useCatch } from "@remix-run/react";
import { Link, useLoaderData } from "@remix-run/react/dist/components";
import { getStoredNotes } from "~/data/notes";

const NoteDetailsPage = () => {
  const data = useLoaderData();
  return (
    <div className="flex flex-col items-center">
      <div className="bg-black text-white max-w-fit rounded-xl text-center">
        <div className="p-6 bg-[green] rounded-xl">
          <Link to={"/notes"}>Back to Notes</Link>
        </div>
        <div className="p-6">
          <h1>{data.title}</h1>
        </div>
        <div className="p-6">
          <p>{data.content}</p>
        </div>
      </div>
    </div>
  );
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => (
  <div className="flex flex-col items-center">
    <div className="bg-black text-white max-w-fit rounded-xl text-center">
      <div className="p-6 bg-[green] rounded-xl">
        <Link to={"/notes"}>Back to Notes</Link>
      </div>
      <div className="p-6">
        <h1>{"Je to rozbitý"}</h1>
      </div>
      <div className="p-6">
        <p>{error.message}</p>
        <p>{error.name}</p>
      </div>
    </div>
  </div>
);

export const CatchBoundary: CatchBoundaryComponent = () => {
  const { data, status, statusText } = useCatch();

  return (
    <div className="flex flex-col items-center">
      <div className="bg-black text-white max-w-fit rounded-xl text-center">
        <div className="p-6 bg-[green] rounded-xl">
          <Link to={"/notes"}>Back to Notes</Link>
        </div>
        <div className="p-6">
          <h1>{"Je to rozbitý"}</h1>
        </div>
        <div className="p-6">
          <p>{data.message}</p>
          <p>{status}</p>
          <p>{statusText}</p>
        </div>
      </div>
    </div>
  );
};

export const loader: LoaderFunction = async ({ params }) => {
  const notes = await getStoredNotes();
  const selectedNote = notes.find(
    (note: { id: Params<string> }) => note.id === (params.noteId as any)
  );

  if (!selectedNote) {
    throw json(
      { message: "This note aint exits no mo " + params.noteId },
      {
        status: 404,
      }
    );
  }

  return selectedNote;
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.title,
  };
};

export default NoteDetailsPage;
