/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import HeaderCustom from "components/Headers/HeaderCustom";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";

const Testing = () => {
  const [chuong, setChuong] = useState([]);
  const [phanmuc, setPhanmuc] = useState([]);

  useEffect(() => {
    axios
      .get("/chuong/phanmuc")
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          res.data.chuong = res.data.chuong.map((item) => {
            return { ...item, checked: false };
          });
          setChuong(res.data.chuong);

          res.data.phanmuc = res.data.phanmuc.map((item) => {
            return { ...item, checked: false };
          });
          // res.data.phanmuc.map((item) => { ...item, "checked": false});
          setPhanmuc(res.data.phanmuc);
        }
      })
      .catch((err) => {});
  }, []);
  // useEffect(() => {
  //   console.log(phanmuc);
  // }, [phanmuc]);

  const handleSelectAll = (e) => {
    const { id, checked } = e.target;
    const id_chuong = id.split("customCheck")[1];

    setChuong(
      chuong.map((item) =>
        item.id == id_chuong ? { ...item, checked: checked } : item
      )
    );
    setPhanmuc(
      phanmuc.map((item) => {
        return { ...item, checked: checked };
      })
    );
  };

  // const setIschecked = (item, type) => {};

  const handleChange = (e) => {
    const { id, checked } = e.target;
    const id_phanmuc = id.split("PhanMuc")[1];
    setPhanmuc(
      phanmuc.map((item) =>
        item.id == id_phanmuc ? { ...item, checked: checked } : item
      )
    );
  };

  const listChuong = chuong.map((item, index) => (
    <Fragment key={index}>
      <div key={item.id} className="custom-control custom-checkbox mb-2">
        <input
          className="custom-control-input"
          id={"customCheck" + item.id}
          type="checkbox"
          checked={item.checked}
          onChange={handleSelectAll}
        />
        <label
          className="custom-control-label"
          htmlFor={"customCheck" + item.id}
        >
          {item.name}
        </label>
      </div>
      {phanmuc.map((item2, index2) => (
        <Fragment key={index * 100 + index2}>
          {item2.id_chuong === item.id && (
            <div className="custom-control custom-checkbox mb-2 ml-3">
              <input
                className="custom-control-input"
                id={
                  "customCheckChuong" + item2.id_chuong + "PhanMuc" + item2.id
                }
                type="checkbox"
                onChange={handleChange}
                checked={item2.checked}
              />
              <label
                className="custom-control-label"
                htmlFor={
                  "customCheckChuong" + item2.id_chuong + "PhanMuc" + item2.id
                }
              >
                {item2.name}
              </label>
            </div>
          )}
        </Fragment>
      ))}
    </Fragment>
  ));

  return (
    <>
      <HeaderCustom />
      <Card className="bg-secondary shadow  m-xl-4">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Examination config</h3>
            </Col>
            <Col className="text-right" xs="4">
              <Button
                color="primary"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                size="sm"
              >
                Settings
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            <h6 className="heading-small text-muted mb-4">Exam content</h6>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="custom-radio"
                    >
                      Select chapter
                    </label>
                    {listChuong}
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="custom-radio"
                    >
                      Time
                    </label>
                    <div
                      className="custom-control custom-radio mb-3"
                      id="custom-radio"
                    >
                      <input
                        className="custom-control-input"
                        id="customRadio5"
                        name="custom-radio-2"
                        type="radio"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customRadio5"
                      >
                        Unchecked
                      </label>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default Testing;
