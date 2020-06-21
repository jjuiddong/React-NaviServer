import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import "./css/LiveMap.css";
import { Checkbox } from "semantic-ui-react";

const LiveMapBlock = styled.div`
  width: 100%;
  height: 500px;
  background-color: black;

  ${(props) =>
    props.fullscreen &&
    css`
      height: 75vh;
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

const LiveMap = ({
  todayJourney,
  liveJourney,
  timeid,
  loading,
  fullscreen,
}) => {
  const [_map, setMap] = useState(null);
  const [_overlay, setOverlay] = useState(null);
  const [_showMarker, setShowMarker] = useState(true);
  const [_showTimeLine, setShowTimeLine] = useState(true);

  // update overlay
  useEffect(() => {
    const tpl = todayJourney.polyLine;
    const lpl = liveJourney.polyLine;
    var curPos =
      lpl && lpl.getPath().length > 0
        ? lpl.getPath()[lpl.getPath().length - 1]
        : tpl && tpl.getPath().length > 0
        ? tpl.getPath()[tpl.getPath().length - 1]
        : null;

    if (!curPos) {
      return;
    }

    // current position overlay
    const { kakao } = window;

    // overlay, total journey hour, distance
    const tp = todayJourney.path;
    const lp = liveJourney.path;

    var startTime =
      tp && tp.length > 0 ? new Date(tp[0].date_time) : new Date.now();
    var lastTime =
      lp && lp.length > 0
        ? new Date(lp[lp.length - 1].date_time)
        : tp && tp.length > 0
        ? new Date(tp[tp.length - 1].date_time)
        : new Date.now();

    var totHours = lastTime.getTime() - startTime.getTime();
    var totDistance = 0;
    totDistance += tpl ? tpl.getLength() : 0;
    totDistance += lpl ? lpl.getLength() : 0;

    var content =
      '<div class ="label"><span class="left"></span><span class="center">' +
      "Distance = " +
      (totDistance / 1000).toFixed(2) +
      "km" +
      ", Time = " +
      (totHours / (1000 * 60 * 60)).toFixed(1) +
      "h" +
      '</span><span class="right"></span></div>';

    if (!_overlay) {
      var customOverlay = new kakao.maps.CustomOverlay({
        map: _map,
        zIndex: 100,
        position: curPos,
        content: content,
      });
      setOverlay(customOverlay);
    } else {
      _overlay.setMap(_map);
      _overlay.setContent(content);
      _overlay.setPosition(curPos);
    }
  }, [todayJourney, liveJourney, _map, _overlay]);

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

  // update map camera, tooltip
  useEffect(() => {
    const tpl = todayJourney.polyLine;
    const lpl = liveJourney.polyLine;
    if (tpl && !tpl.getMap()) {
      tpl.setMap(_map);
    }

    if (lpl) {
      if (!lpl.getMap()) lpl.setMap(_map);

      // camera move to last position
      var curPos =
      lpl && lpl.getPath().length > 0
        ? lpl.getPath()[lpl.getPath().length - 1]
        : tpl && tpl.getPath().length > 0
        ? tpl.getPath()[tpl.getPath().length - 1]
        : null;
    
      if (curPos && _map) _map.panTo(curPos);
    }

  }, [todayJourney.polyLine, liveJourney.polyLine, _map]);


  // show/hide marker, timeline
  useEffect(() => {
    if (todayJourney.markers) {
      for (var i = 0; i < todayJourney.markers.length; ++i) {
        if (_showMarker && !todayJourney.markers[i].getMap())
          todayJourney.markers[i].setMap(_map);
        else if (!_showMarker)
          todayJourney.markers[i].setMap(null);
      }
    }
    if (todayJourney.timeLines) {
      for (var i = 0; i < todayJourney.timeLines.length; ++i) {
        if (_showTimeLine && !todayJourney.timeLines[i].getMap())
          todayJourney.timeLines[i].setMap(_map);
        else if (!_showTimeLine)
          todayJourney.timeLines[i].setMap(null);
     }     
    }
  }, [todayJourney.markers, todayJourney.timeLines, _map, 
    _showMarker, _showTimeLine]);

  // show/hide marker, timeline
  const onCheck = (event, data) => {
    if (data.label === "Marker") {
      setShowMarker(data.checked);
    } else if (data.label === "TimeLine") {
      setShowTimeLine(data.checked);
    }
  };

  return (
    <div>
      <LiveMapBlock fullscreen={fullscreen}>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </LiveMapBlock>
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

export default LiveMap;
