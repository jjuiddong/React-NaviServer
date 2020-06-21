// Kakao map template
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import "./css/Map.css";
import { Checkbox } from "semantic-ui-react";

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

const CheckBoxBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.3rem;
  & + & {
    margin-left: 1rem;
  }
`;

const Map = ({ timeid, jpaths, loading, fullscreen }) => {
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

  // show/hid path line
  // show tooltip, marker
  useEffect(() => {
    if (!jpaths) return;

    // show/hide path polyline
    jpaths.forEach((journey) => {
      if (journey.show) {
        journey.polyline.setMap(_map);
      } else {
        journey.polyline.setMap(null);
      }
    });

    // 1 hour tooltip, marker
    jpaths.forEach((journey) => {
      var i = 0;
      for (i = 0; i < journey.markers.length; ++i) {
        journey.markers[i].setMap(journey.show ? _map : null);
      }
      for (i = 0; i < journey.timeLines.length; ++i) {
        journey.timeLines[i].setMap(journey.show ? _map : null);
      }
    }); // ~jpaths foreach
  }, [jpaths, _map]);

  // show/hide marker, timeline
  const onCheck = (event, data) => {
    if (data.label === "Marker") {
      jpaths.forEach((journey) => {
        for (var i = 0; i < journey.markers.length; ++i) {
          journey.markers[i].setMap(journey.show && data.checked ? _map : null);
        }
      }); // ~jpaths foreach
    } else if (data.label === "TimeLine") {
      jpaths.forEach((journey) => {
        for (var i = 0; i < journey.timeLines.length; ++i) {
          journey.timeLines[i].setMap(
            journey.show && data.checked ? _map : null
          );
        }
      }); // ~jpaths foreach
    }
  };

  return (
    <div>
      <MapBlock fullscreen={fullscreen}>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </MapBlock>
      <CheckBoxBlock>
        <Checkbox
          toggle
          defaultChecked
          label="Marker"
          onClick={onCheck}
        ></Checkbox>
        <Checkbox
          toggle
          defaultChecked
          label="TimeLine"
          onClick={onCheck}
        ></Checkbox>
      </CheckBoxBlock>
    </div>
  );
};

export default Map;
