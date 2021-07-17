export function formatDate(date?: string) {
  if (!date) {
    return '';
  }

  const jsDate = new Date(date.toDate());

  return jsDate.toLocaleDateString('en-IN');
}
