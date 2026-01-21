import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const EditInventory = ({ item, close, refresh }) => {
  const agentId = useSelector((state) => state.auth.user.id);

  const originalIccid = item.iccid;

  const [form, setForm] = useState({
    iccid: item.iccid,
    makeModel: item.makeModel,
    status: item.status,
  });

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/inventory/update/${originalIccid}`,
        {
          iccid: form.iccid,
          makeModel: item.makeModel,
          status: form.status,
          agent:item.agent,
        }
      );
      refresh();
      close();
    } catch (err) {
      alert("Update failed");
      console.error(err);
    }
  };

  return (
    <div className="inventorymodal-backdrop">
      <div className="inventory_modal">
        <h2>Edit Inventory</h2>

        <div className="form-group">
          <label>ICCID</label>
          <input
            value={form.iccid}
            onChange={(e) =>
              setForm({ ...form, iccid: e.target.value })
            } disabled/>
        </div>

        {/* <div className="form-group">
          <label>Make / Model</label>
          <select
            value={form.makeModel}
            onChange={(e) =>
              setForm({ ...form, makeModel: e.target.value })
            } disabled
          >
            <option value="">Select Make/Model</option>
            <option value="TaisysPKIsim" >Taisys PKI Sim</option>
          </select>
        </div> */}


        <div className="form-group">
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="ACTIVATED">Activated</option>
            <option value="READY_TO_DISPATCH">Ready To Dispatch</option>
            <option value="DEACTIVATED">Deactivated</option>
          </select>
        </div>


        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={close}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditInventory;
