import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useState, useCallback } from "react";
import { useUser } from "../../contexts/UserContext.jsx";

import { themeQuartz } from "ag-grid-community";

const myTheme = themeQuartz.withParams({
  headerHeight: "30px",
  headerTextColor: "white",
  headerBackgroundColor: "rgba(59, 130, 246)",
  headerCellHoverBackgroundColor: "rgba(80, 40, 140, 0.66)",
  headerCellMovingBackgroundColor: "rgb(80, 40, 140)",
});

ModuleRegistry.registerModules([AllCommunityModule]);

const ReceivingGrid = ({ showDetails }) => {
  const [RowData, setRowData] = useState([]);
  const { user } = useUser();

  const onClickShowDetails = (props) => {
    return (
      <button
        onClick={() => showDetails(props.data)}
        className="rounded-md bg-red-600"
      >
        Details
      </button>
    );
  };

  const onGridReady = useCallback((params) => {
    fetch(`http://127.0.0.1:8000/expreceipt/tenant=${user.tenant}`)
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "expreceiptno" },
    { field: "purchaseorder" },
    { field: "Action", cellRenderer: onClickShowDetails },
  ]);

  return (
    <div className="" style={{ height: "400px", width: "100%" }}>
      <AgGridReact
        columnDefs={colDefs}
        sideBar={"columns"}
        rowData={RowData}
        defaultColDef={{
          flex: 1,
          resizable: true,
          editable: false,
          enableRowGroup: true,
          enablePivot: true,
          enableValue: true,
          sortable: true,
          filter: true,
          minWidth: 100,
        }}
        theme={myTheme}
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default ReceivingGrid;
