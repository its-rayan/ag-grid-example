import GridExample from "./components/GridExample";

function App() {
  return (
    <main className="dark bg-background text-foreground">
      <div className="flex min-h-screen flex-col p-6 gap-10">
        <GridExample />
      </div>
    </main>
  );
}

export default App;
