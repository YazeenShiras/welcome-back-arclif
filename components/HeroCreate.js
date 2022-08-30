import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeroCreate = () => {
  const [page, setPage] = useState("/personal");
  const [accounts, setaccounts] = useState();
  const [type, setType] = useState("Personal Account");

  useEffect(() => {
    document.querySelector("input[type=radio][id=personal]").checked = "true";
    axios
      .get("https://arcliflanding.herokuapp.com/account")
      .then((response) => {
        console.log(response);
        setaccounts(response.data.accountTypes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const checkPersonal = () => {
    document.getElementById("decription__personal").style.display = "block";
    document.getElementById("decription__business").style.display = "none";
    var personal = document.querySelector(
      "input[type=radio][id=personal]:checked"
    );
    if (personal) {
      setPage("/personal");
      setType("Personal Account");
    }
  };

  const checkBusiness = () => {
    document.getElementById("decription__personal").style.display = "none";
    document.getElementById("decription__business").style.display = "block";
    var business = document.querySelector(
      "input[type=radio][id=business]:checked"
    );
    if (business) {
      setPage("/business");
      setType("Business Account");
    }
  };

  const onNextButtonClick = () => {
    if (type === "Personal Account") {
      const personalAccount = accounts.filter((items, index) => {
        return items.type === type;
      });
      console.log(personalAccount);
      var personal = document.querySelector(
        "input[type=radio][id=personal]:checked"
      );
      if (personal) {
        const token = localStorage.getItem("token");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(
            "https://arcliflanding.herokuapp.com/account/personalAccount",
            {
              accountType: personalAccount[0]._id,
            },
            config
          )
          .then((response) => {
            if (response.data.status === 200) {
              window.location.href = page;
            }
            if (response.data.status === 409) {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    if (type === "Business Account") {
      const businessAccount = accounts.filter((items, index) => {
        return items.type === type;
      });
      var business = document.querySelector(
        "input[type=radio][id=business]:checked"
      );
      if (business) {
        const token = localStorage.getItem("token");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(
            "https://arcliflanding.herokuapp.com/account/businessAccount",
            {
              accountType: businessAccount[0]._id,
            },
            config
          )
          .then((response) => {
            console.log(response);
            if (response.data.status === 200) {
              window.location.href = page;
            }
            if (response.data.status === 409) {
              toast.error(response.data.message);
            }
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className={styles.hero__create}>
        <div
          style={{ backgroundImage: 'url("/heroback2.jpg")' }}
          className={styles.left__hero__create}
        ></div>
        <div className={styles.right__hero__verify}>
          <h5>Choose type of account</h5>
          <form className={styles.formRadio}>
            <input
              onClick={checkPersonal}
              type="radio"
              id="personal"
              name="accont__type"
            />{" "}
            <h6>Personal Account</h6>
            <input
              type="radio"
              onClick={checkBusiness}
              id="business"
              name="accont__type"
            />{" "}
            <h6>Business Account</h6>
          </form>
          <p id="decription__personal" className="decription__personal">
            Your Personal brand is on the way. Build brand and showcase your
            talents.
          </p>
          <p
            id="decription__business"
            className="decription__business"
            style={{ display: "none" }}
          >
            Bring your Company to the next level. Ensure and enjoy the freedom
            of finding your perfect clients.
          </p>

          <div
            className="errortest"
            onClick={onNextButtonClick}
            id="buttonNextClick"
          >
            <button type="submit" id="next" className={styles.hero__button}>
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCreate;
