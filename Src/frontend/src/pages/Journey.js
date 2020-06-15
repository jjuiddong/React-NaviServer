import React, { useEffect } from "react";
//import Map from "../components/Map";
//import styled from "styled-components";
import { Tab } from "semantic-ui-react";
//import JourneyList from "../components/JourneyList";
//import LandmarkList from "../components/LandmarkList";
import JourneyListContainer from '../containers/JourneyListContainer';
import LandmarkListContainer from '../containers/LandmarkListContainer';
import MapContainer from '../containers/MapContainer';

// const Tabs = styled.div`
//   display: flex;
//   margin-top: 0.2rem;
// `;

// const TabButton = styled.button`
//   margin-left: 0.5rem;
//   font-size: 1.4rem;
// `;

const panes = [
  {
    menuItem: "Journey",
    render: () => <JourneyListContainer></JourneyListContainer>,
  },
  {
    menuItem: "LandMark",
    render: () => <LandmarkListContainer></LandmarkListContainer>,
  },
];

const Journey = () => {
  useEffect(() => {});

  return (
    <div>
      <MapContainer></MapContainer>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </div>
  );
};

export default Journey;
