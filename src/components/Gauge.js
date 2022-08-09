import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Chart from "react-google-charts";

export const options = {
  width: 1600,
  height: 480,
  redFrom: 55,
  redTo: 60,
  yellowFrom: 50,
  yellowTo: 55,
  greenFrom: 20,
  greenTo: 50,
  minorTicks: 15,
  max: 60,
};

const Gauge = () => {
  const [data, setData] = useState("0");
  const [city, setCity] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      axios
        .get("https://t2consult.net/test-tasks/airport-api/status/SFO")
        .then((res) => {
          setData(res.data.Weather.Temp[0].slice(8, 14));
          setCity(res.data);
        });
      console.log(data);
    }, 3000);

    return () => {
      clearInterval(id);
    };
  });

  return (
    <div>
      <h2>{city.City}</h2>
      <h4>Weather Temperature</h4>
      <Chart
        chartType="Gauge"
        width="100%"
        height="400px"
        data={[
          ["Label", "Value"],
          ["Temp °C", parseFloat(data)],
        ]}
        options={options}
      />
    </div>
  );
};

export default Gauge;
