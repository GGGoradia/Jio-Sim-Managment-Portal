import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AddInventoryModal = ({ close, refresh }) => {
  
  const username=useSelector((state)=>state.auth.user.username)

  const [form, setForm] = useState({
    iccid: "",
    username: username,// this is not working due to redux state bug 
    status: "",
    makeModel: "",
    dateOfEntry: new Date().toISOString(),
  });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://10.145.52.5:5003/api/pkisim2.1/delivery/insert", form);
      refresh();
      close();
    } catch (err) {
      alert("Failed to add inventory");
    }
    console.log(username)
  };

  return (
    <div className="inventorymodal-backdrop">
      <div className="inventory_modal">
        <h2>Add Inventory</h2>

        <form onSubmit={submitHandler}>
          <input name="iccid" placeholder="ICCID" onChange={handleChange} required />
          {/* <input name="agent" onChange={handleChange} value={agentid||""} required disabled /> */}

          <select
            name="status"
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="SIM_ORDERED">Sim Ordered</option>
          </select>

          <select name="makeModel"
            placeholder="Make / Model"
            onChange={handleChange}
            required>
              <option value="">Select Make/Model</option>
              <option value="TaisysPKIsim">Taisys PKI sim</option>
            </select>

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
