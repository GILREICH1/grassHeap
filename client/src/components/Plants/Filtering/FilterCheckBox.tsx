import { Checkbox } from '@mui/joy';
import React from 'react';
import { TruthySunRequirements } from '../../../common/types';

type OnChange = ({
  checked,
  value,
}: {
  checked: boolean;
  value: TruthySunRequirements;
}) => void;

interface CheckBoxProps {
  onChange: OnChange;
  value: TruthySunRequirements;
}

const CheckBox = ({ onChange, value }: CheckBoxProps): JSX.Element => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ checked, value });
    setChecked(e.target.checked);
  };

  return <Checkbox label={value} checked={checked} onChange={handleChange} />;
};

export default React.memo(CheckBox);
