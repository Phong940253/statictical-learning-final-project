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
import { useDispatch } from "react-redux";
import axios from "axios";
import { createNewTest } from "redux/action/test.action";

const Testing = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [chapter, setChapter] = useState([]);
  const [section, setSection] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/chapter/section")
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          res.data.chapter = res.data.chapter.map((item) => {
            return { ...item, checked: false };
          });
          setChapter(res.data.chapter);

          res.data.section = res.data.section.map((item) => {
            return { ...item, checked: false };
          });
          // res.data.section.map((item) => { ...item, "checked": false});
          setSection(res.data.section);
        }
      })
      .catch((err) => {});
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    let list_section = [];
    section.map((item) => {
      if (item.checked) {
        list_section.push(item.id);
      }
    });

    dispatch(
      createNewTest({
        list_id: list_section,
        time: e.target["radio-time"].value,
        id_user: currentUser.id,
      })
    );
    // e.target.map((item) => {
    //   if (item.value) {
    //     console.log(item);
    //   }
    // });
  };

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

  const listChapter = chapter.map((item, index) => (
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
      {section.map((item2, index2) => (
        <Fragment key={index * 100 + index2}>
          {item2.id_chapter === item.id && (
            <div className="custom-control custom-checkbox mb-2 ml-3">
              <input
                className="custom-control-input"
                id={
                  "customCheckChapter" + item2.id_chapter + "Section" + item2.id
                }
                type="checkbox"
                onChange={handleChange}
                checked={item2.checked}
              />
              <label
                className="custom-control-label"
                htmlFor={
                  "customCheckChapter" + item2.id_chapter + "Section" + item2.id
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
          <Form role="form" onSubmit={handleSubmitForm}>
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
                    {listChapter}
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
                        value={45}
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
                        value={60}
                        required
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
                    type="submit"
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

export default Testing;
