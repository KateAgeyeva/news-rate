import Link from 'next/link';

const MainNavigation = () => {
    return (
      <div>
          <div className="flex flex-row justify-between items-center w-full py-4 font-serif font-semibold">
            {/* NAME */}
            <div className="flex flex-row items-center ml-5">
              <div className="bg-rose-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  viewBox="0 0 20 20"
                  fill="white"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <p className="text-4xl text-black ml-2">News Rates</p>
            </div>
            {/* NAVIGATION */}
            <div className="flex flex-row mr-5">
              <button className="text-lg bg-rose-700 hover:bg-rose-900 rounded mr-3 px-3 py-2 text-white font-medium">
                <Link href="/compare-news">
                  Compare News Worldwide
                </Link>
              </button>
              <button className="text-lg bg-rose-700 hover:bg-rose-900 rounded px-3 py-2 text-white font-medium">
                <Link href="/">
                  Top News NL
                </Link>
              </button>
            </div>
          </div>
          {/* LINE */}
          <div className="flex justify-center bg-rose-700 py-3"></div>
      </div>
    );
};

export default MainNavigation;