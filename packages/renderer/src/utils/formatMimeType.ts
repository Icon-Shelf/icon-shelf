export function formatMimeType(mime: string) {
  if (!mime) {
    return "";
  }

  const updatedMime = mime.replace(/^image\//, "");

  if (updatedMime === "svg+xml") {
    return "svg";
  }
  return updatedMime;
}
