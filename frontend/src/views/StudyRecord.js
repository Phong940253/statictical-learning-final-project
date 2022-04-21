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

// import {fa-circle-info} from "@fortawesome/"
import HeaderCustom from "components/Headers/HeaderCustom";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";

const StudyRecord = () => {
  const [chapter, setChapter] = useState([]);
  const [section, setSection] = useState([]);

  const handleSelectAll = (e) => {
    const { id, checked } = e.target;
    const id_chapter = id.split("customCheck")[1];

    setChapter(
      chapter.map((item) =>
        item.id == id_chapter ? { ...item, checked: checked } : item
      )
    );
    setSection(
      section.map((item) => {
        return item.id_chapter == id_chapter
          ? { ...item, checked: checked }
          : item;
      })
    );
  };

  // const setIschecked = (item, type) => {};

  const handleChange = (e) => {
    const { id, checked } = e.target;
    const id_section = id.split("Section")[1];
    setSection(
      section.map((item) =>
        item.id == id_section ? { ...item, checked: checked } : item
      )
    );
  };

  return (
    <>
      <HeaderCustom />
      <Card className="bg-secondary shadow  m-xl-4">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">General chapters</h3>
            </Col>
            <Col className="text-right" xs="4">
              <Row>
                <h4>Accumulation score</h4>
              </Row>
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
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      // htmlFor="custom-radio"
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
                        name="radio-time"
                        type="radio"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customRadio5"
                      >
                        45 Minutes
                      </label>
                    </div>
                    <div
                      className="custom-control custom-radio mb-3"
                      id="custom-radio1"
                    >
                      <input
                        className="custom-control-input"
                        id="customRadio6"
                        name="radio-time"
                        type="radio"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customRadio6"
                      >
                        60 Minutes
                      </label>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col log="12" className="d-flex column">
                  <Button
                    className="align-self-end"
                    color="primary"
                    type="button"
                  >
                    Start
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default StudyRecord;
