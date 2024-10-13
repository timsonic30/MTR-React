import "./App.css";
import { useState } from "react";
import Line from "./line";
import LineButton from "./components/LineButton";
import TrainSection from "./components/TrainSection";

function App() {
  const [time, setTime] = useState("");
  const [selectLine, setLine] = useState("");
  const [upDataSet, setUpDataSet] = useState([]);
  const [downDataSet, setDownDataset] = useState([]);
  // const [isLoading, setLoading] = useState(false);

  const onClick = async (selectLine) => {
    setLine(selectLine); // so selectLine = linecode [which you click] and for fetching
    // setLoading(true);
    const { up, down, time } = await getData(selectLine);

    setUpDataSet(up);
    setDownDataset(down);
    setTime(time);
    // setLoading(false);
  };

  return (
    <div className="container">
      <header className="lineBtn">
        <LineButton selectLine={selectLine} onClick={onClick} />
      </header>
      {upDataSet.length > 0 && <div className="time">最後更新時間：{time}</div>}
      <main>
        {upDataSet.length > 0 && (
          <TrainSection
            dataSet={upDataSet}
            direction="UP"
            linecode={selectLine}
          />
        )}
        {downDataSet.length > 0 && (
          <TrainSection
            dataSet={downDataSet}
            direction="DOWN"
            linecode={selectLine}
          />
        )}
      </main>
    </div>
  );
}

async function getData(selectLine) {
  const api = "https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php";
  const station = Line()[selectLine].sta; // {code: 'NOP', name: 'North Point',...}
  let up = [];
  let down = [];

  const data = station.map(async (sta) => {
    const res = await fetch(`${api}?line=${selectLine}&sta=${sta.code}`); // sta mean {code: 'NOP', name: 'North Point'}
    const result = await res.json();
    return result;
  });

  const output = await Promise.all(data); // since data is an array of the Promise for each station, we need to use "await" again

  for (let idx in output) {
    const lineStationCode = `${selectLine}-${station[idx].code}`;
    // console.log(lineStationCode);
    // console.log(output[idx]);
    // console.log(output[idx].data[lineStationCode]);
    if (output[idx].data[lineStationCode].UP)
      up.push([output[idx].data[lineStationCode].UP[0], station[idx].code]);
    if (output[idx].data[lineStationCode].DOWN)
      down.push([output[idx].data[lineStationCode].DOWN[0], station[idx].code]);
  }

  down = down.reverse();

  const time = output[0]?.sys_time;
  return { up, down, time };
}

export default App;
