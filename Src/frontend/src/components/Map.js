// Kakao map template
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MapBlock = styled.div`
  width: 100%;
  height: 500px;
  background-color: black;
`;

const Map = ({ paths, loading }) => {
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
    if (paths) {
      const { kakao } = window;
      var linePath = [];
      paths.map((item) =>
        linePath.push(
          new kakao.maps.LatLng(parseFloat(item.lat), parseFloat(item.lon))
        )
      );
      var polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeStyle: "solid",
      });
      polyline.setMap(_map);
    }
  }, [paths, _map]);

  return (
    <div>
      <MapBlock>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </MapBlock>
    </div>
  );
};

export default Map;
