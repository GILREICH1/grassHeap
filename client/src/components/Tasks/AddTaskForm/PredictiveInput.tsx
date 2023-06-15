import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';

interface PredictiveInputProps {
  options: string[];
  onChange: (event: React.SyntheticEvent, inputValue: string) => void;
}

const PredictiveInput = (props: PredictiveInputProps): JSX.Element => {
  return (
    <FormControl id="free-solo-with-text-demo">
      <FormLabel>Crop</FormLabel>
      <Autocomplete
        onInputChange={props.onChange}
        freeSolo
        placeholder="Type Crop"
        options={props.options}
      />
    </FormControl>
  );
};

export default PredictiveInput;
