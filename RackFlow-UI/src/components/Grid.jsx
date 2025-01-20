import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useState, useCallback } from "react";
import { themeQuartz } from "ag-grid-community";
import { useUser } from "../contexts/UserContext.jsx";

const myTheme = themeQuartz.withParams({
    headerHeight: '30px',
    headerTextColor: 'white',
    headerBackgroundColor: 'rgba(59, 130, 246)',
    headerCellHoverBackgroundColor: 'rgba(80, 40, 140, 0.66)',
    headerCellMovingBackgroundColor: 'rgb(80, 40, 140)',
});

ModuleRegistry.registerModules([AllCommunityModule]);

const Grid = ({datasource,fields}) => {
  const [RowData, setRowData] = useState([])
  const {user} = useUser()

  const onGridReady = useCallback((params) => {
    fetch(`http://127.0.0.1:8000/${datasource}/tenant=${user.tenant}`)
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
      console.log(data)
  }, []);

  // Column Definitions: Defines the columns to be displayed.
  const [columnDefs, setColumnDefs] = useState(fields);

  return (
    <div className="w-full h-full">
      <AgGridReact
        columnDefs={columnDefs}
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

export default Grid;
