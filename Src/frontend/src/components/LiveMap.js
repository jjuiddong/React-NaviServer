// Kakao map template
import React, { useState, useEffect } from "react";
import styled, {css} from "styled-components";

const LiveMapBlock = styled.div`
  width: 100%;
  height: 500px;
  background-color: black;

  ${(props) =>
    props.fullscreen &&
    css`
      height: 80vh;
    `}
`;

const LiveMap = ({ path, timeid, loading, fullscreen }) => {
  const [_map, setMap] = useState(null);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=" +
      API_KEY +
      "&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window;
      kakao.maps.load(() => {
        let el = document.getElementById("map");
        let map = new kakao.maps.Map(el, {
          center: new kakao.maps.LatLng(37.450701, 126.970667),
          level: 13,
        });
        setMap(map);
      });
    };
  }, []);

  useEffect(() => {
      if (path) {
          path.setMap(_map);

          // camera move to last position
          if (_map && (path.getPath().length > 0)) {
            _map.panTo(path.getPath()[path.getPath().length - 1]
            );
          }
      }
  }, [path, _map]);

  return (
    <div>
      <LiveMapBlock fullscreen={fullscreen}>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </LiveMapBlock>
    </div>
  );
};

export default LiveMap;
