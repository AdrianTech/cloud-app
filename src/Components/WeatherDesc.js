import React from "react";

const Desc = ({ desc }) => {
  let description = null;
  description = desc.map(item => (
    <p style={{ left: item.description.length > 23 ? "-10px" : "" }} key={item.id}>
      {" "}
      <span style={{ fontSize: item.description.length > 22 ? "0.9em" : "" }}>{item.description.charAt(0).toUpperCase() + item.description.slice(1).toLowerCase()}</span>
    </p>
  ));
  return <div className="info">{description[0]}</div>;
};

export default Desc;
