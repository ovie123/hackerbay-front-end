import React from 'react';

const Box = (props) => {
  const displayMatrix = () => {
    return props.data.map((item, i) => (
      <div className="square" key={i}>
        {item}
      </div>
    ));
  };
  return <div className="rows">{displayMatrix()}</div>;
};

export default Box;
