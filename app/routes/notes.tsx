import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote from "~/components/NewNote";
import NoteList from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

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
  return notes;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = [...existingNotes, noteData];
  await storeNotes(updatedNotes);
  // await new Promise<void>((resolve, reject) =>
  //   setTimeout(() => resolve(), 3000)
  // );
  return redirect("/notes");
}

export default NotesPage;
