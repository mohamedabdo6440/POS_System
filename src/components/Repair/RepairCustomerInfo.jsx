import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { AiOutlineArrowLeft, AiOutlineSearch } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AddCustomer from "../CheckOutComponent/CustomersComponent/AddCustomer";
import PopUp from "../PopUp/PopUp";
import { useDispatch } from "react-redux";
import { GET_DATA } from "../../redux/store/CartDataSlice";

const RepairCustomerInfo = ({
  HandleSearching,
  SearchWord,
  readOnly,
  customerSelected,
  setSearchWord,
  loading,
  customer,
  openPop,
  setShowForm,
  setOpenpopUp,
  btnDisplay,
  handleShowForm,
  addfild,
  showForm,
  getProfileCustomerData,
  ResetCustomerData,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closePop = () => {
    navigate("/");
    dispatch(GET_DATA(false));
};
  return (
    <div className="row g-0 flex-row-reverse flex-xl-row position-relative">
      <div className="col-12  || col-xl-6 || p-1  || CheckOutBox  || text-start || justify-content-start || border-start-0 || hightDefaultRepair  || position-relative">
      <span
          onClick={closePop}
          className="fs-2 cursor-pointer handleBackToPage"
        >
          <AiOutlineArrowLeft />
        </span>
        <div className="false CheckOutBoxRespn mx-auto">
          <h2 className="text-start || px-2 || fs-3 || mb-2 mainColorTextInfo">
            Customer
          </h2>
          <div className="">
            {!readOnly && (
              <div className="d-flex || pe-2 || align-items-center || justify-content-between || gap-2 || p-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    SearchWord.trim() !== "" && HandleSearching(SearchWord);
                  }}
                  className=" w-100 || my-2"
                >
                  {!readOnly ? (
                    <h2 className="fs-7 || w-100 || text-mainControl || ps-2 || fw-normal">
                      <div className="inputStyle || w-100 || d-flex || align-items-center || py-1 || rounded-3 || px-3 || inputStyleDesign">
                        <>
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="w-100"
                            value={
                              customerSelected.length !== 0
                                ? customerSelected.map(
                                    (cust) =>
                                      cust.first_name + " " + cust.last_name
                                  )
                                : SearchWord
                            }
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
                        </>
                      </div>
                    </h2>
                  ) : (
                    <button
                      className="customerBtn editPostion  rapir px-2 py-0 text-danger"
                      type="submit"
                      onClick={ResetCustomerData}
                    >
                      <IoMdClose />
                    </button>
                  )}
                </form>
              </div>
            )}
            {readOnly && (
              <button
                className="customerBtn editPostion  rapir px-2 py-0 text-danger"
                type="submit"
                onClick={ResetCustomerData}
              >
                <IoMdClose />
              </button>
            )}
            {/* this ul is popup show if not customer found and use option add new customer */}
            <ul className="list-group">
              {!loading && customer.length === 0 && (
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
                          <AddCustomer showForm={showForm} />
                        </div>
                      </div>
                    </PopUp>
                  )}
                </>
              )}
            </ul>

            {customerSelected ? (
              customerSelected.map((cust, i) => {
                return (
                  <ul
                    className="ulListHight || text-start || m-2 || list-unstyled || row || w-100 || d-flex"
                    key={i}
                  >
                    <li className="fs-9 col-6">
                      <span className="mainColorTextInfo ">Name</span> :{" "}
                      {cust.first_name + " " + cust.last_name}
                      <span
                        onClick={() => {
                          getProfileCustomerData(cust.phone);
                        }}
                        className="ms-2 cursor-pointer"
                      ></span>
                    </li>
                    <li className="fs-9 col-6">
                      <span className="mainColorTextInfo ">Phone</span> :{" "}
                      {cust.phone}
                      <span
                        onClick={() => {
                          getProfileCustomerData(cust.phone);
                        }}
                        className="ms-2 cursor-pointer"
                      >
                        <HiOutlinePencil />
                      </span>
                    </li>
                    <li className="fs-9 col-6">
                      <span className="mainColorTextInfo ">Email</span> :{" "}
                      {cust.email}
                    </li>
                    <li className="fs-9 col-6">
                      <span className="mainColorTextInfo ">Spending</span> :{" "}
                      {cust.spending}
                    </li>

                    {/* fullName={cust.first_name + " " + cust.last_name}
                        profile={cust.url}
                        points={cust.points}
                        birth_date={cust.birth_date}
                        total_order={cust.total_order} */}
                  </ul>
                );
              })
            ) : (
              <div>heer input</div>
            )}
          </div>
        </div>
      </div>
      <div className="col-12 || col-xl-6  || controlBorderHome || border-lg-end-0 || border-end-0 || CheckOutBox || position-relative ">
        <div className="totalEdit bg-transparent || px-2 || totalEditMd   || position-relative || h-auto-lg-100 w-100 || h-100 py-2 ">
          <h5 className="m-0 fw-normal || fs-5 || mb-1 mainColorTextInfo">
            Customer Notes
          </h5>
          <textarea className="w-100 || headerTextarea || textarea"></textarea>
        </div>
      </div>
    </div>
  );
};

export default RepairCustomerInfo;
