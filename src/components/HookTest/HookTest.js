import React, { useState, useCallback } from 'react';

const HookTest = () => {
  const [count, setCount] = useState(0);

  const [value, setValue] = useState(0);

  const onChange = useCallback(
    e => {
      return setValue(e.target.value);
    },
    [value]
  );

  return (
    <div>
      <div
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </div>
      <Input value={value} onChange={onChange} />
    </div>
  );
};

const Input = ({ onChange, value }) => {
  console.log('render');
  return <input value={value} onChange={onChange} />;
};

export default HookTest;
