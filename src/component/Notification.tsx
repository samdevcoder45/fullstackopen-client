export default function Notification({ message }: { message: string | null }) {
  if (message === null) return null;
  return <div className={`${message ? "error" : "" }`}>{message}</div>;
}
