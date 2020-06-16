import React from 'react';
import MapContainer from "../containers/MapContainer";
import Header from "../components/Header";

const Detail = () => {
    return (
        <div>
          <Header></Header>
          <MapContainer fullscreen={true}></MapContainer>
        </div>
    );
};

export default Detail;