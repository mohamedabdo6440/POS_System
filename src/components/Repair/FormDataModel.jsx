import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { Get_Repair_Model_Search } from "../EndPointsLinks";
import SearchModelAndISSU from "./SearchModelAndISSU";

const FormDataModel = ({
  SearchWordModel,
  setLoading,
  setModel,
  Issu,
  setSearchWordModel,
  loading,
  setopenAddProductFilter,
  IMEInumber,
  setIMEInumber,
  modelPassword,
  setModelPassword,
  ResetModelData,

}) => {
  const [ModelInputsReadOnly, setModelInputsReadOnly] = useState(false);
  const [modelName, setModelName] = useState("");

  //THIS function for get data after select issu and set in state
  useEffect(() => {
    if (Issu) {
      setModelName(Issu.model.str);
    } else {
      setModelName("");
    }
  }, [Issu]);

  //this function for change state input to readOnly
  useEffect(() => {
    Issu ? setModelInputsReadOnly(true) : setModelInputsReadOnly(false);
  }, [Issu]);

  //get model object after search
  const HandleSearchingModel = (word) => {
    setLoading(true);
    axios
      .get(Get_Repair_Model_Search + word)
      .then((res) => {
        setLoading(false);
        if (res.data.results.length > 0) {
          setModel(res.data);
          setSearchWordModel("");
          setopenAddProductFilter(true);
        } else {
          setModel([]);
          toast.error("No Product Found", {
            theme: "dark",
          });
        }
      })
      .catch((err) => {
        toast.error(err.message, {
          theme: "dark",
        });
      });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        SearchWordModel.trim() !== "" && HandleSearchingModel(SearchWordModel);
      }}
    >
      <div className="row || g-0 || px-3  || py-2 || gapControlRepair">
        <SearchModelAndISSU
          modelName={modelName}
          setSearchWordModel={setSearchWordModel}
          loading={loading}
          SearchWordModel={SearchWordModel}
          ModelInputsReadOnly={ModelInputsReadOnly}
          ResetModelData={ResetModelData}

        />
        <div className="col-12 col-md-6 col-lg-3 || px-2">
          <div className="inputStyle  || rounded-2 || d-flex || justify-content-between || align-items-center ">
            <input
              type="text"
              placeholder="IMEI Number"
              className="w-100"
              value={IMEInumber}
              onChange={(e) => {
                setIMEInumber(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 || px-2">
          <div className="inputStyle  || rounded-2 || d-flex || justify-content-between || align-items-center ">
            <input
              type="text"
              placeholder="Password"
              className="w-100"
              value={modelPassword}
              onChange={(e) => {
                setModelPassword(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormDataModel;
