import Image from 'next/image';

const NewsItem = ({ id, url, date, image, description }) => {
    const published = date.slice(0,10);
      return (
        <li className="flex flex-col grid justify-items-center rounded shadow-md p-3 m-2 bg-white">
          {image !== null ? <img src={image} alt={description} /> : <p className="italic">No image</p>}
          <p className="text-lg text-center font-semibold">{id}</p>
          <p className="text-slate-500">Published At: {published}</p>
          {description!==null ? <p>{description}</p> : <p className="italic">No description</p>}
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:text-slate-500 text-lg">
            Read more
          </a>
        </li>
      );
};

export default NewsItem;