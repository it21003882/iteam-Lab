import { useEffect, useState } from "react";
import { request } from "./api.js";

const emptyForm = { name: "", quantity: "", category: "" };

export default function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  async function loadItems() {
    setItems(await request("/api/items"));
  }

  useEffect(() => {
    loadItems().catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, []);

  function resetForm() {
    setForm({ ...emptyForm });
    setEditingId(null);
  }

  function beginEdit(item) {
    setEditingId(item._id);
    setForm({ name: item.name, quantity: String(item.quantity), category: item.category ?? "" });
    setError("");
  }

  async function saveItem(event) {
    event.preventDefault();
    setError("");
    const quantity = Number(form.quantity);
    const price = Number(form.price);

if (
  !form.category.trim() ||
  form.price.trim() === "" ||
  !Number.isFinite(price) ||
  price < 0
) {
  setError("Enter a category and a price of zero or more.");
  return;
}
    if (!form.name.trim() || form.quantity === "" || !Number.isFinite(quantity) || quantity < 0) {
      setError("Enter a name and a quantity of zero or more.");
      return;
    }
    setBusy(true);
    try {
      const payload = { name: form.name.trim(), quantity, category: form.category.trim()};
      await request(editingId ? `/api/items/${editingId}` : "/api/items", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      resetForm();
      await loadItems();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function deleteItem(id) {
    if (!window.confirm("Delete this item?")) return;
    setError("");
    setBusy(true);
    try {
      await request(`/api/items/${id}`, { method: "DELETE" });
      if (editingId === id) resetForm();
      await loadItems();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <p className="eyebrow">ITEM MANAGER</p>
      <h1>Item Manager</h1>
      <p>Add, edit and delete your items.</p>
      {error && <p role="alert" className="error">{error}</p>}
      <form onSubmit={saveItem}>
        <h2>{editingId ? "Edit item" : "Add item"}</h2>
        <label>Name
          <input value={form.name} required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label>Quantity
          <input type="number" min="0" step="1" value={form.quantity} required onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        </label>
        <label>Category
          <input value={form.category} required onChange={(e) => setForm({ ...form, category: e.target.value })}/>
          </label>
        <div className="actions">
          <button disabled={busy}>{busy ? "Saving…" : editingId ? "Save changes" : "Add item"}</button>
          {editingId && <button type="button" className="secondary" onClick={resetForm} disabled={busy}>Cancel</button>}
        </div>
      </form>
      <section>
        <h2>Your items</h2>
        {loading ? <p>Loading items…</p> : items.length === 0 ? <p>No items to display.</p> : (
          <div className="table-wrap"><table>
            <thead><tr><th>Name</th><th>Quantity</th><th>Category</th><th>Actions</th></tr></thead>
            <tbody>{items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td><td>{item.quantity}</td><td>{item.category}</td>
                <td className="actions">
                  <button className="secondary" disabled={busy} onClick={() => beginEdit(item)}>Edit</button>
                  <button className="danger" disabled={busy} onClick={() => deleteItem(item._id)}>Delete</button>
                </td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </section>
    </main>
  );
}
