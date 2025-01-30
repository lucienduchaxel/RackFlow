import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext.jsx";

const LineCard = ({ detail, queryDetails }) => {
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState();
  const { user } = useUser();

  const receiveLine = async (e) => {
    e.preventDefault();

    if(quantity > (detail.quantity - detail.quantityreceived)) return

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/receiving/receiveline",
        {
          tenant_id: user.tenant,
          expreceiptno: Number(detail.expreceiptno),
          lineno: Number(detail.lineno),
          quantity: Number(quantity),
          location: "B1221",
          packid: "B1221"
        }
      );

      queryDetails(detail.expreceiptno)
      setQuantity("")

    } catch (err) {
      setError(err.response?.data?.detail || "Receive failed");
    }
  };


  return (
    <>
      <div className="border-gray-200 border rounded-md p-3 mt-2">
        <div className="flex justify-between">
          <p>{detail.itemid}</p>
          <p>Expected: {detail.quantity}</p>
          <p>Received: {detail.quantityreceived} </p>
        </div>
        <div className="pt-2">
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Qty"
            className="border rounded-md mr-2 w-1/5 py-1"
          ></input>
          <button
            onClick={receiveLine}
            className="bg-green-600 rounded-md text-white px-2 py-1"
          >
            Receive
          </button>
        </div>
      </div>
    </>
  );
};

export default LineCard;
