/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeroProffessional = () => {
  const initialState3 = {
    profession: "",
    status: false,
  };
  const [value, setValue] = useState(initialState3);
  const [sub_subaccounts, setsub_subaccounts] = useState();
  const [freelancerAccount, setfreelancerAccount] = useState();
  const [employeeaccount, setemployeeaccount] = useState();
  const [profession, setProfession] = useState();
  const initialstate1 = {
    subaccount: "",
    status: false,
  };
  const initialstate2 = {
    subaccount: "",
    companyname: "",
    jobTitle: "",
    jobCategory: "",
    status: false,
  };
  const [selectfreelancer, setselectfreelancer] = useState(initialstate1);
  const [selectEmployee, setSelectEmployee] = useState(initialstate2);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        "https://arcliflanding.herokuapp.com/account/sub_subaccounts",
        config
      )
      .then((response) => {
        setsub_subaccounts(response.data.sub_subaccounts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(async () => {
    if (sub_subaccounts) {
      const freelance = await sub_subaccounts.filter((items, index) => {
        if (items.sub_type === "Freelancer") {
          return items;
        }
      });
      setfreelancerAccount(freelance);

      const employee = await sub_subaccounts.filter((items, index) => {
        if (items.sub_type === "Employee") {
          return items;
        }
      });
      setemployeeaccount(employee);
    }
  }, [sub_subaccounts]);

  const handeProfession = (items) => {
    setValue({ ...value, profession: items, status: true });
    document.getElementById("selectedProfessionContanier").style.display =
      "flex";
    document.getElementById("selectedProfessionContanier").style.width =
      "100px";
  };

  const closeProfession = () => {
    setValue("");
    document.getElementById("selectedProfessionContanier").style.display =
      "none";
  };

  const freelancerClick = (type, id) => {
    setselectfreelancer({
      ...selectfreelancer,
      subaccount: id,
      status: true,
    });
    setSelectEmployee(initialstate2);
    document.getElementById("profession__title").style.display = "block";
    document.getElementById("selected__contaniner").style.display = "block";
    document.getElementById("options__contanier").style.display = "grid";
    document.getElementById("employeeContanier").style.display = "none";
  };
  const employeeClick = (type, id) => {
    setSelectEmployee({ ...selectEmployee, subaccount: id, status: true });
    setselectfreelancer(initialstate1);
    document.getElementById("profession__title").style.display = "none";
    document.getElementById("selected__contaniner").style.display = "none";
    document.getElementById("options__contanier").style.display = "none";
    document.getElementById("employeeContanier").style.display = "block";
  };
  useEffect(() => {
    if (freelancerAccount) {
      let Professions = freelancerAccount[0].professions.map((items, index) => {
        console.log(items);
        return (
          <>
            <div
              key={index}
              onClick={() => handeProfession(items)}
              id={items}
              className={styles.option__profession}
            >
              {items}
            </div>
          </>
        );
      });
      setProfession(Professions);
    }
  }, [freelancerAccount]);

  const handleNextbtn = () => {
    if (selectfreelancer.status) {
      if (value.status) {
        const token = localStorage.getItem("token");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(
            "https://arcliflanding.herokuapp.com/account/add_sub_subaccounts",
            {
              subaccount: selectfreelancer.subaccount,
              profession: value.profession,
            },
            config
          )
          .then((response) => {
            var token = localStorage.getItem("token");
            window.location.href = `https://arclif-app.vercel.app/auth?id=${token}`;
          })
          .catch((error) => {
            console.log(error);
            toast.error("Something went wrong");
          });
      } else {
        toast.error("Please Select your Profession");
      }
    } else if (selectEmployee.status) {
      if (selectEmployee.companyname && selectEmployee.jobTitle) {
        const token = localStorage.getItem("token");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(
            "https://arcliflanding.herokuapp.com/account/add_sub_subaccounts",
            selectEmployee,
            config
          )
          .then((response) => {
            var token = localStorage.getItem("token");
            window.location.href = `https://arclif-app.vercel.app/auth?id=${token}`;
          })
          .catch((error) => {
            console.log(error);
            toast.error("Something went wrong");
          });
      } else {
        toast.error("please fill *all field");
      }
    }
  };
  const handleinput = (event) => {
    setSelectEmployee({
      ...selectEmployee,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <ToastContainer />
      <div className={styles.hero__verify}>
        <div
          style={{ backgroundImage: 'url("/heroback2.jpg")' }}
          className={styles.left__hero}
        ></div>
        <div className={styles.right__hero__verify}>
          <h5>Choose type of account</h5>
          <form className={styles.formRadio}>
            <input
              onClick={() =>
                freelancerClick(
                  freelancerAccount[0].sub_type,
                  freelancerAccount[0]._id
                )
              }
              id={freelancerAccount ? freelancerAccount[0].sub_type : ""}
              type="radio"
              name="radio__proffessional"
            />{" "}
            <h6>{freelancerAccount ? freelancerAccount[0].sub_type : ""}</h6>
            <input
              onClick={() =>
                employeeClick(
                  employeeaccount[0].sub_type,
                  employeeaccount[0]._id
                )
              }
              id={employeeaccount ? employeeaccount[0].sub_type : ""}
              type="radio"
              name="radio__proffessional"
            />{" "}
            <h6>{employeeaccount ? employeeaccount[0].sub_type : ""}</h6>
          </form>
          <p></p>

          <div id="employeeContanier" className={styles.employeeContanier}>
            <div className={styles.hero__input__create}>
              <input
                type="text"
                placeholder="Company Name"
                name="companyname"
                onChange={handleinput}
              />
            </div>
            <div className={styles.hero__input__create}>
              <input
                type="text"
                placeholder="Job Title"
                name="jobTitle"
                onChange={handleinput}
              />
            </div>
          </div>

          <h5 id="profession__title">Select your Profession</h5>
          <div
            id="selected__contaniner"
            className={styles.selected__contaniner}
          >
            <div
              id="selectedProfessionContanier"
              className={styles.selected__proffession}
            >
              <p id="selected">{value.profession}</p>{" "}
              <Image
                className={styles.cross__icon}
                src="/cross__icon.svg"
                width={10}
                height={10}
                alt=""
                onClick={closeProfession}
              />
            </div>
          </div>
          <div id="options__contanier" className={styles.options__contanier}>
            {profession ? profession : ""}
          </div>
          <div className={styles.hero__button} onClick={handleNextbtn}>
            NEXT
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroProffessional;
