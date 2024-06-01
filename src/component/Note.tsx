export default function Note({
  note,
  toggleImportance,
}: {
  note: { id: number; content: string; important: boolean };
  toggleImportance: () => void;
}) {
  const label = note.important ? "make not important" : "make important";
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
}
