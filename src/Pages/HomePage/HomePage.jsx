import React, { useEffect, useState } from "react";
import logo from "../../images/LoginImage/logo-POS.png";
import logOut from "../../images/LoginImage/logOut.png";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import PopUp from "../../components/PopUp/PopUp";
import { TfiArchive } from "react-icons/tfi";
import { CiUser } from "react-icons/ci";
import { AiFillAppstore } from "react-icons/ai";
import { toast } from "react-toastify";
import Repair from "../../components/Repair/Repair";
export default function HomePage({ num, setNum, setOpenPages }) {
  const userName = JSON.parse(localStorage.getItem("username"));
  const [dark, setDark] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [pages, setPages] = useState([]);
  const [openRepairPage, setOpenRepairPage] = useState(false);

  const navigate = useNavigate();
  //handle logOut Function
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setTimeout(() => {
      window.location = "/";
    }, 100);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("dark"))) {
      if (!JSON.parse(localStorage.getItem("dark")).dark) {
        setDark(true);
      }
    }
  }, []);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("pages"))) {
      setPages(JSON.parse(localStorage.getItem("pages")));
    }
  }, [num]);
  return (
    <div className="home py-4">
      <Repair
        openRepairPage={openRepairPage}
        setOpenRepairPage={setOpenRepairPage}
      />
      <div
        onClick={() => {
          // if (JSON.parse(localStorage.getItem("pages"))) {
          //   if (JSON.parse(localStorage.getItem("pages")).length !== 0) {
          //     setOpenPages(true);
          //   } else {
          //     toast.info("No Checkout Page Found", { theme: "dark" });
          //   }
          // }
          setOpenPages(true);
          setNum(num + 1);
        }}
        className="position-absolute || mdOutlineMenu"
      >
        <AiFillAppstore />
      </div>

      <div className="container || unselectable || position-relative">
        <div className="d-flex  || justify-content-between || align-items-center ">
          <div className=" flex-column align-items-center || justify-items-center || infoUser d-flex">
            <div className="imgUser ">
              <img src="./img/HomeImg/profile.png" alt="" />
            </div>
            <p className="mb-3 || fw-semibold || fs-6">{userName}</p>
          </div>
          <div className="logo">
            <img
              src="./img/HomeImg/dark-logo-POS.png"
              className={`${dark ? `` : `d-none`}`}
              alt=""
            />
            <img src={logo} className={`${dark ? `d-none` : ``}`} alt="" />
          </div>
          <div className="d-flex flex-column-reverse || flex-md-row || justify-content-center || align-items-center || d-flex">
            <div className="d-none d-md-block  mt-2 me-2">
              <div
                className={`${
                  dark && `active`
                }  d-flex ||  mode || position-relative`}
                onClick={() => {
                  setDark(!dark);
                  document.documentElement.classList.toggle("dark");
                  localStorage.setItem("dark", JSON.stringify({ dark }));
                }}
              >
                <div className="position-absolute  || toggleMode "></div>
                <div className="modeElement">
                  <img src="./img/HomeImg/sun.png" alt="" />
                </div>
                <div className="modeElement">
                  <img src="./img/HomeImg/moon.png" alt="" />
                </div>
              </div>
            </div>
            <div className="mt-2 me-2 d-block  d-md-none position-absolute || controlPA">
              <div
                className={`${
                  dark && `active`
                }  d-flex ||  mode || position-relative`}
                onClick={() => {
                  setDark(!dark);
                  document.documentElement.classList.toggle("dark");
                  localStorage.setItem("dark", JSON.stringify({ dark }));
                }}
              >
                <div className="position-absolute  || toggleMode "></div>
                <div className="modeElement">
                  <img src="./img/HomeImg/sun.png" alt="" />
                </div>
                <div className="modeElement">
                  <img src="./img/HomeImg/moon.png" alt="" />
                </div>
              </div>
            </div>
            <div
              onClick={handleLogOut}
              className="logOut || d-flex || cursor-pointer"
            >
              <img
                className={`${dark ? `` : `d-none`}`}
                src="./img/HomeImg/logOut-dark.png"
                alt=""
              />
              <img className={`${dark ? `d-none` : ``}`} src={logOut} alt="" />
            </div>
          </div>
        </div>
        <div className="controlHight || px-sm-0 || pt-4 ||  px-5 || px-lg-5 || d-flex || align-items-end ">
          <div className="w-100">
            <div className="row || gap-y-5 || justify-content-center ">
              <div
                className="col-sm-6 || col-md-6 ||  col-lg-4 || box"
                onClick={() => {
                  navigate(`/sell/sell`);
                }}
              >
                <div className="boxControl || rounded-5">
                  <div className="img">
                    <img src="./img/HomeImg/sell.png" alt="" />
                  </div>
                  <h2 className="text-capitalize || fw-semibold  || mb-0 || mt-2">
                    sell
                  </h2>
                </div>
              </div>
              <div className="col-sm-6 || col-md-6 ||  col-lg-4 || box">
                <div
                  onClick={() => {
                    navigate(`/buy/buy`);
                  }}
                  className="boxControl || rounded-5"
                >
                  <div className="img">
                    <img src="./img/HomeImg/buy.png" alt="" />
                  </div>
                  <h2 className="text-capitalize || fw-semibold  || mb-0 || mt-2">
                    buy
                  </h2>
                </div>
              </div>
              <div className="col-sm-6 || col-md-6 ||  col-lg-4 || box">
                <div
                  onClick={() => setOpenRepairPage(true)}
                  className="boxControl || rounded-5"
                >
                  <div className="img">
                    <img src="./img/HomeImg/repair.png" alt="" />
                  </div>
                  <h2 className="text-capitalize || fw-semibold  || mb-0 || mt-2">
                    repair
                  </h2>
                </div>
              </div>
              <div className="col-sm-6 || col-md-6 ||  col-lg-4 || box">
                <div
                  onClick={() => {
                    setOpenHistory(true);
                  }}
                  className="boxControl || rounded-5"
                >
                  <div className="img">
                    <img src="./img/HomeImg/history.png" alt="" />
                  </div>
                  <h2 className="text-capitalize || fw-semibold  || mb-0 || mt-2">
                    history
                  </h2>
                </div>
              </div>
              <div className="col-sm-6 || col-md-6 ||  col-lg-4 || box">
                <div className="boxControl || rounded-5">
                  <div className="img">
                    <img src="./img/HomeImg/test.png" alt="" />
                  </div>
                  <h2 className="text-capitalize || fw-semibold  || mb-0 || mt-2">
                    Tests
                  </h2>
                </div>
              </div>
              <div className="col-sm-6 || col-md-6 ||  col-lg-4 || box">
                <div className="boxControl || rounded-5">
                  <div className="img">
                    <img src="./img/HomeImg/settings.png" alt="" />
                  </div>
                  <h2 className="text-capitalize || fw-semibold  || mb-0 || mt-2">
                    settings
                  </h2>
                </div>
              </div>
            </div>
            {/* <Transactions
              setOpenSpends={setOpenSpends}
              openSpends={openSpends}
            /> */}
            <PopUp
              open={openHistory}
              setOpen={setOpenHistory}
              headPop="History"
            >
              <div className="row || g-0 || overflow-auto">
                <div className="col-12 px-2 col-md-6 col-lg-4">
                  <h2 className="mb-3 || mainColorTextInfo">Sale</h2>
                  <button
                    onClick={() => {
                      if (pages.length === 0) {
                        setPages([
                          ...pages,
                          { type: "transaction", id: pages.length + 1 },
                        ]);
                        localStorage.setItem(
                          "pages",
                          JSON.stringify([
                            ...pages,
                            { type: "transaction", id: pages.length + 1 },
                          ])
                        );
                        navigate(`/transaction/${pages.length + 1}`);
                      } else {
                        setPages([
                          ...pages,
                          { type: "transaction", id: pages.at(-1).id + 1 },
                        ]);
                        localStorage.setItem(
                          "pages",
                          JSON.stringify([
                            ...pages,
                            { type: "transaction", id: pages.at(-1).id + 1 },
                          ])
                        );
                        navigate(`/transaction/${pages.at(-1).id + 1}`);
                      }
                      setOpenHistory(false);
                    }}
                    className="historyLink || w-100  || cancel || rounded-0 || px-4 || mb-3 || py-3 || cursor-pointer || d-flex || align-items-center || gap-2"
                  >
                    <span className="fs-2 || d-flex">
                      <TfiArchive />
                    </span>
                    <span className="fs-4">Transaction</span>
                  </button>
                  <button className="historyLink | w-100  || cancel || rounded-0 || fw-light || px-4 || py-3 || cursor-pointer || d-flex || align-items-center || gap-2">
                    <span className="fs-2 || d-flex">
                      <CiUser />
                    </span>
                    <span className="fs-4">Customer</span>
                  </button>
                </div>
                <div className="col-12 px-2 col-md-6 col-lg-4 || mt-4 || mt-md-0">
                  <h2 className="mb-3 || mainColorTextInfo">Repair</h2>
                  <button className="historyLink | w-100  || cancel || rounded-0 || fw-light || px-4 || mb-3 || py-3  || cursor-pointer || d-flex || align-items-center || gap-2">
                    <span className="fs-2 || d-flex">
                      <TfiArchive />
                    </span>
                    <span className="fs-4">Layaway</span>
                  </button>
                  <button className="historyLink | w-100  || cancel || rounded-0 || fw-light || px-4 || py-3  || cursor-pointer || d-flex || align-items-center || gap-2">
                    <span className="fs-2 || d-flex">
                      <TfiArchive />
                    </span>
                    <span className="fs-4">Quotes</span>
                  </button>
                </div>
                <div className="col-12 px-2 col-md-6 col-lg-4 || mt-4 || mt-lg-0">
                  <h2 className="mb-3 || mainColorTextInfo">Inventory</h2>
                  <button className="historyLink | w-100  || cancel || rounded-0 || fw-light || px-4 || mb-3 || py-3  || cursor-pointer || d-flex || align-items-center || gap-2">
                    <span className="fs-2 || d-flex">
                      <TfiArchive />
                    </span>
                    <span className="fs-4">Serialized</span>
                  </button>
                  <button className="historyLink | w-100  || cancel || rounded-0 || fw-light || px-4 || mb-3 || py-3  || cursor-pointer || d-flex || align-items-center || gap-2">
                    <span className="fs-2 || d-flex">
                      <TfiArchive />
                    </span>
                    <span className="fs-4">Purchase</span>
                  </button>
                  <button className="historyLink | w-100  || cancel || rounded-0 || fw-light || px-4 || mb-3 || py-3  || cursor-pointer || d-flex || align-items-center || gap-2">
                    <span className="fs-2 || d-flex">
                      <TfiArchive />
                    </span>
                    <span className="fs-4">Used Inventory</span>
                  </button>
                  <button className="historyLink | w-100  || cancel || rounded-0 || fw-light || px-4 || py-3  || cursor-pointer || d-flex || align-items-center || gap-2">
                    <span className="fs-2 || d-flex">
                      <TfiArchive />
                    </span>
                    <span className="fs-4">Producy</span>
                  </button>
                </div>
              </div>
            </PopUp>
            <div className="text-center || mt-5 || pt-2">
              <a
                href="https://myphone-admin.onrender.com/"
                target="_blank"
                className="rounded-4 || adminBtn || text-capitalize"
                rel="noreferrer"
              >
                admin panel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
