export default function (filename: string): string {
  const chunks = filename.split('.');
  chunks.pop();
  return chunks.join('.');
}
