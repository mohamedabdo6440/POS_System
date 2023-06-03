import React, { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Keyboard, Navigation } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
import sell from "../../images/HomeImg/sell.png";
import rapair from "../../images/HomeImg/repair.png";
import buy from "../../images/HomeImg/buy.png";
import "swiper/swiper.min.css";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useDispatch } from "react-redux";
import { CLOSE_LOADING, OPEN_LOADING } from "../../redux/store/LoaderSlider";
import { Spinner } from "react-bootstrap";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import "./SwiperPop.css";
import { DELETE_ORDER } from "../EndPointsLinks";
import { deleteCarts } from "../../redux/store/CartsSlice";



SwiperCore.use([Navigation, Keyboard]);
export default function SwiperPop({ setOpenPages, num, setNum, openPages }) {
  const [page, setPage] = useState(false);
  const [data, setData] = useState(false);
  const [count, setCount] = useState(1);
  const [loadingPrevious, setLoadingPrevious] = useState(true);
  const [loadingNext, setLoadingNext] = useState(true);
  const [numPagination, setnumPagination] = useState(1);
  const [number, setNumber] = useState(0)

  const dispatch = useDispatch();
  const [paginationInfo, setPaginationInfo] = useState({
    previous: null,
    next: null,
  });
  useEffect(() => {
    if (openPages) {
      setPage(false);
      dispatch(OPEN_LOADING());
      axios
        .get(`https://pos-beta.onrender.com/api/carts`)
        .then((res) => {
          const posCarts = res.data.results.filter(
            (pos) => pos.origin === "pos"
          );
          setData(posCarts);
          setCount(res.data.count);
          setPaginationInfo({
            previous: res.data.previous,
            next: res.data.next,
          });
          setnumPagination(1);
          dispatch(CLOSE_LOADING());
        })
        .then((res) => {
          setPage(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num, openPages]);
  const getPagination = (url, type, setLoading) => {
    setLoading(false);
    if (url) {
      axios
        .get(url)
        .then((res) => {
          const posCarts = res.data.results.filter(
            (pos) => pos.origin === "pos"
          );
          setData(posCarts);
          setCount(res.data.count);
          setPaginationInfo({
            previous: res.data.previous,
            next: res.data.next,
          });
          setLoading(true);
        })
        .then((res) => {
          if (type) {
            setnumPagination(numPagination + 1);
          } else {
            setnumPagination(numPagination - 1);
          }
        });
    }
  };
  const CustomerName = (props) => {
    const [customerInfo, setCustomerInfo] = useState(false);
    const [loading, setLoading] = useState(false);
    if (props.customer) {
      axios.get(props.customer).then((res) => {
        setLoading(true);
        setCustomerInfo(`${res.data.first_name} ${res.data.last_name}`);
      });
      if (loading) {
        return customerInfo;
      } else {
        return (
          <>
            <div className="opacity-0 unvisable || d-flex">"loading"</div>
            <div className="transtionEdit || d-flex">
              <Spinner />
            </div>
          </>
        );
      }
    } else {
      return "No Customer";
    }
  };
  return (
    <>
      {page && (
        <div
          className={`${openPages ? `visable` : `unvisable`
            } swiperPop transition`}
        >
          <div className="container || pSwiper || bgSwper || px-5 || position-relative">
            <div
              className="iconPop iconPopS"
              onClick={() => {
                setOpenPages(false);
                setData(false);
                setPage(false);
                setCount(false);
                setPaginationInfo({ previous: null, next: null });
                setnumPagination(1);
              }}
            >
              <IoMdClose />
            </div>
            <>
              <div className="w-100 controlHightSwiper scrollStyle">
                <Swiper
                  className={`SwiperPopUpHistory`}
                  spaceBetween={50}
                  slidesPerView={4}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                    1280: {
                      slidesPerView: 4,
                    },
                  }}
                  nested={true}
                  keyboard={{
                    enabled: true,
                    onlyInViewport: true,
                    pageUpDown: true,
                  }}
                  navigation
                >
                  {data &&
                    data.map((ele) => (
                      <SwiperSlide
                        key={ele.id}
                        className="flex cursor-pointer select-none py-3 flex-col justify-center  || position-relative items-center"
                      >
                        <div onClick={() => {
                          DELETE_ORDER(ele.id, number, setNumber)
                        }} className="iconPop || position-absolute">
                          <IoMdClose />
                        </div>
                        <Link
                          onClick={() => {
                            setOpenPages(false);
                          }}
                          to={`${ele.type === "sell" ? `sell/${ele.id}` : ele.type === "buy" ? `buy/${ele.id}` : ele.type === "repair" && `repair/${ele.id}`}`}
                          className="SwiperSlideBox"
                        >
                          <div className="w-100 || box">
                            <div className="boxControl || rounded-5">
                              <div className="img w-112">
                                {ele.type === "repair" ? (
                                  <img src={rapair} alt="" className="w-100" />
                                ) : ele.type === "buy" ? (
                                  <img src={buy} alt="" className="w-100" />
                                ) : (
                                  <img src={sell} alt="" className="w-100" />
                                )}
                              </div>
                            </div>
                          </div>
                          <h2 className="text-center || mt-2">{ele.type}</h2>
                          <h2 className="text-center || fs-6 || fw-normal || mt-2 || position-relative">
                            <CustomerName customer={ele.customer} />
                          </h2>
                          <h2 className="text-center || fs-6 || fw-normal || mt-2 ">
                            {ele.items.length === 0
                              ? "No items"
                              : `${ele.items.length} Items`}
                          </h2>
                        </Link>
                      </SwiperSlide>
                    ))}
                </Swiper>
                <div className="d-flex || mt-2 || align-items-center || justify-content-center">
                  {loadingPrevious ? (
                    <button
                      className={`${paginationInfo.previous ? `visable` : ` unvisable`
                        }  position-relative`}
                      onClick={() => {
                        getPagination(
                          paginationInfo.previous,
                          false,
                          setLoadingPrevious
                        );
                      }}
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
                  <p className="m-0 numPagination">{numPagination} OF {Math.ceil(count / 20)}</p>

                  {loadingNext ? (
                    <button
                      className={`${paginationInfo.next ? `visable` : ` unvisable`
                        }  position-relative`}
                      onClick={() => {
                        getPagination(
                          paginationInfo.next,
                          true,
                          setLoadingNext
                        );
                      }}
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
                {/* <div className="d-flex || mt-3 || align-items-center || justify-content-center">
                  <button
                    className="cancel"
                    onClick={() => {
                     
                      document.querySelector(".SwiperPopUpHistory .swiper-wrapper").style.transform  =  "rotate(7deg)"
                    }}
                  >
                    Remove All
                  </button>
                </div> */}
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
}
