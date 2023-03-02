import type {
  ActionArgs,
  ErrorBoundaryComponent,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { CatchBoundaryComponent } from "@remix-run/react";
import { useCatch, useLoaderData } from "@remix-run/react";
import NewNote from "~/components/NewNote";
import NoteList from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

export type NoteData = {
  title: string;
  content: string;
};

const NotesPage = () => {
  const notes = useLoaderData();

  return (
    <main className="flex justify-center flex-col">
      <NewNote />
      <div className="flex text-center flex-wrap">
        <NoteList notes={notes} />
      </div>
    </main>
  );
};

export async function loader() {
  console.log("loading notes");
  const notes = await getStoredNotes();

  if (!notes || notes.length === 0) {
    throw json(
      { message: "pojebalo se" },
      {
        status: 404,
        statusText: "pojebalo se hodně",
      }
    );
  }

  return notes;
}

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caughtResponse = useCatch();

  return (
    <main>
      <NewNote />
      <p>No toto</p>
      <p>{caughtResponse.statusText}</p>
    </main>
  );
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  if (noteData.title.toString().trim().length < 5) {
    return { message: "Invalid title, must be at leasts 5 chars long!" };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = [...existingNotes, noteData];
  await storeNotes(updatedNotes);
  // await new Promise<void>((resolve, reject) =>
  //   setTimeout(() => resolve(), 3000)
  // );
  return redirect("/notes");
}

export const ErrorBoundary: ErrorBoundaryComponent = ({
  error: { message },
}) => (
  <main>
    <h1>Jiná chujovina!</h1>
    <h2>{message}</h2>
  </main>
);

export const meta: MetaFunction = () => {
  return {
    title: "Super app",
    description: "Kotatkova vec je supisacka",
  };
};

export default NotesPage;
