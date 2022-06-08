import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_ALL_QUOTES } from "../../gqlOperations/queries/quoteQueries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES, {
    fetchPolicy: "cache-and-network",
  });
  const [allQuotes, setAllQuotes] = useState([]);
  useEffect(() => {
    if (data) {
      console.log(data.quotes);
      setAllQuotes(data.quotes);
      toast("New data is loading");
    }
    if (error) toast.error(error.message);
  }, [data, error]);

  return (
    <>
      <section className="homeSection">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {allQuotes?.map((data, ind) => {
              return (
                <div className="homeSection_maindiv" key={ind}>
                  <div>
                    <p>{data.name} </p>
                  </div>
                  <div>
                    <NavLink to={`/profile/${data.by._id}`}>
                      <span>~ {data.by.firstName}</span>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
