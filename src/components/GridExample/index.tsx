import generateTrades from "@/data/generateTrades";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";

// Register Grid Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const GridExample = () => {
  // generate 10000 trades for the grid to demonstrate performance with large datasets
  const rowData = useMemo(() => generateTrades(), []);
  console.log({ rowData });

  const defaultColDef = {
    flex: 1,
  };

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className="h-screen w-full">
      <AgGridReact
        rowData={rowData}
        columnDefs={[
          { field: "id", headerName: "ID" },
          {
            field: "time",
            headerName: "Time",
            valueFormatter: (params) => new Date(params.value).toLocaleString(),
          },
          { field: "stock_symbol", headerName: "Stock Symbol" },
          { field: "stock_name", headerName: "Stock Name" },
          { field: "quantity", headerName: "Quantity" },
          {
            field: "price",
            headerName: "Price",
            valueFormatter: (params) => `$${params.value}`,
          },
          { field: "status", headerName: "Status" },
        ]}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default GridExample;
