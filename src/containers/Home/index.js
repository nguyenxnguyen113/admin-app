import React from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import {NavLink} from 'react-router-dom'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActor, getAllCategory, getAllCountry, getAllFilm, getAmountOfFilm } from "../../actions";
import { Layout } from "../../components/Layout";
import "./style.css";

export const Home = (props) => {
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  console.log(product.productAmout)

  const data = category.categoryList
  const dispatch = useDispatch();
  console.log(category)
  useEffect(() => {
      console.log('category.js')
      dispatch(getAllCategory())
      dispatch(getAllActor())
      dispatch(getAllCountry())
      dispatch(getAllFilm())
      dispatch(getAmountOfFilm())
  }, [])
  return (
    <div>
      <Layout sidebar>
        <div class="mb-3 card" style={{"height": "unset", "width": "unset"}}>
          <div
            class="portfolioContainer no-gutters row "
            style={{"margin-right": 0,
                    "margin-left": 0}}
          >
            <div class="col-sm-6 col-md-4 col-xl-4" style={{"margin-top": 0}}>
              <div class="cardItem text-left card no-shadow rm-border bg-transparent widget-chart">
                <div class="iconWrapper icon-wrapper rounded-circle bg-warning">
                  <div class="iconWrapperBg"></div>
                  <i class="fas fa-briefcase"></i>
                </div>
                <div class="contentWrapper">
                  <div class="contentHeading">Films</div>
                  <div class="contentNumber">{product.productAmout.length}</div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4 col-xl-4" style={{"margin-top": 0}}>
              <div class="cardItem text-left card no-shadow rm-border bg-transparent widget-chart">
                <div class="iconWrapper icon-wrapper rounded-circle bg-success">
                  <div class="iconWrapperBg"></div>
                  <i class="fas fa-wallet"></i>
                </div>
                <div class="contentWrapper">
                  <div class="contentHeading">COINS</div>
                  <div class="contentNumber">$2500</div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-xl-4" style={{"margin-top": 0}}>
              <div class="cardItem text-left card no-shadow rm-border bg-transparent widget-chart">
                <div class="iconWrapper icon-wrapper rounded-circle bg-success">
                  <div class="iconWrapperBg"></div>
                  <i class="fas fa-user"></i>
                </div>
                <div class="contentWrapper">
                  <div class="contentHeading">ACCOUNTS</div>
                  <div class="contentNumber">100</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
