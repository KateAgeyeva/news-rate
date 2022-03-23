
const NewsItem = ({ id, url, date, image, description }) => {
    const published = date.slice(0,10);
      return (
        <li className="flex flex-col grid justify-items-center rounded shadow-md p-8 bg-white">
          <p className="text-lg text-center font-semibold">{id}</p>
          <p className="text-slate-500">Published At: {published}</p>
          <a href={url} target="_blank" className="text-rose-500 hover:text-slate-500 text-lg">
            Read more
          </a>
          {description!==null ? <p>{description}</p> : <p className="italic">No description</p>}
          {image !== null ? <img src={image} alt={description} /> : <p className="italic">No image</p> }
        </li>
      );
};

export default NewsItem;