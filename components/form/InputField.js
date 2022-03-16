
const InputField = ({ classLabel, text, classInput, inputType, queryValue, onInput }) => {
    return (
      <label className={classLabel}>
        {text}
        <input
          className={classInput}
          type={inputType}
          value={queryValue}
          onChange={onInput}
        />
      </label>
    );
};

export default InputField;