export async function handleResponse(res) {
  if (!res.ok) {
    console.log(res);
  }
  const response = await res.json();
  console.log(response);
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
}

export function handleError({ message }) {
  const error = message === "Failed to fetch" ? "Khong co ket noi" : message;
  return { error };
}
