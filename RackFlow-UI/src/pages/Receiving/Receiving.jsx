import ReceivingGrid from "./ReceivingGrid";
import LineCard from "./LineCard";
import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext.jsx";
import ModalReceipt from "./ModalReceipt.jsx";
import ModalReceiptLine from "./ModalReceiptLine.jsx";

const Receiving = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [selectedExpReceipt, setSelectedExpReceipt] = useState(null);
  const [expreceiptDetails, setExpreceiptdetails] = useState([]);
  const [details, setDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenLine, setIsModalOpenLine] = useState(false);

  const queryDetails = (expreceiptno) => {
    fetch(
      `http://127.0.0.1:8000/expreceiptline/tenant=${user.tenant}&expreceiptno=${expreceiptno}`
    )
      .then((resp) => resp.json())
      .then((data) => setDetails(data));
  };

  const showDetails = (record) => {
    setSelectedExpReceipt(record);
    queryDetails(record.expreceiptno);
    setOpen(true);
  };

  const hideDetails = () => {
    setOpen(false);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const hideModalLine = () => {
    setIsModalOpenLine(false);
  };

  return (
    <>
      <ModalReceiptLine
        isOpen={isModalOpenLine}
        onClose={hideModalLine}
        details={selectedExpReceipt}
      />
      <ModalReceipt isOpen={isModalOpen} onClose={hideModal} />
      <div className="p-5">
        <div className="bg-white rounded-md p-3 flex justify-between">
          <h1 className="text-xl font-bold">Inventory Receipt</h1>
          <div className="">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg"
            >
              + New Receipt
            </button>
          </div>
        </div>
        <div className="flex pt-5 space-x-7">
          <div
            className={`bg-white transition-all duration-200 transform  ${
              open ? "w-2/3" : "w-full"
            }  h-auto p-3 rounded-md`}
          >
            <h1 className=" font-semibold text-lg">Expected Receipts</h1>
            <div className="h-full pt-3">
              <ReceivingGrid showDetails={showDetails} />
            </div>
          </div>
          <div
            className={`bg-white ${open ? "w-1/3" : "hidden"} p-3 rounded-md`}
          >
            <div className="flex justify-between">
              <h1 className="font-semibold text-lg">Receipt Details</h1>
              <p onClick={hideDetails}>close</p>
            </div>
            <div className="flex justify-between pt-3">
              <p>Receipt#:</p>
              <p>{selectedExpReceipt?.expreceiptno}</p>
            </div>
            <div className="flex justify-between pt-2">
              <p>Suplier:</p>
              <p>1234</p>
            </div>
            <div className="flex justify-between pt-2 pb-2">
              <p>Expected Date:</p>
              <p>1234</p>
            </div>
            <div className="border-t border-gray-200 "></div>
            <div className="flex justify-between pt-3 pb-3">
              <h1 className="">Items to Receive</h1>
              <button
                onClick={() => setIsModalOpenLine(true)}
                className="bg-blue-600 text-white px-1 py-2 rounded-lg"
              >
                + Line
              </button>
            </div>
            {details && details.length > 0 ? (
              details.map((detail, index) => (
                <LineCard
                  key={index}
                  detail={detail}
                  queryDetails={queryDetails}
                />
              ))
            ) : (
              <p>No lines</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Receiving;
