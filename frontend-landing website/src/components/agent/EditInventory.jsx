import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const EditInventory = ({ item, close, refresh }) => {
  const username = useSelector((state) => state.auth.user.username);
  const originalIccid = item.iccid;

  const [form, setForm] = useState({
    iccid: item.iccid,
    makeModel: item.makeModel,
    status: item.status,
    comments:item.comments,
  });

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
  const handleSave = async () => {
    try {
      await axios.post(
        "http://10.145.52.5:5003/api/pkisim2.1/delivery/update",
        {
          iccid: form.iccid,
          username, 
          status: form.status,
          makeModel: form.makeModel,
          comments: form.comments,
          dateOfEntry: new Date().toISOString(), 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      refresh();
      close();
    } catch (err) {
      console.error(err);
      alert("Update failed");
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
       <div className="form-group">
        <label>Comments</label>
        <textarea
          maxLength={100}
          rows="3"
          placeholder="Enter comments here..."
          value={form.comments || ""}
          onChange={(e) =>
            setForm({ ...form, comments: e.target.value })
          }
        />
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
