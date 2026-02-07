import generateTrades from "@/data/generateTrades";
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from "ag-grid-community";
import { AgGridReact, type CustomCellRendererProps } from "ag-grid-react";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

// Register Grid Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const SideFormatter = (props: CustomCellRendererProps) => {
  const side = props.value as string;
  return (
    <Button
      size="sm"
      className={
        side === "Buy"
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-red-500 text-white hover:bg-red-600"
      }
      onClick={() =>
        confirm(`Are you sure you want to ${side} ${props.data.stock_name}?`)
      }
    >
      {side}
    </Button>
  );
};

const ActionFormatter = (props: CustomCellRendererProps) => {
  const { data } = props;
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() =>
        prompt(
          `Leave a comment for ${data.stock_name} (${data.stock_symbol}) trade with id ${data.id}`,
        )
      }
    >
      Leave a comment
    </Button>
  );
};

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
      filter: "agTextColumnFilter",
    },
    {
      field: "stock_symbol",
      headerName: "Stock Symbol",
      filter: "agTextColumnFilter",
    },
    {
      field: "stock_name",
      headerName: "Stock Name",
      filter: "agTextColumnFilter",
    },

    {
      field: "quantity",
      headerName: "Quantity",
      filter: "agNumberColumnFilter",
    },
    {
      field: "price",
      headerName: "Price",
      valueFormatter: (params) => `$${params.value}`,
      filter: "agTextColumnFilter",
    },
    { field: "side", headerName: "Side", cellRenderer: SideFormatter },
    { field: "status", headerName: "Status", filter: "agTextColumnFilter" },
    { field: "action", headerName: "Action", cellRenderer: ActionFormatter },
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
