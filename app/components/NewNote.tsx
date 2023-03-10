import { Form, useActionData, useNavigation } from "@remix-run/react";

const NewNote = () => {
  const style =
    "border-solid border-[1px] border-black p-2 rounded bg-[lightGrey] m-2";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const data = useActionData();

  return (
    <Form
      method="post"
      id="note-form"
      className="border-solid border-[1px] border-black p-2 rounded h-max self-center flex flex-col gap-y-5"
    >
      <p>{data?.message}</p>
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
        <button disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
};

export default NewNote;
