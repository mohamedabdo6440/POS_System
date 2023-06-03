import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { AiOutlineSearch } from "react-icons/ai";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TableProductsResponsive from "../CheckOutComponent/ProductsComponent/TableProductsResponsive/TableProductsResponsive";
import TableSearchProduct from "../CheckOutComponent/ProductsComponent/TableSearchProduct/TableSearchProduct";
import ControlHightPage from "../ControlHightPage/ControlHightPage";
import { Model_Variants_Search, CARTS, sanitizeKeywords } from "../EndPointsLinks";
import Reset from "../Reset/Reset";
import MainTableBuy from "./MainTableBuy";
import { useDispatch, useSelector } from "react-redux";
import { GET_DATA } from "../../redux/store/CartDataSlice";
export default function BodyOfBuy({ openPopUp, setOpenPopUp }) {
  const [openReset, setOpenReset] = useState(false);
  const [resetAbsolute, setResetAbsolute] = useState(false);
  const [sad, setSad] = useState(false);
  const row = useRef();

  //////////////////////////////////////////////////////////////////
  const [SearchWord, setSearchWord] = useState("");
  const [productSelected, setProductSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [variantsResults, setVariantsResults] = useState(false);
  const [openAddProductFilter, setopenAddProductFilter] = useState(false);
  const [IMEINumber, setIMEINumber] = useState("");
  const [renNum, setRenNum] = useState(0);
  const [totalWithoutTax, setTotalWithoutTax] = useState(0);
  const [total, setTotal] = useState(0);
  const { PageType } = useParams();
  const [CreateCart, setCreateCart] = useState(false);
  const [URL_Cart, setURL_Cart] = useState(null);
  const [CartId, setCartId] = useState(0)
  const [Items, setItems] = useState(false)
  const [number, setNumber] = useState(0);
  const [ID_CART_LOADING, setID_CART_LOADING] = useState(false)
  const [DeleteLoading, setDeleteLoading] = useState(false)

  const Cart_Use = useSelector(state => state.CartData)
  let last_cart_id = Cart_Use.count;
  const dispatch = useDispatch()

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

  }, [number, PageType, Cart_Use])


  console.log(Cart_Use);
  console.log(URL_Cart);
  console.log(Items);
  console.log(CartId);

  useEffect(() => {
    number && axios.get(`https://pos-beta.onrender.com/api/carts/${Cart_Use.data.id}`).then((res) => {
      setItems(res.data.items);
    })
    console.log("this for get items");
  }, [Cart_Use, CartId, number])

  //chick cart_id if exist
  useEffect(() => {
    if (CartId) {
      setID_CART_LOADING(true)
    } else {
      setID_CART_LOADING(false)
    }
  }, [number, CartId])

  console.log(Cart_Use);
  console.log(URL_Cart);
  console.log(Items);
  console.log(CartId);

  //this method for get chnged in total price after process
  useEffect(() => {
    let allTotal = 0;
    if (productSelected.length > 0) {
      productSelected.forEach((ele) => {
        allTotal +=
          (ele.num * ele.price.buy * 15) / 100 + ele.num * ele.price.buy;
      });
    }
    setTotal(Math.round(allTotal));
  }, [productSelected, productSelected.length, renNum]);

  useEffect(() => {
    if (productSelected.length > 0) {
      productSelected.forEach((ele) => {
        setTotalWithoutTax(ele.num * ele.price.buy);
      });
    }
  }, [productSelected, productSelected.length, renNum]);


  const handleDeleteProduct = (idProduct) => {
    const afterDelete = productSelected.filter((ele) => {
      return ele.id !== idProduct;
    });
    setProductSelected(afterDelete);
    localStorage.setItem(`buyproductInfo`, JSON.stringify(afterDelete));
  };

  //select products in table with serial number condition
  const HandleProductSelected = (productData, serial) => {
    if (!CreateCart) {
      setCreateCart(true)
      axios.post(CARTS, {
        customer: /*Customer_URL*/null,
        type: window.location.pathname.split("/").at(-2),
        origin: "pos"
      }).then((res) => {
        dispatch(GET_DATA(res.data))
      })
      setNumber(number + 1)
    }
    if (productData) {
      const myProd = productSelected.find((ele) => ele.id === productData.id);

      if (myProd) {
        myProd.num += 1;
        setProductSelected(productSelected);
        localStorage.setItem(
          `buyproductInfo`,
          JSON.stringify(productSelected)
        );
      } else {
        productData.num = 1;
        setProductSelected([...productSelected, productData]);
        localStorage.setItem(
          `buyproductInfo`,
          JSON.stringify([...productSelected, productData])
        );
      }
    }
  };

  useEffect(() => {
    let productFromStorage = JSON.parse(
      localStorage.getItem(`buyproductInfo`)
    );
    productFromStorage
      ? setProductSelected(productFromStorage)
      : setProductSelected([]);
  }, [PageType]);

  //counter  quantity in table product
  const handlePlus = (e) => {
    // const myProd = productSelected.find((ele) => ele.id === e.id);
    // myProd.num += 1;
    // setProductSelected([...productSelected]);
    // localStorage.setItem(
    //   `buyproductInfo`,
    //   JSON.stringify([...productSelected])
    // );
    // setRenNum(renNum + 1);
  };
  const handleMinus = (e) => {
    // const myProd = productSelected.find((ele) => ele.id === e.id);
    // myProd.num -= 1;
    // setProductSelected([...productSelected]);
    // localStorage.setItem(
    //   `buyproductInfo`,
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
  //////////////////////////////////////////////////////////////////

  return (
    <div
      ref={row}
      className="row || g-0 || hightControlProduct || position-relative || soverflow-x  || unselectable"
    >
      <ControlHightPage row={row} />
      <div
        className="btnReset d-block || d-xl-none  unselectable"
        onClick={() => {
          setOpenReset(true);
        }}
      >
        Show Reset
      </div>
      <div
        className={`${resetAbsolute ? ` ` : `active `
          } col-3 || transformTransition || resetAbsolute  || d-none || d-xl-block  || borderProduct`}
      >
        <Reset total={total} productSelected={productSelected} number={20} />
      </div>
      <div
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
                type="test"
                placeholder="Search In Products"
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
        </div>
        <MainTableBuy
          productSelected={productSelected}
          handleDeleteProduct={handleDeleteProduct}
          handlePlus={handlePlus}
          handleMinus={handleMinus}
          setNumber={setNumber}
          number={number}
          ItemsSelect={Items}
          setDeleteLoading={setDeleteLoading}
        />
        {/* Start TableSearchProduct */}
        <TableSearchProduct
          HandleProductSelected={HandleProductSelected}
          IMEINumber={IMEINumber}
          setIMEINumber={setIMEINumber}
          variantsResults={variantsResults}
          setVariantsResults={setVariantsResults}
          openAddProductFilter={openAddProductFilter}
          setopenAddProductFilter={setopenAddProductFilter}
          URL_Cart={URL_Cart}
          number={number}
          setNumber={setNumber}
          ID_CART_LOADING={ID_CART_LOADING}
        />

        {/* End TableSearchProduct */}
        <div
          className={`transition || h-150 || d-none || d-xl-flex || justify-content-between ||  pt-2 || unselectable || me-4 || gap-3`}
        >
          <div className="notes || d-flex || gap-2">
            <div className="w-50">
              <div className="d-flex mb-1 || w-100 || justify-content-between || align-items-center">
                <div className="">Purchase Note</div>
              </div>
              <textarea className="w-100 || textarea"></textarea>
            </div>
            <div className="w-50">
              <div className="d-flex mb-1 || w-100 || justify-content-between || align-items-center">
                <div className="">Vendor Note</div>
              </div>
              <textarea className="w-100 || textarea"></textarea>
            </div>
          </div>
          <div className="h-100 amount buy">
            <div className="d-flex || gap-3 || h-100  || align-items-end">
              <div className="d-flex  || flex-column  || w-100 || totalTax  || h-90">
                <div className="totalBg || text-start || px-2">Total</div>
                <div>
                  <div className="d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom">
                    <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                      Tax Amount
                    </h2>{" "}
                    <h2 className="text-mainControl || pe-2 || fw-normal || fs-7">
                      {" "}
                      15
                    </h2>
                  </div>
                  <div className="d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom">
                    <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                      Shipping
                    </h2>{" "}
                    <h2 className="text-mainControl || pe-2 || fw-normal || fs-7">
                      {" "}
                      $0
                    </h2>
                  </div>
                  <div className="d-flex || align-items-center || justify-content-center || gap-2 || totalBotderBottom || border-0">
                    <h2 className="fs-7 text-mainControl || ps-2 || fw-normal || pt-1">
                      Split Value in cost price
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

                    className=" text-uppercase proceed"

                    onClick={() => {
                      setOpenPopUp(true)
                    }}
                  >

                    Save
                  </button>
                  <button
                    onClick={() => setProductSelected([])}
                    className=" text-uppercase cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TableProductsResponsive
          productSelected={productSelected}
          handleDeleteProduct={handleDeleteProduct}
          handleMinus={handleMinus}
          handlePlus={handlePlus}
          URL_Cart={URL_Cart}
          number={number}
          setNumber={setNumber}
          ItemsSelect={Items}
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
                    Tax Amount
                  </h2>{" "}
                  <h2 className="text-mainControl || pe-2 || fw-normal || fs-7">
                    15
                  </h2>
                </div>
                <div className="d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom">
                  <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                    Shipping
                  </h2>{" "}
                  <h2 className="text-mainControl || pe-2 || fw-normal || fs-7">
                    {" "}
                    $0
                  </h2>
                </div>
                <div className="d-flex || align-items-center || justify-content-center || gap-2 || totalBotderBottom || border-0">
                  <h2 className="fs-7 text-mainControl || ps-2 || fw-normal || pt-1">
                    Split Value in cost price
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="notes ||  d-flex || d-xl-none  || w-100 || gap-3">
          <div className="w-50">
            <input
              type="text"
              placeholder="Purchase Note"
              className="w-100 || py-1 || textarea h-auto"
            />
          </div>
          <div className="w-50">
            <input
              type="text"
              className="textarea  || py-1 || w-100"
              placeholder="Vendor Note"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
