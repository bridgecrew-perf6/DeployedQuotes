import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CREATE_QUOTE } from "../../gqlOperations/mutations/QuoteMutation";
import { GET_ALL_QUOTES } from "../../gqlOperations/queries/quoteQueries";

const CreateQuote = () => {
  const [formData, setFormData] = useState({ quote: "" });
  const [createQuote, { data, loading, error }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["getAllQuotes", "getMyProfile"],
  });

  const saveQuote = (e) => {
    e.preventDefault();
    createQuote({
      variables: {
        name: formData.quote,
      },
    });
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (data) {
      setFormData({ quote: "" });
      toast("Quote Created Successfully");
    }
    if (error) toast.error(error.message);
  }, [data, error]);
  return (
    <section className="createQuote">
      <form onSubmit={saveQuote}>
        <div>
          <textarea
            rows={5}
            required
            autoComplete="off"
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            placeholder="Wright Your Quote Here ..."
          />
        </div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="register_Form__ButtonDiv">
            {formData?.quote ? (
              <>
                <button type="submit">Submit</button>
                <button type="cancel" className="cancel-btn">
                  Cancel
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        )}
      </form>
    </section>
  );
};

export default CreateQuote;
