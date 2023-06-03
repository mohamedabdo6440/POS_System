import axios from "axios";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";


let Base_URL = "https://pos-beta.onrender.com";
//function for handle search word
function getSeparator(word) {
  return word.toLowerCase() === "grade" ? " " : "_";
}
export const sanitizeKeywords = (keywords) => {
  return keywords
    .split(" ")
    .reduce((prev, next) => prev + getSeparator(prev) + next);
};


//auth token api
export const Auth_Token = `${Base_URL}/api/auth/token`;


//Model_Variants endPoints
export const Model_Variants = `${Base_URL}/api/device/models-variants`;

//Search_url Model_Variants
export const Model_Variants_Search = `${Base_URL}/api/device/models-variants/search?search=`;

//Customers endPoints
export const Customer = `${Base_URL}/api/customers`;
export const Customer_Search = `${Base_URL}/api/customers?search=`;
export const Create_First_Customer = `${Base_URL}/api/customers/pos_first_creation`;

//Repair endPoint
export const POST_New_Repair = `${Base_URL}/api/repair/repair?format=api`;
export const Get_Repair_Model_Search = `${Base_URL}/api/device/models?search=`;
export const Repair_History_Search = `${Base_URL}/api/repair/repair?search=`;


//Carts endpoint
export const CARTS = `${Base_URL}/api/carts`;

//THIS LINK FOR PATCH ITEMS IN THIS CART
export const ADD_ITEMS = `${Base_URL}/api/cartitems`;

export const AddItem = async (URL_Cart, URL_Item, Quantity_Item, num, setNum) => {
  await axios.post(ADD_ITEMS, {
    cart: URL_Cart,
    model_variant: URL_Item,
    quantity: Quantity_Item,
  })
    .then(function (response) {
      if (response.status === 201) {
        console.log("add item success");
      }
    }).then(() => {
      setNum(num + 1)
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const DELETE_ITEM = async (Item_ID, num, setNum, isLoading) => {
  isLoading(true)
  await axios.delete(`${Base_URL}/api/cartitems/${Item_ID}`)
    .then(response => {
      isLoading(true)
      console.log("delete succes");
    }).then(() => {
      isLoading(false)
      setNum(num + 1)
    })
    .catch(error => {
      console.log(error);
    });
}


export const AddRepairIssues = (URL_Cart, REPAIRS, num, setNum) => {
  axios.get(URL_Cart).then((res) => {
    console.log(res.data);
    const Find_Data = res.data.items.find((ele) => { return ele.repairInfo.url === REPAIRS[0] })
    if (!Find_Data) {
      axios.post(ADD_ITEMS, {
        cart: URL_Cart,
        repairs: REPAIRS,
      })
        .then(function (response) {
          if (response.status === 201) {
            console.log("add issue");
          }
        }).then(() => {
          setNum(num + 1)
        })
        .catch(function (error) {
          console.log(error);

        });

    } else {
      toast.info("Issue Selected Before", {
        theme: "dark",
      });
    }
  })

}


export const CREATE_ORDER = (CartId) => {
  axios.post(`${CARTS}/${CartId}/validate`).then(() => {
    toast.success("Create Order Success", {
      theme: "dark",
    });
  })
}

export const DELETE_ORDER = (CartId, num, setNum) => {
  axios.delete(`${CARTS}/${CartId}`).then(() => {
    toast.success("Delete Order Success", {
      theme: "dark",
    });
  }).then(() => {
    setNum(num + 1)
  }).catch(function (error) {
    console.log(error);
  });
}

