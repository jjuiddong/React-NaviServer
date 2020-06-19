// Kakao map template
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

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

const LiveMap = ({ path, livePath, timeid, loading, fullscreen }) => {
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
    if (path && !path.getMap()) {
      path.setMap(_map);
    }

    if (livePath) {
      if (!livePath.getMap()) livePath.setMap(_map);

      // camera move to last position
      if (_map && livePath.getPath().length > 0) {
        _map.panTo(livePath.getPath()[livePath.getPath().length - 1]);
      }      
    }

  }, [path, livePath, _map]);

  return (
    <div>
      <LiveMapBlock fullscreen={fullscreen}>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </LiveMapBlock>
    </div>
  );
};

export default LiveMap;
