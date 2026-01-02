import { useDispatch } from "react-redux";
import { addComplaint, editComplaint } from "../features/complaints/complaintsSlice";
import { useState } from "react";

export default function ComplaintForm({ editData, setEditData }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(
    editData || {
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editData) {
      dispatch(editComplaint({ id: editData.id, data: form }));
      setEditData(null);
    } else {
      dispatch(addComplaint(form));
    }

    setForm({ title: "", 
        description: "",
         dueDate: "", 
         priority: "Low" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Task Title" value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })} />

      <textarea placeholder="Description" value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })} />

      <input type="date" value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />

      <select value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <button type="submit">
        {editData ? "Update" : "Submit"}
      </button>
    </form>
  );
}
