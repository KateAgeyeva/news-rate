//Handle no results received after fetch
import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { fetch_news, clear_state } from '../store/newsSlice';
import BarChart from '../../components/d3/Barchart';
import DateForm from '../../components/form/DateForm';
import InputField from '../../components/form/InputField';
import { choose_date } from '../store/dateSlice';

const CompareNews = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadChart, setLoadChart] = useState(false);
  const [getResults, setGetResults] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.news);

  useEffect(() => {
  const start = startDate.toDateString();
  const end = endDate.toDateString();
  dispatch(choose_date({start: start, end: end}));
  }, [startDate, endDate])

  const dimensions = {
    width: 500,
    height: 350,
    margin: { top: 30, right: 30, bottom: 30, left: 60 }
  };


  const getSearchResult = (event) => {
    event.preventDefault();
    dispatch(clear_state());
    if (isLoaded === false) {
      setIsLoaded(true);
    }
    setGetResults(() => getResults === false ? true : false)
    if (loadChart === false) {
      setLoadChart(true);
    }
  };

  const [inputList, setInputList] = useState(['Search: ']);

  const onAddInputField = (event) => {
    event.preventDefault()
    if(inputList.length <=5) {
      setInputList([ ...inputList, 'Search: ' ])
    } else {
      return
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
      <div className="bg-sky-800 text-white w-full px-40 py-4 font-serif font-semibold">
        <p className="text-4xl overline text-center">
          Monthly News Rate Worldwide
        </p>
      </div>
      <div className="flex flex-col items-center pt-5">
        <Link href="/">Back to main page</Link>
        <p className="mt-5 text-2xl text-slate-500">
          Please fill the form to compare news
        </p>
        <p>Time range is restricted to one month</p>
      </div>
      <div className="flex justify-center">
        <div className="mt-4 mb-10 p-5 bg-sky-50 rounded shadow-inner">
          <form>
            <DateForm
              datePickerClass="rounded"
              dataType="date"
              start={startDate}
              end={endDate}
              onStartDate={(date) => setStartDate(date)}
              onEndDate={(date) => setEndDate(date)}
              format="yyy-MM-dd"
            />
              <div className="flex flex-col items-center">
                  {inputList.map((item, i) => (
                    <InputField key={i} results={getResults} text={item} />
                  ))}
                  {inputList.length <= 5 && (
                    <button
                      onClick={onAddInputField}
                      className="text-black py-2 text-white rounded w-25 mb-5"
                    >
                      <div className="flex flex-row justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 20 20"
                          fill="#0EA5E9"
                          >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                            />
                        </svg>
                        <p className='ml-1'>Add Search</p>
                      </div>
                    </button>
                  )}

                <div className="flex justify-center">
                  <button
                    className="bg-sky-400 hover:bg-sky-700 py-2 text-white rounded w-20"
                    onClick={getSearchResult}
                  >
                    Submit
                  </button>
                </div>
            </div>
          </form>
        </div>
      </div>
      {isLoaded && (
        <div className="flex justify-center mb-10">
          <ul className="flex flex-col">{listNews}</ul>
        </div>
      )}
      {loadChart && (
        <div className="flex justify-center mb-10">
          <BarChart dimensions={dimensions} data={state} />
        </div>
      )}
      <footer className="flex justify-center p-10">
        <p>
          This web app is made with the help of{" "}
          <a href="https://newsapi.org/" target="_blank">
            News API
          </a>
        </p>
      </footer>
    </Fragment>
  );
};

export default CompareNews;