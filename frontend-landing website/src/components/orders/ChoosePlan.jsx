import React, { useState } from "react";
import "@/css/ChoosePlan.css";
import { useNavigate } from "react-router-dom";

const ChoosePlan = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleContinue = () => {
    if (!selectedPlan) {
      alert("Please select a plan to continue");
      return;
    }

    // Store selected plan if needed later
    localStorage.setItem("selectedPlan", selectedPlan);

    // Navigate to next step (change route if needed)
    navigate("/payment_sucessfull");
  };

  return (
    <div className="choose-plan">
      <div className="choose-plan-container">
        <h3>Choose Your Plan</h3>
        <p>Select one plan to proceed</p>

        <div className="plan-list">
          {["Plan 1", "Plan 2", "Plan 3"].map((plan) => (
            <div
              key={plan}
              className={`plan-card ${
                selectedPlan === plan ? "active" : ""
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              <h4>{plan}</h4>
              <p>Validity: 2 Years</p>
              <p>Includes PKI-SIM & Digital Signature</p>
            </div>
          ))}
        </div>

        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default ChoosePlan;
