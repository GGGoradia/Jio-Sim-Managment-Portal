import React, { useState } from "react";
import "@/css/ChoosePlan.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const ChoosePlan = () => {
  
  const order = useSelector((state) => state.order.order);

  useEffect(() => {
    console.log("ORDER FROM REDUX:", order);
  }, [order]);
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const PLANS = [
    {
      id: "PLAN_399",
      name: "SIM + ₹399 Plan",
      price: 2775+399,
      validity: "1 Year",
      description: "Includes PKI-SIM & 40 Digital Signatures",
    },
    {
      id: "PLAN_599",
      name: "SIM + ₹599 Plan",
      price: 2775+599,
      validity: "2 Years",
      description: "Includes PKI-SIM & 80 digital signatures",
    },
    {
      id: "PLAN_799",
      name: "SIM + ₹799 Plan",
      price: 2775+799,
      validity: "2 Years",
      description: "Includes PKI-SIM & 120 digital signatures",
    },
  ];
  
  const handleContinue = () => {
    if (!selectedPlan) {
      alert("Please select a plan to continue");
      return;
    }

    // Store selected plan if needed later
    localStorage.setItem("selectedPlan", selectedPlan);

    
  };

  return (
    <div className="choose-plan">
      <div className="choose-plan-container">
        <h3>Choose Your Plan</h3>
        <p>Select one plan to proceed</p>

        <div className="plan-list">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${
                selectedPlan?.id === plan.id ? "active" : ""
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              <h4>{plan.name}</h4>
              <p><strong>Total Price:</strong> ₹{plan.price}</p>
              <p><strong>Validity:</strong> {plan.validity}</p>
              <p>{plan.description}</p>
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
