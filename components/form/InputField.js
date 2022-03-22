import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_news } from '../../pages/store/newsSlice';

const InputField = ({results, text}) => {
  const [query, setQuery] = useState('Amsterdam');
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
    <label className='pb-5'>
      {text}
      <input
        className='rounded'
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </label>
  );
};

export default InputField;