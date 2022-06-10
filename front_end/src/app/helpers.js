export async function handleResponse(res) {
  const response = await res.json();
  if (response.error) {
    throw new Error(response.error);
  }
  console.log(response);
  return response;
}

export function handleError({ message }) {
  const error = message === "Failed to fetch" ? "Khong co ket noi" : message;
  return { error };
}
