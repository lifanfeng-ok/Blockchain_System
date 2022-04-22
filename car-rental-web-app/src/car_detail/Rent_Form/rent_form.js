import {
    Form,
    Input,
    DatePicker
} from 'antd';
import { useEffect, useRef, useState } from 'react';


function Rent_form(props) {
    let { id, carBrand, carType, image, carVin,
        Deposit, carPrice, Availability, Description } = props;
    let [address,setAddre] = useState('');
  //  let [Total_Deposit,setTotal_Deposit] = useState(0);
    let [From_End,setDate] = useState([]);
    let myRef = useRef();
    let initialValues = {
        carBrand: carBrand,
        carVin: carVin,
        Rent_Fee:  '',
    }

    useEffect(()=>{
        props.setForm(myRef.current)
    },[])

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };

    const rangeConfig = {
        rules: [
          {
            type: 'array',
            required: true,
            message: 'Please select time!',
          },
        ],
      };

    const changeValue =(values)=>{
           console.log(values);
    }
    
    const setDeposit = (event)=>{
          let duration = event.target.value;
          myRef.current.setFieldsValue({
             Rent_Fee: Number(duration)*Number(carPrice)
          })
    }

    const setAddress = (e)=>{
          setAddre(e.target.value);
          props.setAddress(e.target.value);
    }

    const getAddress = () => address;
 //   const getDeposit = () => Total_Deposit;
    const getDate = ()=> From_End;

    return (
        <Form {...formItemLayout}
              initialValues = {initialValues}
              onValuesChange = {changeValue}
              ref={myRef}
        >
            <Form.Item
                name="carBrand"
                label="Car_Brand"
            >
                <Input disabled/>
            </Form.Item>
            <Form.Item
                name="carVin"
                label="Plate_Number"
            >
                <Input disabled/>
            </Form.Item>
            <Form.Item
                name="Rent_Fee"
                label="Rent_Fee"
            >
                <Input disabled/>
            </Form.Item>
            <Form.Item
                name="Wallet_Address"
                label="Wallet_Address"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Wallet_Address',
                    }
                ]}
            >
                <Input onChange={setAddress}/>
            </Form.Item>
            <Form.Item name="time-picker" label="TimePicker" hasFeedback 
            {...rangeConfig}
            validateStatus="error">
                <DatePicker.RangePicker
                    style={{
                        width: '100%',
                    }}
                    
                />
            </Form.Item>
            {/* <Form.Item
                name="Total_Deposit"
                label="Total_Deposit"
            >
                <Input disabled/>
            </Form.Item> */}
            <Form.Item
                name="duration"
                label="duration"
                onChange= {setDeposit}
            >
                <Input/>
            </Form.Item>
        </Form>
    )
}

export default Rent_form;