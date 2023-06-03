import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "../Auth/LoginPage";
import RegisterPage from "../Auth/RegisterPage";
import HomePage from "../../Pages/HomePage/HomePage";
import Checkout from "../../Pages/Checkout/Checkout";
import RepairPage from "../../Pages/RepairPage/RepairPage";
import SwiperPop from "../SwiperPop/SwiperPop";
import Buy from "../../Pages/Buy/Buy";
import Transactions from "../CheckOutComponent/Transactions/Transactions";
import PrintComponent from "../PrintComponent/PrintComponent";
import NewRepair from "../../Pages/NewRepair/NewRepair";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { GET_SELL } from "../../redux/store/CustomerSliceCart";

const Home = ({ isToken }) => {
  const loaderState = useSelector(select => select.LoaderSlider.loading);
  const [openPages, setOpenPages] = useState(false);
  const [num, setNum] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("dark"))) {
      if (!JSON.parse(localStorage.getItem("dark")).dark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);
  const handleBackToPage = () => {
    navigate("/");
    dispatch(GET_SELL(false))
  };
  // const isToken = true;
  return (
    <div className="mainColor || relative">
      {loaderState && <Loader />}

      <SwiperPop
        num={num}
        setNum={setNum}
        openPages={openPages}
        setOpenPages={setOpenPages}
      />

      <Routes>
        <Route
          path="/"
          element={
            isToken ? (
              <HomePage setOpenPages={setOpenPages} num={num} setNum={setNum} />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/sell/:PageType"
          element={
            isToken ? (
              <Checkout
                openPages={openPages}
                num={num}
                setNum={setNum}
                setOpenPages={setOpenPages}
                handleBackToPage={handleBackToPage}
              />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/buy/:PageType"
          element={
            isToken ? (
              <Buy
                openPages={openPages}
                num={num}
                setNum={setNum}
                setOpenPages={setOpenPages}
                handleBackToPage={handleBackToPage}
              />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/transaction/:PageType"
          element={
            isToken ? (
              <Transactions
                openPages={openPages}
                num={num}
                setNum={setNum}
                setOpenPages={setOpenPages}
                handleBackToPage={handleBackToPage}
              />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/repair"
          element={
            isToken ? (
              <RepairPage handleBackToPage={handleBackToPage} />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/repair/:PageType"
          element={isToken ? <NewRepair /> : <LoginPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/PrintComponent" element={<PrintComponent />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default Home;
