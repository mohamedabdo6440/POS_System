import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function RepairIssu({
  issu,
  Items,
  handleSelectIssue,
}) {
  const [data, setData] = useState(false);
  const [updata, setUpdata] = useState(0);
  useEffect(() => {
    if(Items){
      const findSelect = Items.find((item) => item.repairInfo.id === issu.id);
      if (findSelect) {
        issu.isActive = true;
        setData(issu);
      }else{
        setData(issu);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updata,Items.length]);
  return (
    <>
      {data && (
        <div
          className={`${issu.isActive ? `active` : ``} IssuBtn`}
          onClick={(e) => {
            handleSelectIssue(issu.id);
            issu.isActive = true;
            setData(issu);
            setUpdata(updata+1)
          }}
        >
          {issu.str}
        </div>
      )}
    </>
  );
}
