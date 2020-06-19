// Kakao map template
import React, { useState, useEffect } from "react";
import styled, {css} from "styled-components";

const MapBlock = styled.div`
  width: 100%;
  height: 400px;
  background-color: black;

  ${(props) =>
    props.fullscreen &&
    css`
      height: 90vh;
    `}
`;

const Map = ({ path, timeid, jpaths, loading, fullscreen }) => {
  const [_map, setMap] = useState(null);

  useEffect(() => {
    const { kakao } = window;
    kakao.maps.load(() => {
      let el = document.getElementById("map");
      let map = new kakao.maps.Map(el, {
        center: new kakao.maps.LatLng(37.450701, 126.970667),
        level: 13,
      });
      setMap(map);
    });
  }, []);

  useEffect(() => {
    if (jpaths) {
      jpaths.forEach((journey) => {
        if (journey.show) journey.polyline.setMap(_map);
        else journey.polyline.setMap(null);
      });
    }
  }, [jpaths, _map]);

  return (
    <div>
      <MapBlock fullscreen={fullscreen}>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </MapBlock>
    </div>
  );
};

export default Map;
