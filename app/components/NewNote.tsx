const NewNote = () => {
  const style =
    "border-solid border-[1px] border-black p-2 rounded bg-[lightGrey] m-2";
  return (
    <form
      method="post"
      id="note-form"
      className="border-solid border-[1px] border-black p-2 rounded h-max self-center flex flex-col gap-y-5"
    >
      <div className={style}>
        <label htmlFor="title">Title</label>
        <input
          className="rounded m-2"
          type="text"
          id="title"
          name="title"
          required
        />
      </div>
      <div className={style}>
        <label className="align-top" htmlFor="content">
          Content
        </label>
        <textarea
          className="rounded m-2"
          id="content"
          name="content"
          rows={5}
          required
        />
      </div>
      <div className={style}>
        <button className="w-full">Add Note</button>
      </div>
    </form>
  );
};

export default NewNote;
