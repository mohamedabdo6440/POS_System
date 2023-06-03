import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const SearchModelAndISSU = ({
  modelName,
  setSearchWordModel,
  loading,
  SearchWordModel,
  ModelInputsReadOnly,
  ResetModelData,
}) => {
  return (
    <>
      <div className="col-12 col-md-6 col-lg-6 || px-2">
        <div className="inputStyle  || rounded-2 || d-flex || justify-content-between || align-items-center ">
          {ModelInputsReadOnly ? (
            <>
              <input
                readOnly
                type="text"
                placeholder="Search Repair Device"
                className="w-100"
                value={modelName ? modelName : SearchWordModel}
                onChange={(e) => {
                  setSearchWordModel(e.target.value);
                }}
              />
              <button
                onClick={ResetModelData}
                className="customerBtn rapir px-2 py-0 || position-relative text-danger"
                type="submit"
              >
                <IoMdClose />
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Search Repair Device"
                className="w-100"
                value={modelName ? modelName : SearchWordModel}
                onChange={(e) => {
                  setSearchWordModel(e.target.value);
                }}
              />
              {loading ? (
                <button
                  className="customerBtn rapir px-2 py-0 || position-relative"
                  type="submit"
                >
                  <div className="opacity-0 unvisable || d-flex">
                    <AiOutlineSearch />
                  </div>
                  <div className="transtionEdit || d-flex">
                    <Spinner />
                  </div>
                </button>
              ) : (
                <button
                  className="customerBtn rapir px-2 py-0 || position-relative"
                  type="submit"
                >
                  <AiOutlineSearch />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchModelAndISSU;
