import fs from "fs/promises";

export async function getStoredNotes() {
  const rawFielContent = await fs.readFile("notes.json", { encoding: "utf8" });
  const data = JSON.parse(rawFielContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

export function storeNotes(notes: string[]) {
  return fs.writeFile("notes.json", JSON.stringify({ notes: notes || [] }));
}
