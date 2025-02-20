import React from "react";

const ARComponent = () => {
  return (
    <div>
      <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
      <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>

      <a-scene embedded arjs>
        <a-marker preset="hiro">
          <a-entity position="0 0 0" rotation="0 0 0" scale="1 1 1">
            <a-text value="Pose Suggestion" color="white" align="center"></a-text>
          </a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};

export default ARComponent;
