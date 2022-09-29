import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import 'react-dropzone-uploader/dist/styles.css'
import CustomPreview from "./components/upload";
import Previews from "./components/Previews";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        setMessage("LIFF init succeeded.");
      })
      .catch((e) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  });

  return (
    <div className="App">
      <h1>LIFFPOC-upload-example</h1>
      {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      <a
        href="https://developers.line.biz/ja/docs/liff/"
        target="_blank"
        rel="noreferrer"
      >
        LIFF Documentation
      </a>
        <CustomPreview/>
        {/*<Previews/>*/}

    </div>
  );
}

export default App;
