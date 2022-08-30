import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const HeroBusiness = () => {
  const [subAccounts, setSubaccounts] = useState();
  const initialState = {
    type: "",
    name: "",
    categoryname: "",
    subaccount: "",
  };
  const [selectBusiness, setBusiness] = useState(initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("https://agriha.herokuapp.com/account/business_subaccounts", config)
      .then((response) => {
        console.log(response);
        setSubaccounts(response.data.subAccounts);
      });
  }, []);
  console.log(subAccounts);
  const checkProduct = () => {
    var product = document.querySelector(
      "input[type=radio][id=product]:checked"
    );
    if (product) {
      setBusiness({ ...selectBusiness, type: "Product" });
      document.getElementById("inputName").placeholder = "Product Name";
    }
  };

  const checkService = () => {
    var service = document.querySelector(
      "input[type=radio][id=service]:checked"
    );
    if (service) {
      setBusiness({ ...selectBusiness, type: "Service" });
      document.getElementById("inputName").placeholder = "Service Name";
    }
  };

  const checkBoth = () => {
    var both = document.querySelector("input[type=radio][id=both]:checked");
    if (both) {
      setBusiness({ ...selectBusiness, type: "Product & Service" });
      document.getElementById("inputName").placeholder =
        "Product & Service Name";
    }
  };

  const handleNextBtn = (e) => {
    const accountId = subAccounts.filter((items) => {
      return items.type === selectBusiness.type;
    });

    const name = document.getElementById("inputName");
    const category = document.getElementById("selects");
    if (accountId) {
      if (name.value) {
        if (category.value) {
          const token = localStorage.getItem("token");
          let config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          axios
            .post(
              "https://arclifauth-ki3qrbsnza-uc.a.run.app/account/add_businessSubaccount",
              {
                name: name.value,
                categoryname: category.value,
                subaccount: accountId[0]._id,
              },
              config
            )
            .then((response) => {
              console.log(response.data);
              if (response.data.status === 200) {
                window.location.href =
                  "https://arclif-app.vercel.app/auth?id=${token}";
              }
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          alert("please select category");
        }
      } else {
        alert("Please fill product or service name");
      }
    } else {
      alert("Something went Wrong");
    }
  };

  return (
    <div>
      <div className={styles.hero__personal}>
        <div
          style={{ backgroundImage: 'url("/heroback2.jpg")' }}
          className={styles.left__hero__verify}
        ></div>
        <div className={styles.right__hero__verify}>
          <h5>Type of Business</h5>
          <p>
            Bring your Company to the next level. Ensure and enjoy the freedom
            of finding your perfect clients.
          </p>
          <form className={styles.formRadio}>
            <input
              id="product"
              type="radio"
              onClick={checkProduct}
              name="radio__business"
            />{" "}
            <h6>Product</h6>
            <input
              onClick={checkService}
              id="service"
              type="radio"
              name="radio__business"
            />{" "}
            <h6>Service</h6>
            <input
              onClick={checkBoth}
              id="both"
              type="radio"
              name="radio__business"
            />{" "}
            <h6>Product & Service</h6>
          </form>
          <div className={styles.inputContaniner__business}>
            <div className={styles.hero__input__create}>
              <input id="inputName" type="text" placeholder="Product Name" />
            </div>
            <div className={styles.hero__input__create}>
              <select
                id="selects"
                className={styles.categories}
                name="categories"
              >
                <option className={styles.category} value="product__category">
                  Product Category
                </option>
                <option className={styles.category} value="product__category">
                  Product Category
                </option>
                <option className={styles.category} value="product__category">
                  Product Category
                </option>
                <option className={styles.category} value="product__category">
                  Product Category
                </option>
                <option className={styles.category} value="product__category">
                  Product Category
                </option>
              </select>
            </div>
          </div>
          <div className={styles.hero__button} onClick={handleNextBtn}>
            NEXT
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBusiness;
