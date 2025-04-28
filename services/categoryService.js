export async function getCategories() {
  const res = await fetch("/api/categories");
  return res.json();
}
