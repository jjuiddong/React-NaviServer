import React, { useEffect } from "react";
//import styled from "styled-components";
import { Tab } from "semantic-ui-react";
import JourneyListContainer from '../containers/JourneyListContainer';
import LandmarkListContainer from '../containers/LandmarkListContainer';
import MapContainer from '../containers/MapContainer';
import Header from '../components/Header';

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
      <Header></Header>
      <MapContainer></MapContainer>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </div>
  );
};

export default Journey;
