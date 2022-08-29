import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

const HeroVerify = () => {
  const [otp, setOtp] = useState("");
  const [resentBtn, setResentBtn] = useState(false);
  const [error, setError] = useState("none");

  const handleChange = () => {
    let otpInput = document.getElementById("otpInput");
    setOtp(otpInput.value);
  };
  const handle_verifyOtp = () => {
    if (otp) {
      const token = localStorage.getItem("otptoken");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(
          "https://arclifauth-ki3qrbsnza-uc.a.run.app/auth/mobile_otp",
          {
            otp: parseInt(otp),
          },
          config
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 200) {
            localStorage.setItem("token", response.data.Token);
            window.location.href = "/createAccount";
          }
        })
        .catch((error) => {
          setError("block");
          setResentBtn(true);
        });
    }
  };

  return (
    <div>
      <div className={styles.hero__verify}>
        <div
          style={{ backgroundImage: 'url("/heroback2.jpg")' }}
          className={styles.left__hero__verify}
        ></div>
        <div className={styles.right__hero__verify}>
          <h1>
            Welcome back <br />
            to ARCLIF
          </h1>
          <p>
            Connect with talented architects around you. Optimize your talents
            and showcase your crafts with no boundaries.
          </p>
          <h5>Verify OTP</h5>
          <div className={styles.hero__input__verify}>
            <input
              id="otpInput"
              type="text"
              placeholder="Enter OTP"
              onChange={handleChange}
            />
          </div>
          <span
            className={styles.hero__error}
            id="hero__error"
            style={{ fontSize: "14px", display: error }}
          >
            OTP verification Failed
          </span>
          {!resentBtn ? (
            <div className={styles.hero__button} onClick={handle_verifyOtp}>
              Verify OTP
            </div>
          ) : (
            <div className={styles.hero__button} onClick={handle_verifyOtp}>
              Resent OTP
            </div>
          )}
          <div className={styles.verify__options}>
            <Link href="/" passHref>
              <Image
                src="/arrowLeft__icon.svg"
                width={13}
                height={13}
                alt=""
                className={styles.footer__icon}
              />
            </Link>
            <p>Edit Phone</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVerify;
