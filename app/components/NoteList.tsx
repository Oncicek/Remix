import { Link } from "@remix-run/react/dist/components";
import type { FC } from "react";

interface NoteListProps {
  notes: any;
}

const NoteList: FC<NoteListProps> = ({ notes }) => (
  <>
    {notes.map((note: any, index: number) => (
      <div key={note.id} className="mt-6 bg-[pink] w-max p-4 rounded-xl m-4">
        <Link to={note.id}>
          <article>
            <header>
              <ul>
                <li>#{index + 1}</li>
                <li>
                  <time dateTime={note.id}>
                    {new Date(note.id).toLocaleDateString("cs-CZ")}
                  </time>
                </li>
              </ul>
              <h2>{note.title}</h2>
            </header>
            <p>{note.content}</p>
          </article>
        </Link>
      </div>
    ))}
  </>
);

export default NoteList;
