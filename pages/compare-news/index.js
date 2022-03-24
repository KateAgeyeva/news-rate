//Handle no results received after fetch
import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { clear_state } from '../store/newsSlice';
import BarChart from '../../components/d3/Barchart';
import DateForm from '../../components/form/DateForm';
import InputField from '../../components/form/InputField';
import { choose_date } from '../store/dateSlice';
import Footer from '../../components/ui/Footer';

const CompareNews = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadChart, setLoadChart] = useState(false);
  const [getResults, setGetResults] = useState(false);
  const [clearBtn, setClearBtn] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.news);

  useEffect(() => {
    const start = startDate.toDateString();
    const end = endDate.toDateString();
    // Compare dates to make start less than end
    if (startDate <= endDate) {
      dispatch(choose_date({ start: start, end: end }));
    }
    else {
      alert('The Start date must be earlier than the End date');
      setEndDate(new Date());
    }
  }, [startDate, endDate]);

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

  const clearForm = () => {
    dispatch(clear_state());
    setClearBtn(false);
    setIsLoaded(false);
    setLoadChart(false);
    setStartDate(new Date());
    setEndDate(new Date());
    if (inputList.length > 1) {
      setInputList([])
    }
  };

  const [inputList, setInputList] = useState(['Search: ']);

  const onAddInputField = (event) => {
    event.preventDefault();
    setClearBtn(true);
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
        <title>Compare News</title>
        <meta name="description" content="Compare News Worldwide" />
      </Head>
      <div>
        <div className="flex flex-row justify-between items-center w-full py-4 font-serif font-semibold">
          <div className="flex flex-row items-center ml-5">
            <div className="bg-rose-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                viewBox="0 0 20 20"
                //#BE123C
                fill="white"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <p className="text-4xl text-black ml-2">News Rates</p>
          </div>
          <div className="mr-5">
            <button className="text-lg bg-rose-700 rounded px-3 py-2 text-white font-medium hover:bg-rose-900">
              <Link href="/">Go to Top-20 News in NL</Link>
            </button>
          </div>
        </div>
        <div className="flex justify-center bg-rose-700 py-3"></div>
        <div className="container mx-auto">
          <p className="flex justify-center pt-10 text-2xl font-extrabold">
            Compare News Rates Worldwide
          </p>
        </div>
        <div className="flex flex-col items-center pt-5">
          <p className="mt-5 text-2xl">
            Please fill the form
          </p>
          <p className='italic'>Time range is restricted to one month</p>
        </div>
        <div className="flex justify-center">
          <div className="mt-4 mb-10 p-5 bg-white rounded shadow-md">
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
                  <InputField key={i} results={getResults} text={item} 
                  // onDelete={} 
                  />
                ))}
                {inputList.length <= 5 && (
                  <button
                    onClick={onAddInputField}
                    className="text-black py-2 rounded w-25 mb-5"
                  >
                    <div className="flex flex-row justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="#881337"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="ml-1">Add Search</p>
                    </div>
                  </button>
                )}
                <div className="flex justify-center">
                  <button
                    className="bg-rose-600 hover:bg-rose-700 py-1 text-white rounded w-20 mr-1"
                    onClick={getSearchResult}
                  >
                    Submit
                  </button>
                  {clearBtn && <button
                    className="bg-rose-300 hover:bg-rose-700 py-1 text-white rounded w-20 ml-1"
                    onClick={clearForm}
                  >
                    Clear
                  </button>}
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
        <Footer />
      </div>
    </Fragment>
  );
};

export default CompareNews;