import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { Customer_Search, DELETE_ITEM, CARTS } from "../../components/EndPointsLinks";
import FormDataModel from "../../components/Repair/FormDataModel";
import PaymentValues from "../../components/Repair/PaymentValues";
import PopUpCustomer from "../../components/Repair/PopUpCustomer";
import PrintTableRepair from "../../components/Repair/PrintTableRepair";
import RepairCustomerInfo from "../../components/Repair/RepairCustomerInfo";
import SearchModelPopUp from "../../components/Repair/SearchModelPopUp";
import { AddRepairIssues } from "../../components/EndPointsLinks";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GET_DATA } from "../../redux/store/CartDataSlice";
import { deleteCarts } from "../../redux/store/CartsSlice";
import { Spinner } from "react-bootstrap";
import { CLOSE_LOADING, OPEN_LOADING } from "../../redux/store/LoaderSlider";
import RepairIssu from "../../components/Repair/RepairIssu";
export default function NewRepair() {
  const addfild = useRef("");
  const btnDisplay = useRef("");
  const printRef = useRef("");
  const tableEditNew = useRef("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [readOnly, setReadOnly] = useState(false);
  const [openPopList, setOpenpopUpList] = useState(false);
  const [openPop, setOpenpopUp] = useState(false);
  const [openAddProductFilter, setopenAddProductFilter] = useState(false);
  const [SearchWord, setSearchWord] = useState("");
  const [customerSelected, setCustomerSelected] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [model, setModel] = useState([]);
  const [Issu, setIssu] = useState(false);
  const [IssueSelected, setIssueSelected] = useState([]);
  const [number, setNumber] = useState(0);
  const [Reference, setReference] = useState("");
  const [ReceiptNote, setReceiptNote] = useState("");
  const { PageType } = useParams();

  //this states related for payment values
  const [TAXamount, setTAXamount] = useState(15);
  const [PriceISSU, setPriceISSU] = useState(false);
  const [Deposit, setDeposit] = useState(0);
  const [Discount, setDiscount] = useState(0);
  // Calculate tax due
  const taxDue = PriceISSU * (TAXamount / 100);
  // Calculate final price
  const DueAmount =
    PriceISSU &&
    PriceISSU.reduce(AllPrice, 0) * (1 + TAXamount / 100) - Deposit - Discount;

  //this states related  value in [FormDataModel]
  const [SearchWordModel, setSearchWordModel] = useState("");
  const [IMEInumber, setIMEInumber] = useState("");
  const [modelPassword, setModelPassword] = useState("");
  const [DeleteLoading, setDeleteLoading] = useState(false);

  const [Cart, setCart] = useState(0);
  const [Items, setItems] = useState(false);
  const AllCarts = useSelector((state) => state.CartData);
  const { error } = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  useEffect(() => {
    AllCarts && setCart(AllCarts);
  }, [PageType, AllCarts]);

  useEffect(() => {
    if (PageType === "repair") {
      Issu &&
        Cart.data &&
        axios
          .get(`https://pos-beta.onrender.com/api/carts/${Cart.data.id}`)
          .then((res) => {
            setItems(res.data.items);
          })
          .catch((error) => {
            console.log(error);
          });
    } else {
      axios
        .get(`https://pos-beta.onrender.com/api/carts/${PageType}`)
        .then((res) => {
          setItems(res.data.items);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [Issu, number, dispatch, PageType, Cart]);

  useEffect(() => {
    if (PageType !== "repair") {
      dispatch(OPEN_LOADING());
      axios
        .get(CARTS + "/" + PageType)
        .then((res) => {
          dispatch(GET_DATA(res.data));
          if (res.data.items.length < 1) {
            setItems(false);
            if (res.data.customer) {
              axios.get(res.data.customer).then((cust) => {
                setCustomerSelected((prev) => [cust.data]);
                dispatch(CLOSE_LOADING());
              });
            } else {
              dispatch(CLOSE_LOADING());
            }
            setIssu(false);
            setNumber(number + 1);
          } else {
            axios.get(res.data.items[0].repairInfo.model).then((model) => {
              axios
                .get(
                  `https://pos-beta.onrender.com/api/device/models/${model.data.id}/repairs`
                )
                .then((repair) => {
                  setIssu({ model: model.data, issue: repair.data });
                  setNumber(number + 1);
                  axios
                    .get(`https://pos-beta.onrender.com/api/carts/${PageType}`)
                    .then((res) => {
                      setItems(res.data.items);
                      if (res.data.customer) {
                        axios.get(res.data.customer).then((cust) => {
                          setCustomerSelected((prev) => [cust.data]);
                          dispatch(CLOSE_LOADING());
                        });
                      } else {
                        dispatch(CLOSE_LOADING());
                      }
                    });
                });
            });
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            theme: "dark",
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PageType]);

  //handle sum price selected
  function AllPrice(total, num) {
    return total + num;
  }
  useEffect(() => {
    const Prices =
      Items &&
      Items.map((e) => {
        return +e.price;
      });
    Prices && setPriceISSU(Prices);

    if (Items.length === 0) {
      setDeposit(0);
      setDiscount(0);
    }
  }, [Items]);

  useEffect(() => {
    customerSelected.length !== 0 ? setReadOnly(true) : setReadOnly(false);
  }, [customerSelected.length]);
  const HandleSearching = (word) => {
    setLoading(true);
    axios
      .get(Customer_Search + word)
      .then((res) => {
        setLoading(false);
        if (res.data.results.length > 0) {
          setCustomer(res.data.results);
          setSearchWord("");
          setOpenpopUpList(true);
        } else {
          setOpenpopUp(res.data.results);
          setCustomer([]);
          toast.error("No Customer Found", {
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

  //selected customer Data
  const CustomerSelected = (customerData) => {
    if (PageType === "repair") {


      if (!Cart.data) {
        axios
          .post(CARTS, {
            customer: customerData.url,
            type: window.location.pathname.split("/").at(-2),
            origin: "pos",
          })
          .then((res) => {
            setCustomerSelected((prev) => [customerData]);
            setItems(false);
            setOpenpopUpList(false);
            setNumber(number + 1);
            dispatch(GET_DATA(res.data));
          });
      } else {
        //on this for edit customer data
      }
    } else {

    }
  };

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

  const printNow = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: () => {
      // alert("ok");
    },
  });

  //reset customer select data in repair
  const ResetCustomerData = () => {
    setCustomerSelected([]);
  };

  //reset model select data in repair
  const ResetModelData = () => {
    Cart && dispatch(deleteCarts(Cart.data.id));
    setIssu(false);
    setItems([]);
    dispatch(GET_DATA(false));
  };

  //reset all data in repair
  const ResetData = () => {
    Cart && dispatch(deleteCarts(Cart.data.id));
    setCustomerSelected([]);
    setIssu(false);
  };

  //get customer information
  const getProfileCustomerData = (custID) => {
    alert("Profile Data");
  };

  //this async function for add item into database and UI
  const handleSelectIssue = (issue_id) => {
    const afterSelect =
      Issu &&
      Issu.issue.find((issueSelect) => {
        return issueSelect.id === issue_id;
      });
    AddRepairIssues(Cart.data.url, [afterSelect.url], number, setNumber);
    setIssueSelected((prev) => [...prev, afterSelect]);
  };
  //this function make delete in item request
  const handleDeleteIssueSelect = (eleId, isuues) => {

    if (Items.length === 1) {

      dispatch(deleteCarts(PageType))
      if (error) {
        console.log("error");
      } else {
        setTimeout(() => {
          window.location = "/repair/repair"
        }, 100);
      }
    } else {

      DELETE_ITEM(eleId, number, setNumber, setDeleteLoading).then((res) => {
        const mainSelect = Issu.issue.find((ele) => {
          return ele.id === isuues.repairInfo.id;
        });
        mainSelect.isActive = false;
        setIssu({ ...Issu });
      });
    }

  };
  return (
    <div>
      <PopUpCustomer
        customer={customer}
        CustomerSelected={CustomerSelected}
        openPopList={openPopList}
        setOpenpopUpList={setOpenpopUpList}
      />
      <div ref={tableEditNew}>
        <SearchModelPopUp
          Cart={Cart}
          setItems={setItems}
          openAddProductFilter={openAddProductFilter}
          setopenAddProductFilter={setopenAddProductFilter}
          ModelResult={model}
          setModel={setModel}
          tableEditNew={tableEditNew}
          Issu={Issu}
          setIssu={setIssu}
          customerSelected={customerSelected}
          setNumber={setNumber}
          number={number}
        />
      </div>
      <div className="hiddenNow || w-100">
        <PrintTableRepair printRef={printRef} />
      </div>
      <div className="row || g-0 || text-mainControl || h-100 || repair">
        <RepairCustomerInfo
          HandleSearching={HandleSearching}
          SearchWord={SearchWord}
          readOnly={readOnly}
          customerSelected={customerSelected}
          setSearchWord={setSearchWord}
          loading={loading}
          customer={customer}
          openPop={openPop}
          setShowForm={setShowForm}
          setOpenpopUp={setOpenpopUp}
          btnDisplay={btnDisplay}
          handleShowForm={handleShowForm}
          addfild={addfild}
          showForm={showForm}
          getProfileCustomerData={getProfileCustomerData}
          ResetCustomerData={ResetCustomerData}
        />
        <div className="d-flex || flex-wrap || flex-lg-nowrap || gap-3">
          <div className="d-flex  || flex-column || w-lg-50 || w-100 || pt-2 px-3 || justify-content-between h-auto">
            <h2 className="mainColorTextInfo || py-2  || text-start || px-2 || m-0">
              Repair Items
            </h2>
            <FormDataModel
              SearchWordModel={SearchWordModel}
              setLoading={setLoading}
              setModel={setModel}
              setSearchWordModel={setSearchWordModel}
              loading={loading}
              setopenAddProductFilter={setopenAddProductFilter}
              IMEInumber={IMEInumber}
              setIMEInumber={setIMEInumber}
              modelPassword={modelPassword}
              setModelPassword={setModelPassword}
              ResetModelData={ResetModelData}
              Issu={Issu}
            />
            <div className="mainBorderIssu || mt-2 || px-2 || py-2 || issuTableSelect">
              <div className="row justify-content-between || g-0 || px-1 || py-1 || h-100 || h-autoMD">
                <div className="col-12 col-md-8 ||  p-2 || h-100">
                  <div className=" d-flex || flex-column || h-100">
                    <div className="|| h-100">
                      <h5 className="m-0 fw-normal || fs-6 || mb-2 || mainColorTextInfo">
                        Issues
                      </h5>
                      <div className="w-100 || textarea || mb-2 || overflow-auto || scrollStyle || unselectable">
                        {Issu &&
                          Issu.issue.map((issu, i) => {
                            return (
                              <RepairIssu
                                key={i}
                                Items={Items}
                                issu={issu}
                                handleSelectIssue={handleSelectIssue}
                              />
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12  || col-md-4 p-2 || h-100">
                  <div className=" d-flex || flex-column || h-100">
                    <div className="h-100">
                      <h5 className="m-0 fw-normal || fs-6 || mb-2 || mainColorTextInfo">
                        Issue Selected
                      </h5>
                      <div className="w-100 ||  control-IssueSelected || pe-2   || overflow-auto || scrollStyle || unselectable ||">
                        {Items &&
                          Items.map((issue, i) => {
                            return (
                              <div
                                className="IssuBtnSelected row || g-0"
                                key={i}
                              >
                                <h6 className="mb-0 || col-10">
                                  <p className="mb-0">{issue.str}</p>
                                  <p className="mb-0 || fontSmall || fw-light || mt-1 ">
                                    <span className="fw-bold || mainColorTextInfo">
                                      Price:{" "}
                                    </span>
                                    {issue.price}
                                  </p>
                                </h6>

                                {DeleteLoading ? (
                                  <h6 className="mb-0 || col-2 ||  IoMdClose">
                                    <Spinner
                                      variant="dark"
                                      animation="border"
                                      role="status"
                                    ></Spinner>
                                  </h6>
                                ) : (
                                  <h6
                                    onClick={async () => {
                                      handleDeleteIssueSelect(
                                        issue.id,
                                        issue,
                                        setDeleteLoading
                                      );
                                    }}
                                    className="mb-0 || col-2 ||  IoMdClose"
                                  >
                                    <IoMdClose />
                                  </h6>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`transition || row || g-0 ||   pt-2 || unselectable `}
            >
              <div className="col-12 || col-xl-4 || mb-3 || mt-xl-0">
                <div className="d-flex mb-1 || w-100 || justify-content-between || align-items-center">
                  <div className="">Receipt Note</div>
                  <div className="inputStyle w-auto ">
                    <input
                      type="text"
                      placeholder="reference"
                      value={Reference}
                      onChange={(e) => {
                        setReference(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <textarea
                  className="w-100 headerTextarea || textarea"
                  value={ReceiptNote}
                  onChange={(e) => {
                    setReceiptNote(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="h-100 || h-autoMD col-12 col-xl-8">
                <div className="row || g-0  || h-100  || h-autoMD || align-items-end || justify-content-end || mt-lg-0 mt-4">
                  <div className="col-12 col-md-4 || mb-2 || mb-md-0 || col-lg-4 || h-100 || h-autoMD || ps-md-3 || ps-0">
                    <div className=" totalTax  || p-2 || h-100 ">
                      <div className="row || g-0">
                        <div className="justify-content-between || align-items-center || row || g-0 || w-100 || h-100">
                          <div className="col-12  || pe-0  ">
                            <h5 className="m-0 fw-normal || fs-6 || mb-1 || mainColorTextInfo">
                              Repair Status
                            </h5>
                            <div className="select ">
                              <select
                                className=""
                                aria-label=".form-select-lg example"
                              >
                                <option value="M">Work</option>
                                <option value="M">Fixed</option>
                                <option value="F">Checking</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12  || ps-0 || mt-1 ">
                            <h5 className="m-0 fw-normal || fs-6 || mb-1 || mainColorTextInfo">
                              Repair Type
                            </h5>
                            <div className="select">
                              <select
                                className=""
                                aria-label=".form-select-lg example"
                              >
                                <option value="M">Hardware</option>
                                <option value="M">Software</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row || g-0 ">
                        <div className="col-12 || mt-1">
                          <h5 className="m-0 fw-normal || fs-6 || mb-1 || mainColorTextInfo">
                            Assigned To
                          </h5>
                          <div className="select ">
                            <select
                              className=""
                              aria-label=".form-select-lg example"
                            >
                              <option value="M">Admin</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 || mb-2 || mb-md-0 || col-lg-4 || h-100 || h-autoMD || ps-md-3 || ps-0">
                    <div className=" totalTax || p-2 || h-100 ">
                      <div className="d-flex justify-content-between align-items-center ">
                        <h5 className="m-0 fw-normal || fs-6 || mb-2 || mainColorTextInfo">
                          Payment
                        </h5>
                        <div className="d-flex || justify-content-center || gap-2 || align-items-center">
                          <div className="selectBtn active">
                            <div className="selectBtnIcon">
                              <ImCheckmark />
                            </div>
                          </div>
                          <span className="selectAll">Customer Receipt</span>
                        </div>
                      </div>
                      <div className="PaymentValues">
                        <PaymentValues
                          TAXamount={TAXamount}
                          setTAXamount={setTAXamount}
                          PriceISSU={PriceISSU}
                          setPriceISSU={setPriceISSU}
                          AllPrice={AllPrice}
                          Deposit={Deposit}
                          setDeposit={setDeposit}
                          Discount={Discount}
                          setDiscount={setDiscount}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 || mb-2 || mb-md-0 || col-lg-4 || h-100 || h-autoMD || ps-md-3 || ps-0">
                    <div className="totalEdit flex-column align-items-center justify-content-end || h-100 || d-flex  ">
                      <div className="row || align-items-center || justify-content-center || w-100">
                        <h2 className="col-5 || fs-5  || text-end">
                          Due Amount{" "}
                        </h2>
                        <h2 className="col-5 || text-mainControl || fs-5">
                          : $ {Math.round(DueAmount)}
                        </h2>
                      </div>
                      <div className="d-flex || gap-2 ||justify-content-end mb-2">
                        <div className="d-flex || justify-content-lg-start || justify-content-center || gap-2 || align-items-center">
                          <div className="selectBtn active">
                            <div className="selectBtnIcon">
                              <ImCheckmark />
                            </div>
                          </div>
                          <span className="selectAll">Tech Receipt</span>
                        </div>
                        <div className="d-flex || justify-content-lg-start || justify-content-center || gap-2 || align-items-center ">
                          <div className="selectBtn active">
                            <div className="selectBtnIcon">
                              <ImCheckmark />
                            </div>
                          </div>
                          <span className="selectAll">Print Receipt</span>
                        </div>
                      </div>
                      <div className="text-center mb-2">
                        <button className=" text-uppercase proceed ">
                          Save & Add More
                        </button>
                      </div>
                      <div className="d-flex || align-items-center || justify-content-start || gap-3">
                        <button
                          onClick={printNow}
                          className=" text-uppercase proceed"
                        >
                          Save
                        </button>
                        <button
                          onClick={ResetData}
                          className=" text-uppercase cancel"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
