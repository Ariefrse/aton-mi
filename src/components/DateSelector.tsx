import React, { useState } from 'react';

interface DateSelectorProps {
  onDateChange: (dateOption: { startDate?: string; endDate?: string; selectDate?: string }) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange }) => {
  const [selectType, setSelectType] = useState<'single' | 'range'>('single');
  const [singleDate, setSingleDate] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleFetchData = () => {
    let dateOption;
    if (selectType === 'single') {
      dateOption = { selectDate: singleDate };
    } else {
      dateOption = { startDate, endDate };
    }
    onDateChange(dateOption);
  };

  return (
    <div className="date-selector">
      <div className="select-type">
        <label>
          <input
            type="radio"
            value="single"
            checked={selectType === 'single'}
            onChange={() => setSelectType('single')}
          />
          Single Date
        </label>
        <label>
          <input
            type="radio"
            value="range"
            checked={selectType === 'range'}
            onChange={() => setSelectType('range')}
          />
          Date Range
        </label>
      </div>

      {selectType === 'single' ? (
        <div className="single-date">
          <input
            type="date"
            value={singleDate}
            onChange={(e) => setSingleDate(e.target.value)}
          />
        </div>
      ) : (
        <div className="date-range">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      )}

      <button onClick={handleFetchData}>Fetch Data</button>
    </div>
  );
};

export default DateSelector;