import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYou.css";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="thankYouContainer">
      <div className="thankYouContent">
        <h2>Thank You for Your Purchase!</h2>
        <p>Your order has been processed successfully.</p>
        <p>You will be redirected to the home page shortly.</p>
        <button onClick={() => navigate("/")} className="backToHomeButton">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
