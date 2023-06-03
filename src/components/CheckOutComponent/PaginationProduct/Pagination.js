import axios from "axios";
import React, { useState } from "react";
import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";
const Pagination = ({
  setVariantsResults,
  previous,
  next,
  tableEditNew,
  setModel,
}) => {
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const handleNext = () => {
    setLoadingNext(true);
    axios
      .get(next)
      .then((res) => {
        setLoadingNext(false);
        setVariantsResults && setVariantsResults(res.data);
        setModel && setModel(res.data);
        tableEditNew.current.scrollTo({
          top: 0,
          behavior: "instant",
        });
      })
      .catch((err) => {
        console.log(err);
        setLoadingNext(false);
      });
  };
  const handlePrevious = () => {
    setLoadingPrevious(true);
    axios
      .get(previous)
      .then((res) => {
        setVariantsResults && setVariantsResults(res.data);
        setModel && setModel(res.data);
        setLoadingPrevious(false);
        tableEditNew.current.scrollTo({
          top: 0,
          behavior: "instant",
        });
      })
      .catch((err) => {
        console.log(err);
        setLoadingNext(false);
      });
  };

  return (
    <div className="container || pagination || m-auto  || pe-0 || pt-3 || d-flex || gap-3 || justify-content-center">
      {!loadingPrevious ? (
        <button
          className={`${
            previous ? `visable` : ` unvisable`
          }  position-relative`}
          onClick={handlePrevious}
        >
          <div className="d-flex">
            <RxDoubleArrowLeft />
          </div>
        </button>
      ) : (
        <button className="position-relative disabled">
          <div className="opacity-0 d-flex">
            <RxDoubleArrowLeft />
          </div>
          <div className="loadingPar">
            <div className="loading"></div>
          </div>
        </button>
      )}
      {!loadingNext ? (
        <button
          className={`${next ? `visable` : ` unvisable`}  position-relative`}
          onClick={handleNext}
        >
          <div className="d-flex">
            <RxDoubleArrowRight />
          </div>
        </button>
      ) : (
        <button className="position-relative disabled ">
          <div className="opacity-0 d-flex">
            <RxDoubleArrowRight />
          </div>
          <div className="loadingPar">
            <div className="loading"></div>
          </div>
        </button>
      )}
    </div>
  );
};

export default Pagination;
