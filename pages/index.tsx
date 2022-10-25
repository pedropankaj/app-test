import react, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

// export const data1 = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

const Home: NextPage = () => {
  const [labels, setLabels] = useState([]);
  const initialState = {
    labels: [],
    datasets: [
      {
        label: 1,
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  } as any;

  const [data3, setData3] = useState(initialState);
  const [confusData, setConfusData] = useState(initialState);
  const [retausData, setRetausData] = useState(initialState);

  const [data2, setData2] = useState([]);
  const getData = () => {
    fetch(
      "https://www.econdb.com/api/series/CPIUS/?from=2019-06-30&to=2020-02-15&format=json",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then(function (response) {
        console.log("response", response);
        // console.log("data", data);
        return response.json();
      })
      .then(function (myJson) {
        console.log("myJson", myJson);
        // setData2(myJson);
        setData3({
          ...data3,
          labels: myJson.data.dates,
          datasets: [
            {
              ...data3,
              data: myJson.data.values,
              label: `${myJson.ticker} ${myJson.description}`,
            },
          ],
        });
      });
  };
  const getConfusData = () => {
    fetch(
      "https://www.econdb.com/api/series/CONFUS/?from=2019-06-30&to=2020-02-15&format=json",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then(function (response) {
        // console.log("response", response);
        // console.log("data", data);
        return response.json();
      })
      .then(function (myJson) {
        // console.log("myJson", myJson);
        // setData2(myJson);
        setConfusData({
          ...confusData,
          labels: myJson.data.dates,
          datasets: [
            {
              ...confusData,
              data: myJson.data.values,
              label: `${myJson.ticker} ${myJson.description}`,
            },
          ],
        });
      });
  };
  const getRetausData = () => {
    fetch(
      "https://www.econdb.com/api/series/RETAUS/?from=2019-06-30&to=2020-02-15&format=json",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then(function (response) {
        // console.log("response", response);
        // console.log("data", data);
        return response.json();
      })
      .then(function (retaus) {
        console.log("retaus", retaus);
        // setData2(myJson);
        setRetausData({
          ...retausData,
          labels: retaus.data.dates,
          datasets: [
            {
              ...retausData,
              data: retaus.data.values,
              label: `${retaus.ticker} ${retaus.description}`,
            },
          ],
        });
      });
  };
  useEffect(() => {
    getData();
    getConfusData();
    getRetausData();
  }, []);
  console.log("data3", data3);
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div>{data3 && <Line options={options} data={data3} />}</div>
        <div>
          {confusData && <Line options={options} data={confusData} />}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><Bar options={options} data={retausData} /></div>
        <div>{/* <Line options={options} data={data} /> */}</div>
      </div>
    </div>
  );
};

export default Home;
