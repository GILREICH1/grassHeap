import React from 'react';
import { TruthySunRequirements } from '../../../common/types';

interface CheckBoxProps {
  onChange: ({
    checked,
    value,
  }: {
    checked: boolean;
    value: TruthySunRequirements;
  }) => void;
  label: string;
  value: TruthySunRequirements;
}

const CheckBox = ({ onChange, label, value }: CheckBoxProps): JSX.Element => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ checked, value });
    setChecked(e.target.checked);
  };

  return (
    <div>
      <input
        id={label}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default React.memo(CheckBox);
