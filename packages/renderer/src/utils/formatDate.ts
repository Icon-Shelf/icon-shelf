function getLang() {
  if (navigator.languages !== undefined) return navigator.languages[0];
  return navigator.language;
}

export function formatDate(date?: number) {
  if (!date) {
    return "";
  }

  const jsDate = new Date(date);

  return jsDate.toLocaleDateString(getLang(), { dateStyle: "medium" });
}
