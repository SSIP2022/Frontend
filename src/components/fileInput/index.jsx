import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function FileInput({ setFileCount }) {
    const [fileName, setFileName] = useState("");
    return (
      <React.Fragment>
        <div style={{ display: "flex" }}>
          <input
            placeholder="Doc Name"
            value={fileName}
            type="text"
            required
            data-filename
            onChange={(e) => {
              setFileName(e.target.value);
              e.target.focus();
            }}
            name="filename"
            autoComplete="off"
          />
          <input data-ticketfile id="files" type="file" required name="file" />
          <div
            style={{
              border: "1px solid black",
              marginRight: "10px",
              padding: "5px",
              borderRadius: "5px",
              height: "45px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => setFileCount((prev) => prev - 1)}
          >
            {" "}
            <FaTimes />{" "}
          </div>
        </div>
      </React.Fragment>
    );
  }