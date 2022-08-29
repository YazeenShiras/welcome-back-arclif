/* eslint-disable react-hooks/exhaustive-deps */
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

const Hero = () => {
  const [phone, setPhone] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [resentBtn, setResentBtn] = useState(false);
  const [error, setError] = useState("none");

  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setPhone(event.target.value);
    let isnum = /^\d+$/.test(event.target.value);
    if (isnum === true) {
      setIsPhone(true);
    }
  };

  const handleChangeMail = (event) => {
    setEmail(event.target.value);
  };

  // Register Mobile number
  const handleSubmit = () => {
    if (isPhone) {
      axios
        .post(
          "https://arclifauth-ki3qrbsnza-uc.a.run.app/auth/register_mobile",
          {
            phone: `+91${phone}`,
          }
        )
        .then(function (response) {
          console.log(response.data);
          if (response.data.status === 200) {
            localStorage.setItem("otptoken", response.data.otpToken);
            window.location.href = "/verify";
          }
        })
        .catch((error) => {
          if (error.response.data.message) {
            setResentBtn(true);
            setError("block");
            document.getElementById("hero__error").innerHTML =
              error.response.data.message;
          }
        });
    }
  };

  return (
    <div>
      <div id="heroContainer" className={styles.hero}>
        <div
          style={{ backgroundImage: 'url("/heroback2.jpg")' }}
          className={styles.left__hero}
        ></div>
        <div className={styles.right__hero}>
          <h1>
            Welcome back <br />
            to ARCLIF
          </h1>
          <div className={styles.mobileView}>
            <h1>
              Welcome back <br /> to ARCLIF
            </h1>
          </div>
          <p>Update your details</p>
          <div style={{ marginBottom: "10px" }} className={styles.hero__input}>
            <input
              onChange={handleChangeMail}
              type="email"
              id="email"
              placeholder="Email"
              autoComplete="off"
            />
          </div>
          <div className={styles.hero__input}>
            <input
              onChange={handleChange}
              type="text"
              id="phone"
              placeholder="Mobile Number"
              autoComplete="off"
            />
          </div>
          <span
            className={styles.hero__error}
            id="hero__error"
            style={{ fontSize: "14px", display: error }}
          ></span>
          <div>
            <div onClick={handleSubmit} className={styles.hero__button}>
              NEXT
            </div>
          </div>
          <div className={styles.terms__SignUp}></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
