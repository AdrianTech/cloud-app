import React from "react";

const Desc = ({ desc }) => {
   let description = null;
   description = desc.map(item => (
      <p key={item.id}>
         {" "}
         <span>{item.description.charAt(0).toUpperCase() + item.description.slice(1).toLowerCase()}</span>
      </p>
   ));
   return <div className="info">{description[0]}</div>;
};

export default Desc;
