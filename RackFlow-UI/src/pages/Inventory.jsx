import Grid from "../components/Grid.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";

const Inventory = () => {

  return (
    <div className="h-full  p-5 dark:bg-slate-700">
        <div>
            <h1 className="text-4xl text-blue-500 font-bold">Inventory</h1>
        </div>
      <div className="flex items-center justify-content my-5 space-x-4   dark:bg-slate-800">
        <Card title="76" content="Total Inventory" />
        <Card title="30" content="Available Inventory" />
        <Card title="12" content="On Hold" />
        <Card title="30%" content="Total Capacity" />
      </div>
      {/* <div className="flex items-center justify-start space-x-4 py-1 mb-5">
      <Button content="Update" />
      <Button content="Add" />
      <Button content="Delete" />
      </div> */}

      <div className="h-3/5">
        <Grid 
        datasource={"inventory"} 
        fields={[
            { field: "itemid" },
            { field: "packid" },
            { field: "location" },
            { field: "quantity" },
          ]} />
      </div>
    </div>
  );
};

export default Inventory;
