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

  // ================= STATUS TRANSITION LOGIC =================
  const getAllowedStatuses = (currentStatus) => {
    if (currentStatus === "SIM_ORDERED") {
      return ["SIM_ORDERED", "SIM_RECEIVED"];
    }

    if (currentStatus === "SIM_RECEIVED") {
      return ["SIM_RECEIVED", "SIM_VERIFIED"];
    }

    if (currentStatus === "SIM_VERIFIED") {
      return ["SIM_VERIFIED", "READY_TO_DISPATCH"];
    }

    if (currentStatus === "READY_TO_DISPATCH") {
      return ["READY_TO_DISPATCH", "IN_TRANSIT"];
    }

    if (currentStatus === "IN_TRANSIT"){
      return ["IN_TRANSIT","READY_TO_DISPATCH","DEACTIVATED","DELIVERED"]
    }

    if (currentStatus === "DELIVERED") {
      return ["DELIVERED", "DEACTIVATED"];
    }

    if (currentStatus === "DEACTIVATED") {
      return ["DEACTIVATED"];
    }

    return [];
  };
  // ============================================================

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/inventory/update/${originalIccid}`,
        {
          iccid: form.iccid,
          makeModel: item.makeModel,
          status: form.status,
          agent: item.agent,
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
            }
            disabled
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            {getAllowedStatuses(form.status).map((status) => (
              <option key={status} value={status}>
                {status.replaceAll("_", " ")}
              </option>
            ))}
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
