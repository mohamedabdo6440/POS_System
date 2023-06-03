import React, { useRef, useState } from "react";
import AddCustomer from "./AddCustomer";
import { AiOutlineSearch } from "react-icons/ai";
import PopUp from "../../../components/PopUp/PopUp";
import { ImCheckmark } from "react-icons/im";
import { toast } from "react-toastify";
import axios from "axios";
import Transactions from "../Transactions/Transactions";
import { Customer_Search } from "../../EndPointsLinks";
import CustomerSelectedInfo from "./CustomerSelectedInfo";
import Spinner from "react-bootstrap/esm/Spinner";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const SearchCustomer = ({ number, setNumber }) => {
  const addfild = useRef("");
  const btnDisplay = useRef("");
  const [SearchWord, setSearchWord] = useState("");
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(true);
  const [openPop, setOpenpopUp] = useState(false);
  const [openPopList, setOpenpopUpList] = useState(false);
  const [openSpends, setOpenSpends] = useState(false);
  const [customerSelected, setCustomerSelected] = useState([]);
  const { PageType } = useParams();
  const customerName = useSelector(cart=> cart.CustomerSliceCart.sell)
  console.log(customerName);
  useEffect(()=>{
    if(PageType!== "sell"){
      if(customerName){
        setCustomerSelected(customerName)
        setOpenpopUpList(false);
        setShowSearchInput(false);
      }else{
        setCustomerSelected([])
      }
    }
  },[PageType, customerName])
  const HandleSearching = (word) => {
    setLoading(true);
    axios
      .get(Customer_Search + word)
      .then((res) => {
        setLoading(false);
        if (res.data.results.length > 0) {
          setCustomer(res.data.results);
          setOpenpopUpList(true);
          setSearchWord("");
        } else {
          setOpenpopUp(res.data.results);
          setCustomer([]);
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

  //add customer data after selected to localStorage

  //handle showing form
  const handleShowForm = (e) => {
    if (showForm) {
      setShowForm(false);
      addfild.current.classList.remove("d-none");
      setTimeout(() => {
        addfild.current.style.opacity = 1;
        addfild.current.style.visibility = "visible";
      }, 10);
      btnDisplay.current.style.opacity = 0;
      btnDisplay.current.style.visibility = "hidden";
      setTimeout(() => {
        btnDisplay.current.classList.add("d-none");
      }, 300);
    } else {
      btnDisplay.current.classList.remove("d-none");
      setTimeout(() => {
        btnDisplay.current.style.opacity = 1;
        btnDisplay.current.style.visibility = "visible";
      }, 10);
      addfild.current.style.opacity = 0;
      addfild.current.style.visibility = "hidden";
      setTimeout(() => {
        addfild.current.classList.add("d-none");
      }, 300);
      setShowForm(true);
    }
  };

  //selected customer Data
  const CustomerSelected = (customerData) => {
    if (customerData) {
      setCustomerSelected((prev) => [customerData]);
      localStorage.setItem(
        `checkoutcustomer`,
        JSON.stringify([customerData])
      );
    }
    setOpenpopUpList(false);
    setShowSearchInput(false);
    setNumber(number + 1);
  };

  //handle swaping inputSearch with customerData reset all data for this acction
  const handleSwap = () => {
    setShowSearchInput(true);
    setSearchWord("");
    setCustomerSelected([]);
    setCustomer([]);
    setNumber(number + 1);
    localStorage.removeItem(`checkoutcustomer`);
  };

  return (
    <div
      className={`${customerSelected.length !== 0 && ` w-100`
        } CheckOutBoxRespn mx-auto`}
    >
      {customerSelected.length === 0 && (
        <h2 className="text-start || px-2 || fs-3 || mb-2 ">Customer</h2>
      )}

      {openSpends && (
        <Transactions openSpends={openSpends} setOpenSpends={setOpenSpends} />
      )}
      <div className="">
        {customerSelected.length === 0 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              SearchWord.trim() !== "" && HandleSearching(SearchWord);
            }}
          >
            <div className="inputStyle  || rounded-2 || d-flex || justify-content-between || align-items-center">
              <input
                type="text"
                placeholder="Search In Customer"
                className="w-100"
                value={SearchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                }}
              />
              {loading ? (
                <button
                  className="customerBtn px-2 py-0 || position-relative"
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
                  className="customerBtn px-2 py-0 || position-relative"
                  type="submit"
                >
                  <AiOutlineSearch />
                </button>
              )}
            </div>
          </form>
        )}

        <div className={`${showSearchInput ? "d-none" : ""} `}>
          {customerSelected.length !== 0 &&
            customerSelected.map((custData, i) => {
              return (
                <CustomerSelectedInfo
                  key={i}
                  id={custData.id}
                  spending={custData.spending}
                  first_name={custData.first_name}
                  last_name={custData.last_name}
                  email={custData.email}
                  phone={custData.phone}
                  points={custData.points}
                  handleSwap={handleSwap}
                  setOpenSpends={setOpenSpends}
                />
              );
            })}
        </div>

        <ul className="list-group">
          {!loading &&
            (customer.length !== 0 ? (
              openPopList && (
                <PopUp
                  open={openPopList}
                  setShow={setShowForm}
                  setOpen={setOpenpopUpList}
                  headPop="Customer"
                >
                  <div className="border mt-2 || h-100 ">
                    <div className="py-1 || text-black || mb-2 || mainColorText || border-bottom || d-flex || cursor-auto || align-items-center || justify-content-between || px-0 px-xl-3 ">
                      <div className="d-flex || w-100 || px-2 || text-start || cursor-auto">
                        Name
                      </div>
                      <div className="w-30px || text-end || d-flex || justify-content-center  || border-start ">
                        <div className="fs-5 || px-2  || d-flex || fw-normal || mb-0 || w-70px">
                          Select
                        </div>
                      </div>
                    </div>
                    {customer.map((cust, i) => {
                      return (
                        <div key={i} className="px-0 ">
                          <div className="py-1 | || text-black  || mainColorText || border-bottom || d-flex || align-items-center || justify-content-between || px-0 px-xl-3 ">
                            <div className="d-flex px-2 | w-100-70  || text-start">
                              {cust.str}
                            </div>
                            <div className="w-30px || text-end || || d-flex || justify-items-center || || border-start ">
                              <p
                                onClick={() => {
                                  CustomerSelected(cust);
                                }}
                                className="fs-5  px-2  || p-2 || d-flex || cursor-pointer || mx-auto || text-success || mb-0"
                              >
                                <ImCheckmark />
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </PopUp>
              )
            ) : (
              <>
                {openPop && (
                  <PopUp
                    open={openPop}
                    setShow={setShowForm}
                    setOpen={setOpenpopUp}
                    headPop="Create Customer"
                  >
                    <div className="unselectable || text-center || w-80 || mx-auto">
                      <div ref={btnDisplay} className="transition">
                        <div className="text-secondary || fs-5">
                          This Customer Does Not Exist
                        </div>
                        <div className="">
                          <button
                            className="mt-3 btnDesign fw-normal"
                            onClick={handleShowForm}
                          >
                            Create Customer
                          </button>
                        </div>
                      </div>
                      <div ref={addfild} className="d-none transition">
                        <AddCustomer showForm={showForm} setOpenpopUp={setOpenpopUp} />
                      </div>
                    </div>
                  </PopUp>
                )}
              </>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchCustomer;
