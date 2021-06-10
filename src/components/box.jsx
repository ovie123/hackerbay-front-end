import React from 'react';

const Box = (props) => {
  const displayMatrix = () => {
    return props.data.map((item, i) => (
      <div className="box" key={i}>
        {item}
      </div>
    ));
  };
  return <div className="container">{displayMatrix()}</div>;
};

export default Box;
