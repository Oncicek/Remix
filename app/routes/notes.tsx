import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import NewNote from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "~/data/notes";

const NotesPage = () => {
  return (
    <main className="flex justify-center h-full">
      <NewNote />
    </main>
  );
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = [...existingNotes, noteData];
  await storeNotes(updatedNotes);

  return redirect("/notes");
}

export default NotesPage;
