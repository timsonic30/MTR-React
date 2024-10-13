import Line from "../line";
const TrainSection = ({ dataSet, direction, linecode }) => {
  const line = Line();
  let station = [];
  let color = null;
  let destinationLabel = "";

  for (let el in line) {
    if (el === linecode) {
      station = line[el]["sta"];
      color = line[el]["color"];
      direction === "DOWN"
        ? (destinationLabel = line[el]["sta"][0].name)
        : (destinationLabel = line[el]["sta"][line[el]["sta"].length - 1].name);
    }
  }

  return (
    <>
      <div
        className="cardSection"
        style={{ border: `1px solid ${color}`, borderRadius: "5px" }}
      >
        <div
          className="label"
          style={{ color: `#000000` }}
        >{`To ${destinationLabel}`}</div>
        <div className="Train">
          {dataSet.map((datum) => {
            return (
              <TrainCard
                key={datum["1"]}
                datum={datum}
                station={station}
                color={color}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const TrainCard = ({ datum, station, color }) => {
  //   console.log("The station is :" + JSON.stringify(station, null, 1)); //{code: 'HOK', name: 'Hong Kong', ...}
  //   console.log({ datum });
  //   const destination = station.find((st) => st.code === datum["0"]["dest"]).name;
  //   //   const stationName = station.find((st) => st.code === datum["1"]).name;
  //   const platform = datum["0"]["plat"];
  //   const time = datum["0"]["time"].split(" ")[1].substring(0, 5);

  //=====================================//
  const line = Line();

  // Find destination and current station
  // remove this one will get error for EWL as some datum is undefined
  if (!datum["0"]) {
    return null;
  }
  const destinationStation = station.find(
    (st) => st.code === datum["0"]["dest"]
  );
  const currentStation = station.find((st) => st.code === datum["1"]);

  // Check if stations were found

  const destinationName = destinationStation
    ? destinationStation.name
    : "Unknown Destination";

  const stationName = currentStation ? currentStation.name : "Unknown Station";

  const platform = datum["0"]["plat"];
  const time = datum["0"]["time"].split(" ")[1].substring(0, 5);

  return (
    <div
      className="Card"
      style={{
        color: "#FFFFFF",
        backgroundColor: color,
        border: `1px solid ${color}`,
        borderRadius: "10px",
      }}
    >
      <p
        className="name"
        style={{ display: "inline-block", borderBottom: "2px solid #FFFFFF" }}
      >
        {stationName}
      </p>
      <p>終點站: {destinationName}</p>
      <p>下班列車: {time}</p>
      <p>開出月台: {platform}</p>
    </div>
  );
};

export default TrainSection;
