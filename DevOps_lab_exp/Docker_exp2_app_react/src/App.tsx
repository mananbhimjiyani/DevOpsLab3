import Button from "./components/Button";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);
  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>Alert!!!</Alert>
      )}
      <Button color="dark" onClick={() => setAlertVisibility(true)}>
        click me
      </Button>
    </div>
  );
}

export default App;
