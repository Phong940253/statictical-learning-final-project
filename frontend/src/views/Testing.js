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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// core components
import HeaderCustom from "components/Headers/HeaderCustom";
import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createNewTest } from "redux/action/test.action";
import Loader from "components/Loader";

const Testing = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [chapter, setChapter] = useState([]);
  const [section, setSection] = useState([]);
  const dispatch = useDispatch();
  const testreducer = useSelector((state) => state.createTestReducer);
  const { loading, error, success, question, hasquestion } = testreducer;

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
      {hasquestion ? (
        <Row className="m-xl-4">
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="8">
            <Card className="card-profile shadow">
              <Row className="justify-content-center"></Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    Jessica Jones
                    <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="4">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">General</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="heading-small text-muted mb-4">Time</h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6"></Col>
                    <Col lg="6"></Col>
                  </Row>
                  <Row>
                    <Col lg="6"></Col>
                    <Col lg="6"></Col>
                  </Row>
                </div>
                <hr className="my-4" />
                {/* Address */}
                <h6 className="heading-small text-muted mb-4">
                  Contact information
                </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          Address
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          id="input-address"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-city"
                        >
                          City
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue="New York"
                          id="input-city"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          Country
                        </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue="United States"
                          id="input-country"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          Postal code
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-postal-code"
                          placeholder="Postal code"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4" />
                {/* Description */}
                <h6 className="heading-small text-muted mb-4">About me</h6>
                <div className="pl-lg-4">
                  <FormGroup>
                    <label>About Me</label>
                    <Input
                      className="form-control-alternative"
                      placeholder="A few words about you ..."
                      rows="4"
                      defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        Open Source."
                      type="textarea"
                    />
                  </FormGroup>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : (
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

            <Modal
              fade={false}
              centered
              isOpen={loading}
              toggle={function noRefCheck() {}}
            >
              <ModalBody
                className="d-flex justify-content-center align-content-center"
                style={{ height: "300px" }}
              >
                <Loader />
              </ModalBody>
            </Modal>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default Testing;
