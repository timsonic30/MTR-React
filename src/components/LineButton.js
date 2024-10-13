import Line from "../line";

const LineButton = ({ selectLine, onClick }) => {
  const line = Line();
  let result = [];

  for (let linecode in line) {
    const onClickhandler = () => {
      onClick(linecode); // so selectLine = linecode
    };

    result.push(
      <div
        className="button"
        key={linecode}
        style={{
          color: selectLine === linecode ? "#FFFFFF" : line[linecode].color,
          backgroundColor:
            selectLine === linecode ? line[linecode].color : "#FFFFFF",
          border: `2px solid ${line[linecode].color}`,
          fontWeight: "bold",
        }}
        onClick={onClickhandler}
      >
        {line[linecode].text}
      </div>
    );
  }

  return result;
};

export default LineButton;
