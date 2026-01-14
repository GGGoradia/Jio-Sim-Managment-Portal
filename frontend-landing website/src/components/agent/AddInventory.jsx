import { useState } from "react";
import axios from "axios";

const AddInventory = () => {
  const [form, setForm] = useState({
    iccid: "",
    agent: "",
    status: "",
    makeModel: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8080/api/inventory/add",
        form
      );

      alert("Inventory added successfully");
      setForm({
        iccid: "",
        agent: "",
        status: "",
        makeModel: "",
      });
    } catch (err) {
      console.error("Error adding inventory", err);
      alert("Failed to add inventory");
    }
  };

  return (
    <>
      <h1>Add Inventory</h1>

      <form onSubmit={submitHandler} className="inventory-form">
        <input
          name="iccid"
          value={form.iccid}
          onChange={handleChange}
          placeholder="ICCID"
          required
        />
        <input
          name="agent"
          value={form.agent}
          onChange={handleChange}
          placeholder="Agent"
          required
        />

        <select value={form.status} onChange={(e) =>setForm({ ...form, status: e.target.value })} required>
            <option value="">Select Status</option>
            <option value="READY_TO_DISPATCH">Ready to dispatch</option>
            <option value="ACTIVATED">Activated</option>
            <option value="DEACTIVATED">Deactivated</option>
        </select>
        

        <input
          name="makeModel"
          value={form.makeModel}
          onChange={handleChange}
          placeholder="Make / Model"
          required
        />

        <button type="submit">Add Inventory</button>
      </form>
    </>
  );
};

export default AddInventory;
