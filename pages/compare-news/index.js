import { Fragment, useState } from 'react';
import Head from 'next/head';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';

import { fetch_news, clear_state } from '../store/newsSlice';
import BarChart from '../../components/d3/Barchart';
import DateForm from '../../components/form/DateForm';

const CompareNews = (props) => {
  const [query, setQuery] = useState("Amsterdam");
  const [queryTwo, setQueryTwo] = useState("Minsk");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadChart, setLoadChart] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.news);

  const start = startDate.toDateString();
  const end = endDate.toDateString();
  const dimensions = {
    width: 500,
    height: 350,
    margin: { top: 30, right: 30, bottom: 30, left: 60 }
  };

  const fetchNews = async () => {
    const result = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&from=${start}&to=${end}&apiKey=206cf23bcbc64c26b9f3ae21410e1728`
    );
    const data = await result.json();
    dispatch(fetch_news({number: data.totalResults, id: query}));
  };

  const fetchNewsTwo = async () => {
    const result = await fetch(`https://newsapi.org/v2/everything?q=${queryTwo}&from=${start}&to=${end}&apiKey=206cf23bcbc64c26b9f3ae21410e1728`);
    const data = await result.json();
    dispatch(fetch_news({number: data.totalResults, id: queryTwo}));
  };

  const getSearchResult = (event) => {
    event.preventDefault();
    if (isLoaded === false) {
      setIsLoaded(true);
    }
    dispatch(clear_state());
    fetchNews();
    fetchNewsTwo();
    if (loadChart === false) {
      setLoadChart(true);
    }
  };

  const listNews = state.map((news) => 
    <li key={news.id}>For "{news.id}": {news.number} results found.</li>
  );

  return (
    <Fragment>
      <Head>
        <title>Compare News Rate</title>
        <meta name="description" content="Compare News Worldwide" />
      </Head>
      <div className="fixed bg-sky-800 text-white w-full px-40 py-4 font-serif font-semibold">
        <p className="text-4xl overline text-center">Monthly News Rate Worldwide</p>
      </div>
      <div className="flex justify-center">
        <div className="mt-24 mb-10 p-5 bg-sky-50 rounded shadow-inner">
          <form>
            <DateForm datePickerClass='rounded' dataType='date' start={startDate} end={endDate} onStartDate={(date) => setStartDate(date)} onEndDate={(date) => setEndDate(date)} format='yyy-MM-dd' />
            <div className='flex justify-center'>
              <div className="flex flex-col">
                <label className='pb-5'>
                  Search One:
                  <input
                    className='rounded'
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <label className='pb-5'>
                  Search Two:
                  <input
                    className='rounded'
                    type="text"
                    value={queryTwo}
                    onChange={(e) => setQueryTwo(e.target.value)}
                  />
                </label>
              <div className='flex justify-center'>
                <button className='bg-sky-400 hover:bg-sky-700 py-2 text-white rounded w-20' onClick={getSearchResult}>Submit</button>
              </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isLoaded && <div className='flex justify-center mb-10'>
        <ul className="flex flex-col">{listNews}</ul>
      </div>}
      {loadChart && <div className="flex justify-center mb-10">
        <BarChart dimensions={dimensions} data={state} />
      </div>}
      <footer className="flex justify-center p-10">
        <p>This web app is made with the help of <a href="https://newsapi.org/" target='_blank'>News API</a></p>
      </footer>
    </Fragment>
  );
};

export default CompareNews;