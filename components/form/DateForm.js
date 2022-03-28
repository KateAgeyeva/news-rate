import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateForm = ({ datePickerClass, dataType, start, end, onStartDate, onEndDate, format }) => {
    return (
      <div className="flex flex-row pb-5">
        <label>
          Start date:
          <DatePicker
            className={datePickerClass}
            type={dataType}
            selected={start}
            onSelect={onStartDate}
            dateFormat={format}
          />
        </label>
        <label>
          End date:
          <DatePicker
            className={datePickerClass}
            type={dataType}
            selected={end}
            onSelect={onEndDate}
            dateFormat={format}
          />
        </label>
      </div>
    );
};

export default DateForm;
