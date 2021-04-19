import React from 'react';
import './Markere.css';

const Marker = (props: any) => {
  const { color, name } = props;

  return (
    <div>
      <div className="pin bounce" style={{ backgroundColor: color, cursor: 'pointer' }} title={name} />
      <div className="pulse" />
    </div>
  );
};

export default Marker;
