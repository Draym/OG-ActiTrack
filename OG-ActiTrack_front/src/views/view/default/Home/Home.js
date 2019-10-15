import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import BtnKofiSupport from "../../../components/Widgets/buttons/BtnKofiSupport";
import CBlockTitle from "../../../components/CBlockTitle/CBlockTitle";
import CBlockText from "../../../components/CBlockText/CBlockText";
import CLink from "../../../components/CLink/CLink";
import {RoutesEndpoint} from "../../../../utils/RoutesEndpoint";
import CBulletList from "../../../components/CBulletList/CBulletList";
import CBulletItem from "../../../components/CBulletList/CBulletItem";
import CImg from "../../../components/CImage/CImg";
import {Library} from "../../../../utils/storage/Library";


class Home extends Component {

  render() {

    return (
      <div className="animated fadeIn background-white">
        <Row>
          <Col>
            <CBlockTitle position="center" fontSize="3" text="Welcome to ">
              <span className="font-weight-bold">OG-Tracker <CImg className="title-img" data={Library.logoIcon}/> </span>
            </CBlockTitle>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <CBlockText position="center" fontSize="1x2">
              <CLink goTo={RoutesEndpoint.AUTH_Login} button>Login now</CLink>
              <span> or </span>
              <CLink shift goTo={RoutesEndpoint.AUTH_Register}>Create a new account</CLink> <span>to get started now!</span>
            </CBlockText>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={12} sm={12} md={12} lg={{size: 10, offset: 2}} xl={{size: 10, offset: 2}}>
            <CBlockText fontSize="1x1" text="OG-Tracker is the best way to track player activity in Ogame"/>
            <CBlockText text="With its all-in-one solution, automatic data collection and it's dedicated statistics pages, Ogame data become easily readable"/>
            <CBulletList>
              <CBulletItem>Automatic Script collection</CBulletItem>
              <CBulletItem>Easy to use functionality</CBulletItem>
              <CBulletItem>Group up with friends</CBulletItem>
              <CBulletItem>Get activity & galaxy charts</CBulletItem>
              <CBulletItem>Track your Spy & Fight reports</CBulletItem>
              <CBulletItem>Data available for each universe</CBulletItem>
            </CBulletList>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <CBlockText position="center" fontSize="1x5">
              <span>It's easy to get started! </span> <CLink shift goTo={RoutesEndpoint.HOWTOSTART}>How to start guide will guide you</CLink>
            </CBlockText>
          </Col>
        </Row>
        <Row className="mt-4 mb-2">
          <Col>
            <BtnKofiSupport title/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
