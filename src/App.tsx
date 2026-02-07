import GridExample from "./components/GridExample";

function App() {
  return (
    <main className="dark bg-background text-foreground">
      <div className="max-w-7xl mx-auto flex min-h-screen flex-col px-6 py-12 gap-10">
        <h1 className="text-2xl font-medium">React AG Grid Example</h1>
        <GridExample />
      </div>
    </main>
  );
}

export default App;
