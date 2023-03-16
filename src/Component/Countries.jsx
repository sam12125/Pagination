import LoadingIndicator from "./LoadingIndicator";
import CountriesCard from "./CountriesCard";
import Pagination from "./Pagination";
import axios from "axios";
import { useState, useEffect } from "react";

function Countries() {
  const [country, setCountry] = useState([]);
  const [currentPage,setCurrentpage] = useState(1) //Default current page
  const [postsPerpage , setPostsperPage] = useState(10) //Set post per page to display

  let data = [];

  const fetchData = () => {
    axios
      .get(
        // `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?page=${currentPage}&limit=${postsPerpage}`
        `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries`
      )
      .then(
        (response) => {
          data = response.data.data;
          // console.log(response.data.items)
          setCountry(data);
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const lastPostindex = currentPage * postsPerpage
  const firstPostindex = lastPostindex - postsPerpage
  const currentPosts = country.slice(firstPostindex , lastPostindex)

  return (
    <>
      <h1 data-testid="countries-header">Countries List</h1>
      {country.length ? (
        currentPosts.map((elem) => (
          <div key={elem.id}>
            <div>
              <div data-testid="countries-container">
                <CountriesCard
                  country={elem.country}
                  population={elem.population}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <LoadingIndicator />
      )}
      <div>
        <Pagination totalPost={country.length} postsPerpage={postsPerpage} setCurrentpage={setCurrentpage}/>
      </div>
    </>
  );
}

export default Countries;
