import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/cutomers/customerSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const customerstate = useSelector((state) => state.customer.customers);
  const [data1, setData1] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const d = [];
    dispatch(getUsers());
    for (let i = 0; i < customerstate.length; i++) {
      
        d.push({
          key: i + 1,
          name: customerstate[i].firstname + " " + customerstate[i].lastname,
          email: customerstate[i].email,
          mobile: customerstate[i].mobile,
        });
      
    }
    

    setData1(d);
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
