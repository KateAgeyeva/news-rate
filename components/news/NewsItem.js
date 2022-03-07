
const NewsItem = ({ id, url, date }) => {
    const published = date.slice(0,10);
  return (
        <div className="flex flex-col grid justify-items-center bg-sky-50 rounded shadow-md p-8">
              <p className="text-lg text-center">{id}</p>
              <p>Pablished At: {published}</p>
              <a href={url} target="_blank">Read more</a>
        </div>
  );
};

export default NewsItem;