import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_news } from '../../pages/store/newsSlice';

const InputField = ({ results, text, onDelete, id }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const dateState = useSelector((state) => state.date);
  const {start} = dateState;
  const {end} = dateState;

  //useCallback??
  const fetchNews = async () => {
    const result = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&from=${start}&to=${end}&apiKey=206cf23bcbc64c26b9f3ae21410e1728`
    );
    const data = await result.json();
    dispatch(fetch_news({number: data.totalResults, id: query}));
  };

  useEffect(() => {
      fetchNews();
    }, [results]
  );

  return (
    <label className='flex direction-row pb-5'>
      {text}
      <input
        id={id}
        className='rounded'
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={onDelete}>Delete</button>
    </label>
  );
};

export default InputField;