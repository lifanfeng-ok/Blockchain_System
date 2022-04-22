import { useEffect, useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import ProfileEntryCard from "./profile_entrycard";
import SmartContractContext from "../stores/smartContractContext";
import {
  PayCircleOutlined,
  CheckCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./index.css";
import { message, Button, Modal } from "antd";
import CheckCar_form from "./check_car/checkCar_form";
import ReturnCar_form from "./return_car/return_car_form";

function CourseList() {
  const { CarRentalContract } = useContext(SmartContractContext);
  let history = useHistory();
  // let [records,setRecords] = useState(JSON.parse(localStorage.getItem('record')));
  let [records, setRecords] = useState([]);
  let [selectId, setSelectId] = useState(0);
  let token = localStorage.getItem("Token");
  const [visible, setVisible] = useState(false);
  let Form;
  const showModal = () => {
    setVisible(true);
  };
  const showModal2 = async (selectId) => {
    setSelectId(selectId);
    setVisible(true);
    localStorage.setItem("selectId", selectId);
  };
  let userName = localStorage.getItem("userName");
  let userType = localStorage.getItem("userType");
  const handleOk = (_renterRecordId, _carId) => {
    const { Wallet_Address, Damage_fee } = Form.getFieldsValue();
    // console.log(Form.getFieldsValue(),"123")
    // debugger
    try {
      const applyReturnCar = async () => {
        try {
          const accounts = await window.ethereum.enable();
          await CarRentalContract.methods
            .confirmReturnExtra(
              _renterRecordId,
              _carId,
              Damage_fee,
              Wallet_Address
            )
            .send({ from: accounts[0] });
          message.success("Return Car Successfully");
          let records = await CarRentalContract.methods.getAllReconds().call();
          await setRecords(records);
          // message.success(`Return status ${selectId} updated`);
        } catch (err) {
          console.log(err);
          message.error("apply return Car error");
          //   debugger
        }
      };
      applyReturnCar();
      Form.resetFields();
      setVisible(false);
    } catch (err) {
      //   history.push("/dashboard");
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const handleOk2 = async (value) => {
    try {
      const applyReturnCar = async (selectId) => {
        try {
          const accounts = await window.ethereum.enable();
          selectId = localStorage.getItem("selectId");
          await CarRentalContract.methods
            .applyReturnCar(selectId)
            .send({ from: accounts[0] });
          message.success("Return Car Successfully");
          let records = await CarRentalContract.methods.getAllReconds().call();
          records = records.filter((item) => { 
            return item.renterId === userName; 
            }); 
          await setRecords(records);
          // message.success(`Return status ${selectId} updated`);
        } catch (err) {
          console.log(err);
          message.error("apply return Car error");
          //   debugger
        }
      };
      applyReturnCar();
      Form.resetFields();
      setVisible(false);
      //   history.push("/dashboard");
    } catch (err) {
      //   history.push("/dashboard");
    }
  };

  const handleCancel2 = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  useEffect(async () => {
    try {
      let temp = await CarRentalContract.methods.getAllReconds().call();
      if (userType == "user") {
        temp = temp.filter((item) => {
          return item.renterId === userName;
        });
      }
      setRecords(temp);
      console.log(temp, "333");
    } catch (err) {
      // debugger;
      console.log("22", err);
      message.error("Error Get All Car Info");
    }
  }, []);

  const logOut = () => {
    // localStorage.setItem('Token', '')
    // localStorage.setItem('username', '')
    // window.dispatchEvent(new Event('storage'))
    history.push("/");
  };

  return (
    <div className="">
      <div className="professorNav">
        <span className="logOut" onClick={logOut}>
          Log out
        </span>
        <span
          className="returnDashboard"
          onClick={() => history.push("/dashboard")}
        >
          Dashboard
        </span>
      </div>
      <table className="Information">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Car Identification Number</th>
            <th>Price</th>
            <th>Car Brand</th>
            <th>Rent Period</th>
            {/* <th> 
                        Car Model
                    </th> */}
            <th>Status</th>
            {/* <th> 
                        Car Condition
                    </th> */}
            <th>Action</th>
          </tr>
          {records.map((user) => {
            return (
              <tr>
                <td>{user.carId}</td>
                <td>{user.carVin}</td>
                <td>{user.deposit}</td>
                <td>{user.carBrand}</td>
                <td>{user.duration}</td>
                {/* <td>
                            {user.carModel}
                        </td>                     */}
                <td>
                  {user.state === "6" ? (
                    <CheckCircleOutlined
                      style={{ color: "green", fontSize: "14px" }}
                    />
                  ) : (
                    <CloseOutlined style={{ color: "red", fontSize: "14px" }} />
                  )}
                </td>
                {/* <td>
                            {user.carCondition}
                        </td> */}
                <td>
                  {/* Admin essentially does 'sudo user' */}
                  {userType == "admin" ? (
                    <>
                      <button onClick={showModal}>Check Car</button>
                      <Modal
                        title="Check Car Modal"
                        visible={visible}
                        onOk={() => {
                          handleOk(user.renterRecordId, user.carId);
                        }}
                        onCancel={handleCancel}
                      >
                        <CheckCar_form
                          setForm={(form) => {
                            Form = form;
                          }}
                        />
                      </Modal>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          showModal2(user.renterRecordId);
                        }}
                      >
                        Return Car
                      </button>
                      <Modal
                        title="Return Car Modal"
                        visible={visible}
                        onOk={handleOk2}
                        onCancel={handleCancel2}
                      >
                        <ReturnCar_form
                          setForm={(form) => {
                            Form = form;
                          }}
                        />
                      </Modal>
                    </>
                  )}
                  {/* Server call to delete user */}
                  {/* <button>remove</button> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
