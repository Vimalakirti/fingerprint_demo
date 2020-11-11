import React, { useEffect, useState } from "react";
import sha1 from "js-sha1";
import {
  computeFingerprint,
  computeFingerprintComponents,
} from "./device_features";

function Row({ name, value }) {
  return (
    <tr>
      <td>{name}</td>
      <td style={{ whiteSpace: "pre-wrap" }}>{value}</td>
    </tr>
  );
}

function App() {
  let [fingerprint, setFingerprint] = useState(null);
  let [components, setComponents] = useState(null);
  let [begin, setBegin] = useState(false);

  useEffect(() => {
    computeFingerprint().then(setFingerprint);
    computeFingerprintComponents().then(setComponents);
  }, [begin]);

  if (!begin || !fingerprint || !components) {
    return (
      <div className="ui container">
        <h1>"Welcome to NTU fingerprint:"</h1>
        <button class="positive ui big button" onClick={()=>{setBegin(true)}}>Compute My Fingerprint</button>
      </div>
    );
  }

  return (
    <div className="ui container">
      <h1>Your Fingerprint: <h1 className="ui red header">{fingerprint}</h1></h1>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <Row name="Device pixel ratio" value={components.devicePixelRatio} />
          <Row name="Platform" value={components.platform} />
          <Row name="User-agent" value={components.userAgent} />
          <Row name="Plugins" value={components.plugins} />
          <Row name="Request headers" value={components.headers} />
          <Row name="Date format" value={components.dateFormat} />
          <Row name="Fonts" value={components.fonts} />
          <Row
            name="Canvas 2D render"
            value={
              <>
                <img
                  src={components.canvas2dRender}
                  style={{
                    imageRendering: "pixelated",
                    width: "400px",
                  }}
                  alt="Canvas 2D render"
                />
                <div>{sha1(components.canvas2dRender)}</div>
              </>
            }
          />
          <Row name="WebGL renderer info" value={components.webglRenderer} />
          <Row
            name="WebGL render"
            value={
              <>
                <img
                  src={components.webglRender}
                  style={{
                    imageRendering: "pixelated",
                    width: "200px",
                  }}
                  alt="WebGL render"
                />
                <div>{sha1(components.webglRender)}</div>
              </>
            }
          />
          <Row
            name="Battery Level (unstable)"
            value={components.batteryLevel}
          />
          <Row
            name="Battery Charging (unstable)"
            value={String(components.batteryCharging)}
          />
          <Row
            name="IP"
            value={String(components.ip)}
          />
        </tbody>
      </table>
    </div>
  );
}

export default App;