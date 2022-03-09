
const NewsItem = ({ id, url, date }) => {
    const published = date.slice(0,10);
  return (
        <li className="flex flex-col grid justify-items-center bg-sky-50 rounded shadow-md p-8">
              <p className="text-lg text-center">{id}</p>
              <p>Published At: {published}</p>
              <a href={url} target="_blank">Read more</a>
        </li>
  );
};

export default NewsItem;