import Grid from "../components/Grid.jsx";

const Users = () => {

  return (
    <div className="h-full  p-5 dark:bg-slate-700">
        <div>
            <h1 className="text-4xl text-blue-500 font-bold">Users</h1>
        </div>
      <div className="h-3/5">
        <Grid 
        datasource={"users"} 
        fields={[
            { field: "username" },
            { field: "email" },
          ]} />
      </div>
    </div>
  );
};

export default Users;
