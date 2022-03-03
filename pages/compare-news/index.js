import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import * as d3 from 'd3';

import { fetch_news, clear_state } from '../store/newsSlice';
import BarChart from '../../d3/Barchart';

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
      <h2>Compare News Rate 2022</h2>
      <form>
        <label>
          Start date:
          <DatePicker
            type='date'
            selected={startDate}
            onSelect={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </label>
        <label>
          End date:
          <DatePicker
            type='date'
            selected={endDate}
            onSelect={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </label>
        <label>
          Search One:
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          Search Two:
          <input
            type='text'
            value={queryTwo}
            onChange={(e) => setQueryTwo(e.target.value)}
          />
        </label>
        <button onClick={getSearchResult}>Submit</button>
      </form>
      {isLoaded && 
      <ul>{listNews}</ul>
      }
      {loadChart && <BarChart dimensions={dimensions} data={state} />}
    </Fragment>
  );
};


// const toDate = today.setFullYear(today.getFullYear() - 1);

// export async function getStaticProps() {
//     const search = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=${date}&to=${today}&apiKey=206cf23bcbc64c26b9f3ae21410e1728`);
//     const data = await search.json();
//     const result = data.totalResults;

//     return {
//         props: {
//             totalNumber: result
//         }
//     }
// }

export default CompareNews;