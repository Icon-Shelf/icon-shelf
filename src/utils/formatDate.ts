export function formatDate(date?: string) {
  if (!date) {
    return '';
  }

  const jsDate = new Date();

  return jsDate.toLocaleDateString('en-IN');
}
