import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeroPersonal = () => {
  const [subaccounts, setsubAccounts] = useState();
  const intialState = {
    type: "",
    id: "",
  };
  const [select, setselect] = useState(intialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("https://agriha.herokuapp.com/account/subAccounts", config)
      .then((response) => {
        console.log(response);
        setsubAccounts(response.data.subaccounts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const checkProfessional = (id, type) => {
    var professional = document.querySelector(
      "input[type=radio][id=proffessional]:checked"
    );
    if (professional) {
      setselect({ ...select, type: type, id: id });
    }
  };
  const checkNormal = (id, type) => {
    setselect({ ...select, type: type, id: id });
  };
  const handleNext = () => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        "https://agriha.herokuapp.com/account/add_Subaccount",
        {
          category: select.id,
        },
        config
      )
      .then((response) => {
        if (response.data.status === 200) {
          if (response.data.data == "Professional Account") {
            window.location.href = "/proffessional";
          } else {
            window.location.href = `https://arclif-app.vercel.app/auth?id=${token}`;
          }
        }
        if (response.data.response.statusCode === 409) {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <ToastContainer />
      <div className={styles.hero__personal}>
        <div
          style={{ backgroundImage: 'url("/heroback2.jpg")' }}
          className={styles.left__hero__personal}
        ></div>
        <div className={styles.right__hero__verify}>
          <h6 className={styles.personal__title}>
            Are you a professional? or here to find some professionals?{" "}
          </h6>
          <form className={styles.personal__form}>
            <div className={styles.radio__personal}>
              <div className={styles.left__radio}>
                <input
                  onClick={() =>
                    checkProfessional(subaccounts[0]._id, subaccounts[0].type)
                  }
                  type="radio"
                  name="radio__personal"
                  id="proffessional"
                />{" "}
                <label htmlFor="proffessional">Professional Account</label>
              </div>
              <div className={styles.right__radio}>
                <input
                  onClick={() =>
                    checkNormal(subaccounts[1]._id, subaccounts[1].type)
                  }
                  type="radio"
                  name="radio__personal"
                  id="normal"
                />{" "}
                <label htmlFor="normal">Normal Account</label>
              </div>
            </div>
            <div className={styles.hero__button} onClick={handleNext}>
              NEXT
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroPersonal;
