import { useDispatch, useSelector } from "react-redux";
import { removeComplaint } from "../features/complaints/complaintsSlice";
import { useState } from "react";

export default function ComplaintTable({ setEditData }) {
  const dispatch = useDispatch();
  const complaints = useSelector((state) => state.complaints.records);
  const [search, setSearch] = useState("");

  const filtered = complaints.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (filtered.length === 0) return <p>No records found</p>;

  return (
    <>
      <input
        placeholder="Search by Name"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th><th>Phone</th><th>Email</th><th>Address</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>{c.address}</td>
              <td>
                <button onClick={() => setEditData(c)}>Edit</button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete record?")) {
                      dispatch(removeComplaint(c.id));
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
