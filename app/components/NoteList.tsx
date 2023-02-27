import type { FC } from "react";

interface NoteListProps {
  notes: any;
}

const NoteList: FC<NoteListProps> = ({ notes }) => {
  return <div>NoteList</div>;
};

export default NoteList;
