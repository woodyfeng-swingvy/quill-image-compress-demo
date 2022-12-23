import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import Quill from "quill";
import ImageCompress from "quill-image-compress";

const moduleName = "modules/imageCompress";
Quill.register(moduleName, ImageCompress, true);

const calc = (quill) => JSON.stringify(quill.getContents()).length;

const createDemo = (mode, modules) => () => {
  const quill = useRef(null);
  const container = useRef();
  const output = useRef();
  useEffect(() => {
    if (quill.current == null) {
      quill.current = new Quill(`#${mode}`, {
        modules: {
          toolbar: ["image"],
          ...modules
        },
        placeholder: `Mode: ${mode}, please upload an image`,
        theme: "snow"
      });
      quill.current.on("editor-change", () => {
        output.current.innerText = calc(quill.current);
      });
    }
    return () => {
      if (quill.current == null && container.current != null) {
        container.current.innerHTML = "";
      }
    };
  }, []);
  return (
    <div style={{ width: "100%", margin: 10 }}>
      <h4>{mode}</h4>
      <div id="container" ref={container}>
        <div style={{ height: "65vh" }} id={mode}></div>
      </div>
      <p>
        Approximate RichText 'source' size: <span ref={output} />
      </p>
    </div>
  );
};

const Baseline = createDemo("baseline");
const Compression = createDemo("compression", { imageCompress: {} });

export default function App() {
  return (
    <div>
      <h1>Quill image compression experiment</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Baseline />
        <Compression />
      </div>
    </div>
  );
}
