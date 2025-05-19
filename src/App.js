import AppRoutes from "./routes/AppRoutes";
import { BugProvider } from "./context/BugContext";

function App() {
  return (
    <BugProvider>
      <AppRoutes />
      
    </BugProvider>
  );
}

export default App;
