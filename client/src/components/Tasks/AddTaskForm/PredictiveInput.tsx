import React, { useState } from 'react';

interface PredictiveInputProps {
  options: string[];
  onChange: (x: string[]) => void;
}

const PredictiveInput = (props: PredictiveInputProps): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const options = props.options;

  const handleInputChange = (event: { target: { value: string } }) => {
    const inputValue = event.target.value;
    const { onChange } = props;
    setValue(inputValue);
    onChange([inputValue]);
    setSuggestions(getSuggestions(inputValue));
  };

  const handleSuggestionClick = (suggestion: React.SetStateAction<string>) => {
    setValue(suggestion);
    setSuggestions([]);
  };

  const getSuggestions = (inputValue: string) => {
    if (!inputValue) return [];
    const inputValueLowerCase = inputValue.toLowerCase();
    return options.filter(option =>
      option.toLowerCase().includes(inputValueLowerCase),
    );
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Type something"
      />
      {suggestions.length > 0 && (
        <div className="suggestions-container">
          <ul className="suggestions-list">
            {suggestions.map(suggestion => (
              <li
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PredictiveInput;
