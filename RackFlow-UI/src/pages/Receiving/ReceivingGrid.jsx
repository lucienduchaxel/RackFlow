import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useState, useCallback } from "react";
import { themeQuartz } from "ag-grid-community";

const myTheme = themeQuartz.withParams({
  headerHeight: "30px",
  headerTextColor: "white",
  headerBackgroundColor: "rgba(59, 130, 246)",
  headerCellHoverBackgroundColor: "rgba(80, 40, 140, 0.66)",
  headerCellMovingBackgroundColor: "rgb(80, 40, 140)",
});

ModuleRegistry.registerModules([AllCommunityModule]);

const Button = (props) => {
  return <button className="rounded-md bg-red-600">Receive</button>;
};

const ReceivingGrid = () => {
  const [rowData, setRowData] = useState([
    { Expreciptno: "1", cust: "ME", price: 64950 },
    { Expreciptno: "2", cust: "ME", price: 33850 },
    { Expreciptno: "3", cust: "ME", price: 29600 },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "Expreciptno" },
    { field: "cust" },
    { field: "price" },
    { field: "Action", cellRenderer: Button, headerName: "" },
  ]);

  return (
    <div className="w-full h-full">
      <AgGridReact
        columnDefs={colDefs}
        sideBar={"columns"}
        rowData={rowData}
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
        //onGridReady={onGridReady}
      />
    </div>
  );
};

export default ReceivingGrid;
