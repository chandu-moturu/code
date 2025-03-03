import React, { useEffect, useRef } from "react";
import pano  from './vitacura-360-drone.jpg'

const PanoramaViewer = () => {
  const viewerContainer = useRef(null);

  useEffect(() => {
    // Ensure Panolens and Three.js are loaded in the global window
    if (window.PANOLENS && window.THREE) {
      const panorama = new window.PANOLENS.ImagePanorama(
        pano
      );
      const viewer = new window.PANOLENS.Viewer({
        container: viewerContainer.current,
      });

      viewer.add(panorama);
    } else {
      console.error("Panolens.js or Three.js is not loaded");
    }

    return () => {
      // Cleanup on component unmount if necessary
    };
  }, []);

  return (
    <div ref={viewerContainer} style={{ width: "100%", height: "100vh" }} />
  );
};

export default PanoramaViewer;
