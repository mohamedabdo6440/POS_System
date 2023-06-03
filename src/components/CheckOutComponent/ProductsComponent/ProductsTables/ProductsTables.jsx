import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";
import TableProductsResponsive from "../TableProductsResponsive/TableProductsResponsive";
import TableProductsMain from "../TableProductsMain/TableProductsMain";
import TableSearchProduct from "../TableSearchProduct/TableSearchProduct";
import {

  Model_Variants_Search,
  CARTS,
  sanitizeKeywords,

} from "../../../EndPointsLinks";
import { GET_DATA } from "../../../../redux/store/CartDataSlice";
import CheckOutPop from "../../../CheckOutPop/CheckOutPop";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import ControlHightBodyTable from "../../../ControlHightBodyTable/ControlHightBodyTable";
import { useDispatch, useSelector } from "react-redux";
import { GET_SELL } from "../../../../redux/store/CustomerSliceCart";
import { CLOSE_LOADING, OPEN_LOADING } from "../../../../redux/store/LoaderSlider";
export default function ProductsTables({
  setResetAbsolute,
  resetAbsolute,
  searchRef,
  scroll,
  tableScroll,
  productSelected,
  setProductSelected,
  setRenNum,
  renNum,
  total,
  resReset,
  totalWithoutTax,
}) {
  const tableProductControl = useRef();
  const [SearchWord, setSearchWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [variantsResults, setVariantsResults] = useState(false);
  const [sad, setSad] = useState(false);
  const [openAddProductFilter, setopenAddProductFilter] = useState(false);
  const [IMEINumber, setIMEINumber] = useState("");
  const [openCheckOut, setOpenCheckOut] = useState(false);
  const [CreateCart, setCreateCart] = useState(false);
  const [CustomerData, setCustomerData] = useState(false);
  const { PageType } = useParams();
  const [number, setNumber] = useState(0);
  const [DeleteLoading, setDeleteLoading] = useState(false)

  //use request to isertNew item
  const [URL_Cart, setURL_Cart] = useState(null);
  const [CartId, setCartId] = useState(0)
  const [Items, setItems] = useState(false)
  const [ID_CART_LOADING, setID_CART_LOADING] = useState(false)
  const Cart_Use = useSelector(state => state.CartData)
  let last_cart_id = Cart_Use.count;

  const dispatch = useDispatch()
  const Customer_URL = CustomerData ? CustomerData.map((cust) => {
    return (cust.url)
  })[0] : null;

  //this code for get customer data after select 
  let cust = JSON.parse(localStorage.getItem(`checkoutcustomer`)) ? JSON.parse(localStorage.getItem(`checkoutcustomer`)) : []
  useEffect(() => {
    if (cust) {
      setCustomerData(cust);
    } else {
      setCustomerData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cust.length]);

  //check changes in carts length and get last cart url ------
  useEffect(() => {
    // dispatch(getCart_Use())
    Cart_Use.results && Cart_Use.results.filter((cart) => {
      return cart.origin === "pos" && cart.type === PageType;
    }).filter((lastitem) => {
      return lastitem.id === last_cart_id
    })
    Cart_Use && setURL_Cart(Cart_Use.data.url)
    Cart_Use && setCartId(Cart_Use.data.id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number, dispatch, PageType, Cart_Use])

  console.log(CustomerData);
  useEffect(() => {
    if (PageType === "sell") {
      number && axios.get(`https://pos-beta.onrender.com/api/carts/${Cart_Use.data.id}`).then((res) => {
        setItems(res.data.items);
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cart_Use, CartId, number])
  useEffect(() => {
    if (PageType !== "sell") {
      dispatch(OPEN_LOADING());
      axios.get(`https://pos-beta.onrender.com/api/carts/${PageType}`).then((res) => {
        setItems(res.data.items);
        setURL_Cart(res.data.url)
        if (res.data.customer) {
          axios.get(res.data.customer).then(cust => {
            dispatch(GET_SELL([cust.data]))
          })
        } else {
          setTimeout(() => {
            dispatch(GET_SELL(false))
          }, 1000);
        }
      }).then(() => {
        dispatch(CLOSE_LOADING());
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PageType])

  //chick cart_id if exist
  useEffect(() => {
    if (CartId) {
      setID_CART_LOADING(true)
    } else {
      setID_CART_LOADING(false)
    }
  }, [CartId])


  //select products in table with serial number condition
  const HandleProductSelected = (productData, serial) => {
    if (!CreateCart) {
      setCreateCart(true)
      axios.post(CARTS, {
        customer: Customer_URL,
        type: window.location.pathname.split("/").at(-2),
        origin: "pos"
      }).then((res) => {
        dispatch(GET_DATA(res.data))
      })
      setNumber(number + 1)
    }
  };

  //counter  quantity in table product
  const handlePlus = (e) => {
    // const myProd = productSelected.find((ele) => ele.id === e.id);
    // myProd.num += 1;
    // setProductSelected([...productSelected]);
    // localStorage.setItem(
    //   `${PageType}productInfo`,
    //   JSON.stringify([...productSelected])
    // );
    // setRenNum(renNum + 1);
  };
  const handleMinus = (e) => {
    // const myProd = productSelected.find((ele) => ele.id === e.id);
    // myProd.num -= 1;
    // setProductSelected([...productSelected]);
    // localStorage.setItem(
    //   `${PageType}productInfo`,
    //   JSON.stringify([...productSelected])
    // );
    // setRenNum(renNum + 1);
  };


  //function search in products
  const HandleSearching = (word) => {
    setLoading(true);
    axios
      .get(Model_Variants_Search + sanitizeKeywords(word))
      .then((res) => {
        setLoading(false);
        if (res.data.results.length > 0) {
          setVariantsResults(res.data);
          setopenAddProductFilter(true);
          setSearchWord("");
        } else {
          setVariantsResults(false);
          setopenAddProductFilter(false);
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
    <div
      ref={resReset}
      className={`${resetAbsolute ? `col-xl-9` : `col-xl-12 `
        } col-12  || pt-5 || px-3 || position-relative || transitionWidth`}
    >
      <div
        className="postiveControlReset d-none || d-xl-flex "
        onClick={(e) => {
          setResetAbsolute(!resetAbsolute);
          if (window.innerHeight < 560) {
            setSad(true);
          } else {
            setSad(false);
          }
        }}
      >
        {!resetAbsolute ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
      </div>
      <div className="inputStyleProduct || pt-5 pt-xl-0 || text-start || mb-4 || mx-auto || mx-xl-0  || px-3 ">
        <h2 className="px-2 || fs-3">Search Product</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            variantsResults.length !== 0 &&
              SearchWord.trim() !== "" &&
              HandleSearching(SearchWord);
          }}
        >
          <div className="inputStyle || fs-6  || rounded-2 || d-flex || justify-content-between || align-items-center">
            <input
              ref={searchRef}
              type="test"
              value={SearchWord}
              placeholder="Search In Products"
              className="w-100"
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
      </div>
      {/* Start TableSearchProduct */}
      <TableSearchProduct
        searchRef={searchRef}
        setVariantsResults={setVariantsResults}
        tableScroll={tableScroll}
        scroll={scroll}
        HandleProductSelected={HandleProductSelected}
        IMEINumber={IMEINumber}
        setIMEINumber={setIMEINumber}
        variantsResults={variantsResults}
        openAddProductFilter={openAddProductFilter}
        setopenAddProductFilter={setopenAddProductFilter}
        URL_Cart={URL_Cart}
        number={number}
        setNumber={setNumber}
        ItemsSelect={Items}
        ID_CART_LOADING={ID_CART_LOADING}

      />
      {/* End TableSearchProduct */}
      <ControlHightBodyTable tableProductControl={tableProductControl} />
      <div
        ref={tableProductControl}
        className={`${resetAbsolute ? `` : `active`} ${sad ? `heightEdit` : ``
          }   tableProduct tableProductControl table-responsive  px-3 scrollStyle || d-none || d-xl-block me-4`}
      >
        {/* [afetr select table] This table contains the selected data  */}
        <table className="table table-responsive">
          <thead>
            <tr>
              <th colSpan="1">
                <h5 className="pb-3">Items Code</h5>
              </th>
              <th colSpan="3">
                <h5 className="pb-3">Items name</h5>
              </th>
              <th colSpan="1">
                <h5 className="pb-3">Quantity</h5>
              </th>
              <th colSpan="2">
                <h5 className="pb-3">Unit Price</h5>
              </th>
              <th colSpan="2">
                <h5 className="pb-3">Tax</h5>
              </th>
              <th colSpan="2">
                <h5 className="pb-3">Cost</h5>
              </th>
              <th colSpan="2">
                <h5 className="pb-3 border-end-0">Delete</h5>
              </th>
            </tr>
          </thead>
          {/*Start  Table Main*/}
          <TableProductsMain
            tableScroll={tableScroll}
            scroll={scroll}
            productSelected={productSelected}
            handleMinus={handleMinus}
            handlePlus={handlePlus}
            setNumber={setNumber}
            number={number}
            ItemsSelect={Items}
            DeleteLoading={DeleteLoading}

            setDeleteLoading={setDeleteLoading}

          />
          {/*End  Table Main*/}
        </table>
      </div>

      {/*Start Responsive Table */}
      <TableProductsResponsive
        resetAbsolute={resetAbsolute}
        tableProductControl={tableProductControl}
        productSelected={productSelected}
        handleMinus={handleMinus}
        handlePlus={handlePlus}
        resReset={resReset}
        number={number}
        setNumber={setNumber}
        setDeleteLoading={setDeleteLoading}
        DeleteLoading={DeleteLoading}
      />
      <div
        className={`fs-6 || transition || d-block || d-xl-none ||   py-2 || unselectable`}
      >
        <div className="d-flex || gap-2 || align-items-center || justify-content-center ">
          <div className="d-flex  || flex-column  || gap-2 || w-100 || totalTax || justify-content-between  || h-100">
            <div className="totalBg || text-start || px-2">Total</div>
            <div>
              <div className="d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom">
                <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                  Sub Total
                </h2>{" "}
                <h2 className="text-mainControl || pe-2 || fw-normal || fs-7">
                  {" "}
                  ${total}
                </h2>
              </div>
              <div className="d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom">
                <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                  Tax Amount
                </h2>{" "}
                <h2 className="text-mainControl || pe-2 || fw-normal || fs-7">
                  {" "}
                  15
                </h2>
              </div>
              <div className="d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || border-0">
                <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                  Grand Total
                </h2>{" "}
                <h2 className="text-mainControl || pe-2 || fw-normal || fs-7">
                  {" "}
                  ${total}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="notes ||  d-flex || d-xl-none  || w-100 || gap-3">
        <div className="w-75">
          <input
            type="text"
            placeholder="Receipt Note"
            className="w-100 || py-1 || textarea h-auto"
          />
        </div>
        <div className="w-auto w-25">
          <input
            type="text"
            className="textarea || py-1 || w-100"
            placeholder="reference"
          />
        </div>
      </div>
      <div className=" d-flex || d-xl-none || gap-2 || justify-content-center || mt-2">
        <button
          className=" text-uppercase proceed || py-1"
          onClick={() => setOpenCheckOut(true)}
        >
          Checkout
        </button>
        <button className=" text-uppercase cancel || py-1">Cancel</button>
      </div>
      {/*End Responsive Table */}
      <CheckOutPop
        setOpen={setOpenCheckOut}
        open={openCheckOut}
        headPop={"Checkout"}
        total={total}
        productSelected={productSelected}
        CartId={CartId}
      />
      <div
        className={`transition || h-150 || d-none || d-xl-flex || justify-content-between ||  pt-2 || unselectable || me-4 || gap-3`}
      >
        <div className="notes ">
          <div className="d-flex mb-1 || w-100 || justify-content-between || align-items-center">
            <div className="">Receipt Note</div>
            <div className="inputStyle w-auto ">
              <input type="text" placeholder="reference" />
            </div>
          </div>
          <textarea className="w-100 || textarea"></textarea>
        </div>
        <div className="h-100 amount">
          <div className="d-flex || gap-3 || h-100  || align-items-end">
            <div className="d-flex  || flex-column || gap-2 || w-100 || totalTax || justify-content-between || h-90">
              <div className="totalBg || text-start || px-2">Total</div>
              <div>
                <div className="d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom">
                  <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                    Sub Total
                  </h2>{" "}
                  <h2 className="text-mainControl || pe-2 || fw-normal || fs-7">
                    {" "}
                    ${totalWithoutTax}
                  </h2>
                </div>
                <div className="d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom">
                  <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                    Tax Amount
                  </h2>{" "}
                  <h2 className="text-mainControl || pe-2 || fw-normal || fs-7">
                    {" "}
                    15
                  </h2>
                </div>
                <div className="d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || border-0">
                  <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                    Grand Total
                  </h2>{" "}
                  <h2 className="text-mainControl || pe-2 || fw-normal || fs-7">
                    {" "}
                    ${total}
                  </h2>
                </div>
              </div>
            </div>
            <div className="totalEdit">
              <div className="d-flex || align-items-center || justify-content-center || gap-2 || mb-2 ">
                <h2 className="fs-3">Total :</h2>{" "}
                <h2 className="text-mainControl || fs-3"> ${total}</h2>
              </div>
              <div className="d-flex || align-items-center || justify-content-start || gap-3">
                <button
                  onClick={() => setOpenCheckOut(true)}
                  className=" text-uppercase proceed"
                >
                  Checkout
                </button>
                <button
                  onClick={() => {

                    // ResetAllData
                  }}
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
  );
}
