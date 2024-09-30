import React, { useState } from 'react';

interface DateSelectorProps {
  onDateChange: (dateOption: { selectDate: string }) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleFetchData = () => {
    if (selectedDate) {
      onDateChange({ selectDate: selectedDate });
    }
  };

  return (
    <div className="date-selector">
      <div className="single-date">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <button onClick={handleFetchData}>Fetch Data</button>
    </div>
  );
};

export default DateSelector;