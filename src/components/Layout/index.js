import React from "react";
import Header from "../Header/index";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.css";
// import './style.css';

export const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink exact to={`/`}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/films`}>Films</NavLink>
                </li>
                <li>
                  <NavLink to={`/categories`}>Categories</NavLink>
                </li>
                <li>
                  <NavLink to={`/actors`}>Actors</NavLink>
                </li>
                <li>
                  <NavLink to={`/countries`}>Countries</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", paddingTop: "60px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};
