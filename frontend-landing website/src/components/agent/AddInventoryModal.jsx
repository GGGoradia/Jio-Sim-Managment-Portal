import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AddInventoryModal = ({ close, refresh }) => {
  
  const agentid=useSelector((state)=>state.auth.user?.id)

  const [form, setForm] = useState({
    iccid: "",
    agent: agentid||"",
    status: "",
    makeModel: "",
  });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/inventory/add", form);
      refresh();
      close();
    } catch (err) {
      alert("Failed to add inventory");
    }
  };

  return (
    <div className="inventorymodal-backdrop">
      <div className="inventory_modal">
        <h2>Add Inventory</h2>

        <form onSubmit={submitHandler}>
          <input name="iccid" placeholder="ICCID" onChange={handleChange} required />
          <input name="agent" onChange={handleChange} value={agentid||""} required disabled />

          <select
            name="status"
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="READY_TO_DISPATCH">Ready to Dispatch</option>
            <option value="ACTIVATED">Activated</option>
            <option value="DEACTIVATED">Deactivated</option>
          </select>

          <input
            name="makeModel"
            placeholder="Make / Model"
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button type="submit">Add</button>
            <button type="button" onClick={close}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInventoryModal;
