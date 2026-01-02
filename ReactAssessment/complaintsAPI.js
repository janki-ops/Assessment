const API_URL = "https://example.com/api/complaints";

export const fetchComplaints = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createComplaint = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateComplaint = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteComplaint = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return id;
};
