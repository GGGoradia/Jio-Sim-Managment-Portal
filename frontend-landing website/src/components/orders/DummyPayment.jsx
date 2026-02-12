import "@/css/DummyPayment.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { clearOrder } from "../features/order/orderSlice";
import { useNavigate } from "react-router-dom";

const DummyPayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const order = useSelector((state) => state.order.order);

  if (!order) {
    return <p>No order found. Please start again.</p>;
  }

  const handleConfirmPayment = async () => {
    try {
      console.log("SENDING ORDER TO API:", order);

      await axios.post(
        "http://10.145.52.5:5003/api/pkisim2.1/orders/create", // replace endpoint
        order,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(clearOrder());

      alert("Payment successful!");
      navigate("/payment-success"); // or any success page
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="dummy-payment">
      <div className="payment-box">
        <h3>Dummy Payment Portal</h3>

        <p>
          <strong>Amount to Pay:</strong> ₹{order.amount}
        </p>

        <p>
          <strong>Selected Plan:</strong> {order.planId}
        </p>
        <pre className="json-output">
          {JSON.stringify(order, null, 2)}
        </pre>

        <button className="confirm-payment-btn" onClick={handleConfirmPayment}>
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default DummyPayment;
