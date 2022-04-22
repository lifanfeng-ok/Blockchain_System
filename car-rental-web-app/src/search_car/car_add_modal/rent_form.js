import { useEffect, useRef, useState ,useContext} from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
import SmartContractContext from '../../stores/smartContractContext';
import { message } from "antd";


function Rent_form(props) {
  const [componentSize, setComponentSize] = useState("default");
  let myRef = useRef();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  useEffect(()=>{
    props.setForm(myRef.current)
},[])

//   const { CarRentalContract } = useContext(SmartContractContext);
//   const clickEntry = async (values) => {
//     try {
//         const accounts = await window.ethereum.enable();
//           console.log("12344",accounts)
//         await CarRentalContract.methods.addCarInfo("brand", "des", "carVin", 4, 20, true).send({ from: accounts[0] });
//         message.success('Add Car Info Successfully');
//         console.log("234")

//     } catch (err) {
//   debugger
//   console.log("22",err)
//         message.error('Error Add Car Info');
//     }
// };

  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      ref={myRef}
    >
      <Form.Item label="Car Id" name="carId">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Car Brand" name="carBrand">
        <Input />
      </Form.Item>
      <Form.Item label="Car Description" name="carDescription">
        <Input />
      </Form.Item>
      <Form.Item label="Car Vin" name="carVin">
        <Input />
      </Form.Item>
      <Form.Item label="Car Seat" name="carSeat">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Car Price" name="carPrice">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Car Status" name="carAvailable">
        <Select name ="carAvailable">
          <Select.Option value="1">Available</Select.Option>
          <Select.Option value="0">Not Available</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
}

export default Rent_form;
