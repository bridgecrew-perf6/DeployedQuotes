import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  GET_MY_PROFILE,
  GET_USER_BY_ID,
} from "../../gqlOperations/queries/UserQueries";

const Profile = () => {
  const { otherUserId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let callableFunction;
  if (otherUserId) {
    callableFunction = GET_USER_BY_ID;
  } else {
    callableFunction = GET_MY_PROFILE;
    if (!token) {
      navigate("/login");
    }
  }
  const { data, loading, error } = useQuery(callableFunction, {
    variables: {
      userId: otherUserId,
    },
  });
  useEffect(() => {
    if (data) {
      console.log("profile data------->>>", data.user);
      console.log(data?.userProfile?.quotes);
      toast("Your Profile is Opening");
    }
    if (error) toast.error(error.message);
  }, [data, error]);
  return (
    <>
      <section className="profile_Section">
        <header>Your Profile</header>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="profile_content">
            <div className="profile_Section__imageDiv">
              <img src={`https://robohash.org/satendradd.png`} alt="" />
            </div>
            <div className="profile_Section__ContentDiv">
              <div className="profileSection_ContentDiv__RowDiv hoverDiv">
                <p>First Name</p>
                <p>{data?.userProfile?.firstName}</p>
              </div>
              <div className="profileSection_ContentDiv__RowDiv hoverDiv">
                <p>Last Name</p>
                <p>{data?.userProfile?.lastName}</p>
              </div>
              <div className="profileSection_ContentDiv__RowDiv hoverDiv">
                <p>Email</p>
                <p>{data?.userProfile?.email}</p>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="userProfile_Quote_section">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {data?.userProfile?.quotes.map((data, ind) => {
              return (
                <div className="userProfile_Quote_section__maindiv" key={ind}>
                  <div>
                    <p>{data.name} </p>
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

export default Profile;
