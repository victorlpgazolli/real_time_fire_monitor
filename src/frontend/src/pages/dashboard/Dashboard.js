import React, { useEffect, useState } from "react";
import { Row, Col, Progress, } from "reactstrap";

import Widget from "../../components/Widget";

import Map from "./components/am4chartMap/am4chartMap";
import { getHistoryData } from "../../actions/requests";

import AnimateNumber from "react-animated-number";

import s from "./Dashboard.module.scss";

import citiesMock from "./components/am4chartMap/mock";
import { getFirePotential } from "../../actions/fire";

const Dashboard = function () {
  const [cities, setCities] = useState([])


  useEffect(() => {
    (async () => {
      const {
        history
      } = await getHistoryData();

      const historyOrderedByDate = history.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      const latestData = historyOrderedByDate.slice().pop()

      const [city] = citiesMock;

      const {
        carbon,
        moisture,
        temperture,
      } = latestData || {};

      const hasToSaveMessage = Number.isFinite(carbon) && Number.isFinite(moisture) && Number.isFinite(temperture)

      if (!hasToSaveMessage) return;

      setCities([{
        ...city,
        carbon,
        moisture,
        temperture,
      }])

    })()

  }, []);

  useEffect(() => {
    window.handler = ({
      carbon,
      moisture,
      temperture,
    }) => {
      const hasContent = Array.isArray(cities) && cities.length > 0;
      const [city] = hasContent ? cities : citiesMock
      setCities([{
        ...city,
        carbon: +carbon,
        moisture: +moisture,
        temperture: +temperture,
      }])

    }
  }, [cities])

  return (
    <div className={s.root}>
      <h1 className="page-title">
        Mapa &nbsp;
        <small>
          <small>Monitoramento de incêndios</small>
        </small>
      </h1>

      <Row>
        <Col lg={7}>
          <Widget className="bg-transparent">
            <Map />
          </Widget>
        </Col>
        <Col lg={1} />

        <Col lg={4}>
          <Widget
            className="bg-transparent"
            title={
              <h5>
                {" "}
                <span className="fw-semi-bold">&nbsp;Estatísticas</span>
              </h5>
            }
            close
          >
            <div className="row progress-stats">
              <div className="col-md-9 col-12">
                <h6 className="name fw-semi-bold">Cobertura</h6>
                <p className="description deemphasize mb-xs text-white">
                  Cobertura de sensores por estado
                </p>
                <Progress
                  color="primary"
                  value={
                    Math.ceil(cities.length / 26)
                  }
                  className="bg-subtle-blue progress-xs"
                />
              </div>
              <div className="col-md-3 col-12 text-center">
                <span className="status rounded rounded-lg bg-default text-light">
                  <small>
                    <AnimateNumber value={
                      Math.ceil(cities.length / 26)
                    } />%
                  </small>
                </span>
              </div>
            </div>
            <h6 className="fw-semi-bold mt">Dados</h6>
            <p>
              Atualização automatica: <strong>Ativo</strong>
            </p>
          </Widget>
        </Col>
      </Row>

      <Row>
        {
          cities.map(city => {
            const {
              color,
              potential: firePotential
            } = getFirePotential(city);

            if (!color || !firePotential) return (<></>);

            return (
              <Col lg={6} xl={4} xs={12}>
                <Widget title={<h6> {city.tooltip} </h6>}
                  // style={{ cursor: "pointer" }} 
                  // onClick={() => window.location.href = "/#/app/main/stats/" + city.tooltip.toLowerCase()}
                  close
                >
                  <div className="stats-row">
                    <div className="stat-item">
                      <h6 className="name">Umidade</h6>
                      <p className="value">{city.moisture}</p>
                    </div>
                    <div className="stat-item">
                      <h6 className="name">Temperatura</h6>
                      <p className="value">{city.temperture}</p>
                    </div>
                    <div className="stat-item">
                      <h6 className="name">Dioxido de carbono</h6>
                      <p className="value">{city.carbon}</p>
                    </div>
                  </div>
                  <p>
                    <small>
                      <span className="circle bg-default text-white mr-2">
                        <i className="fa fa-chevron-up" />
                      </span>
                    </small>
                    <span className="fw-semi-bold">&nbsp;{firePotential}%</span>
                    &nbsp;de potêncial para incêndios naturais
                  </p>
                  <Progress
                    color={color}
                    value={firePotential}
                    className="bg-subtle-blue progress-xs"
                  />
                </Widget>
              </Col>
            )
          })
        }
      </Row>

    </div>
  );
}

export default Dashboard;
