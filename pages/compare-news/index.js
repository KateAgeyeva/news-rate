//Handle no results received after fetch
import { Fragment, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { clear_state } from '../../store/newsSlice';
import BarChart from '../../components/d3/Barchart';
import DateForm from '../../components/form/DateForm';
import InputField from '../../components/form/InputField';
import { choose_date } from '../../store/dateSlice';

const CompareNews = () => {
  //DATE PICKER DATES
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // RESULTS FORM FETCH LOADED
  const [isLoaded, setIsLoaded] = useState(false);
  //BARCHART LOADED
  const [loadChart, setLoadChart] = useState(false);
  const [getResults, setGetResults] = useState(false);
  //CLEAR FORM BTN
  const [clearBtn, setClearBtn] = useState(false);
  //INPUT FIELDS ADDED
  const initialInputData = {
    text: "Keyword: ",
    id: `${uuidv4()}`,
  };
  const [inputList, setInputList] = useState([initialInputData]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.news);

  //FETCH NEWS DATA
  useEffect(() => {
    const start = startDate.toDateString();
    const end = endDate.toDateString();
    if (startDate <= endDate) {
      dispatch(choose_date({ start: start, end: end }));
    } else {
      alert("The Start date must be earlier than the End date");
      setEndDate(new Date());
    }
  }, [startDate, endDate, dispatch]);

  //BARCHART SVG DIMENSIONS
  const dimensions = {
    width: 500,
    height: 350,
    margin: { top: 30, right: 30, bottom: 30, left: 60 }
  };

  //LOAD FETCH RESULTS AND BARCHART
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

  //CLEAR FORM
  const clearForm = () => {
    dispatch(clear_state());
    setClearBtn(false);
    setIsLoaded(false);
    setLoadChart(false);
    setStartDate(new Date());
    setEndDate(new Date());
    if (inputList.length > 1) {
      setInputList([initialInputData])
    }
  };

  //ADD INPUT FIELD
  const onAddInputField = () => {
    event.preventDefault();
    setClearBtn(true);
    if(inputList.length <=5) {
      setInputList([...inputList, { text: "Keyword: ", id: `${uuidv4()}` }]);
    } else {
      return
    }
  };

  //DELETE INPUT FIELD
  const deleteInput = useCallback((key) => {
    event.preventDefault();
    const newInputList = inputList.filter((item) => item.id !== key);
    setInputList(newInputList);
  }, [inputList]);

  //FETCH RESULTS LIST
  const listNews = state.map((news) => {
    const newsNumber = news.number;
    if (newsNumber > 0) {
      return (
        <li className="text-lg" key={news.id}>
          For &quot;{news.id}&quot;: {news.number} articles found.
        </li>
      );
    }
  }
  );

  return (
    <Fragment>
      <Head>
        <title>Compare News</title>
        <meta name="description" content="Compare News Worldwide" />
      </Head>
      <div className="container mx-auto">
        <p className="flex justify-center pt-10 text-2xl font-extrabold">
          Compare News Rates Worldwide
        </p>
      </div>
      <div className="flex flex-col items-center pt-5">
        <p className="mt-5 text-2xl">Please fill the form</p>
        <p className="italic">Time range is restricted to one month</p>
      </div>
      {/* FORM */}
      <div className="flex justify-center">
        <div className="mt-4 mb-10 p-5 bg-white rounded shadow-md">
          <form>
            {/* DATE PICKER */}
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
              {/* INPUT FIELDS */}
              {inputList.map(({ text, id }) => (
                <InputField
                  key={id}
                  id={id}
                  results={getResults}
                  text={text}
                  onDelete={() => deleteInput(id)}
                />
              ))}
              {/* ADD INPUT FIELD BTN */}
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
                    <p className="ml-1">Add Keyword</p>
                  </div>
                </button>
              )}
              {/* SUBMIT BTN */}
              <div className="flex justify-center">
                <button
                  className="bg-rose-600 hover:bg-rose-700 py-1 text-white rounded w-20 mr-1"
                  onClick={getSearchResult}
                >
                  Submit
                </button>
                {/* CLEAR BTN */}
                {clearBtn && (
                  <button
                    className="bg-rose-300 hover:bg-rose-700 py-1 text-white rounded w-20 ml-1"
                    onClick={clearForm}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* FETCH RESULTS */}
      {isLoaded && (
        <div className="flex justify-center mb-10">
          <ul className="flex flex-col">{listNews}</ul>
        </div>
      )}
      {/* BARCHART */}
      {loadChart && (
        <div className="flex justify-center mb-10">
          <BarChart dimensions={dimensions} data={state} />
        </div>
      )}
    </Fragment>
  );
};

export default CompareNews;