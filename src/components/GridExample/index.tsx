import generateTrades from "@/data/generateTrades";
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";

// Register Grid Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const GridExample = () => {
  // generate 10000 trades for the grid to demonstrate performance with large datasets
  const rowData = useMemo(() => generateTrades(10), []);

  // Define the columns to be rendered in the grid, along with any custom formatting for the values.
  const colomnDefs: ColDef[] = [
    { field: "id", headerName: "Id", hide: true },
    {
      field: "time",
      headerName: "Time",
      valueFormatter: (params) =>
        new Date(params.value).toLocaleString().replace(", ", " - "),
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
  ];

  const defaultColDef = {
    flex: 1,
  };

  return (
    <div className="h-screen w-full">
      <AgGridReact
        rowData={rowData}
        columnDefs={colomnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default GridExample;
