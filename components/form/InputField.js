import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_news } from '../../pages/store/newsSlice';

const InputField = ({ results, text, onDelete, id }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const dateState = useSelector((state) => state.date);
  const {start} = dateState;
  const {end} = dateState;

  //FETCH RESULTS
  const fetchNews = async () => {
    const result = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&from=${start}&to=${end}&apiKey=93fd26572d7347839c7298cdca441095`
    );
    const data = await result.json();
    dispatch(fetch_news({number: data.totalResults, id: query}));
  };

  useEffect(() => {
      fetchNews();
    }, [results]
  );

  return (
    <label className="flex direction-row items-center pb-5">
      {text}
      <input
        id={id}
        className="rounded ml-2"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* DELETE INPUT FIELD BUTTON */}
      <button className='ml-2' onClick={onDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="darkgray"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </label>
  );
};

export default InputField;