// Kakao map template
import React, {useEffect} from 'react';

const Map = () => {

    useEffect(()=>{
        const API_KEY = process.env.REACT_APP_API_KEY;
        const script = document.createElement("script");
        script.async = true;
        script.src =
          "https://dapi.kakao.com/v2/maps/sdk.js?appkey=" + API_KEY + "&autoload=false";
        document.head.appendChild(script);


    }, []);


    return (
        <div>
            
        </div>
    );
};

export default Map;