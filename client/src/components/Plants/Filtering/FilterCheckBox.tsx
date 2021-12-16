import React from 'react';

interface CheckBoxProps {
  onChange: ({ checked, value }: { checked: boolean; value: string }) => void;
  label: string;
  value: string;
}

const CheckBox = ({ onChange, label, value }: CheckBoxProps): JSX.Element => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (e: any) => {
    onChange({ checked, value });
    setChecked(e.target.checked);
  };

  return (
    <>
      <input
        id={label}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={label}>{label}</label>
    </>
  );
};

export default React.memo(CheckBox);
