import React from "react";

import { Row, Col } from "reactstrap";
import { format } from "date-fns";

import Widget from "../../../components/Widget";
import ApexChart from "react-apexcharts";

import s from "./Charts.module.scss";
import { chartData, liveChart } from "./mock";
import Sparklines from "../../../components/Sparklines";

import ReactEchartsCore from "echarts-for-react/lib/core";

import echarts from "echarts/lib/echarts";

import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/themeRiver";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import { getHistoryData } from "../../../actions/requests";

exporting(Highcharts);
exportData(Highcharts);
let liveChartInterval = null;

class Charts extends React.Component {
  state = {
    cd: chartData,
    ld: liveChart,
    cityName: "",
    highcharts: [],
    initEchartsOptions: {
      renderer: "canvas",
    },
    sparklineData: {
      series: [{ data: [1, 7, 3, 5, 7, 8] }],
      options1: {
        colors: ["#db2a34"],
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
      },
      options2: {
        colors: ["#2477ff"],
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
      },
    },
  };

  parseData({ history = [] }) {

    const historyOrderedByDate = history.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const [first] = historyOrderedByDate
    const [last] = historyOrderedByDate.slice().reverse();
    if (!first || !last) return { data: [] }
    const start_date = format(new Date(first.createdAt), "dd/MM/yyyy");
    const end_date = format(new Date(last.createdAt), "dd/MM/yyyy");
    const period = ["-", start_date, "até", end_date].join(" ")
    const ecologyParams = {
      carbon: {
        name: "Co2 " + period,
      },
      moisture: {
        name: "Umidade " + period,
        type: "areaspline"
      },
      temperture: {
        name: "Temperatura " + period,
        type: "areaspline"
      }
    }
    const ecologyParamsValues = historyOrderedByDate.reduce((acc, param) => {
      const [date] = param.createdAt.split("T")
      const [year, month, day] = date.split("-");

      const utcDate = Date.UTC(year, month, day)
      const {
        carbon,
        moisture,
        temperture,
      } = param;

      acc.carbon.push([utcDate, carbon])
      acc.moisture.push([utcDate, moisture])
      acc.temperture.push([utcDate, temperture])

      return acc
    }, {
      carbon: [],
      moisture: [],
      temperture: [],
    });

    const highcharts = Object.keys(ecologyParams).map(key => {
      const {
        [key]: {
          name,
          type
        }
      } = ecologyParams;
      const {
        [key]: data
      } = ecologyParamsValues
      return {
        name,
        type,
        data,
      }
    });

    return {
      highcharts: highcharts
    }

  }


  async componentWillMount() {
    const {
      match: {
        params = { name: "" }
      }
    } = this.props;
    this.setState({ cityName: params.name });
    const { history } = await getHistoryData()
    const {
      highcharts,
    } = this.parseData({ history })

    this.setState({
      highcharts,
    })

  }
  componentWillUnmount() {
    clearInterval(liveChartInterval);
  }

  render() {
    const {
      cd,
      ld,
      initEchartsOptions,
      highcharts,
      cityName
    } = this.state;

    return (
      <div className={s.root}>
        <h1 className="page-title">
          <span className="fw-semi-bold">{cityName}</span>
        </h1>
        <div>
          <Row>
            <Col lg={5} xs={12}>
              <Widget
                title={
                  <h5>
                    Highcharts <span className="fw-semi-bold">Line Chart</span>
                  </h5>
                }
                close
                collapse
              >
                <HighchartsReact options={{
                  ...cd.highcharts.mixed,
                  series: highcharts
                }} />
              </Widget>
            </Col>
            <Col lg={7} xs={12}>
              {/* <Row>
                <Col lg={12} xs={12}>
                  <Widget
                    title={
                      <h5>
                        Highcharts{" "}
                        <span className="fw-semi-bold">Live Chart</span>
                      </h5>
                    }
                    close
                    collapse
                  >
                    <HighchartsReact options={{
                      ...ld,
                      liveChartInterval,
                      series: [
                        {
                          name: "Random data",
                          data: (function () {
                            const series = getParam({ param: "carbon" });

                            return series
                          })(),
                        },
                      ],
                      chart: {
                        ...ld.chart,
                        events: {
                          ...ld.chart.events,
                          // load: function () {
                          //   // set up the updating of the chart each second

                          //   const {
                          //     addPoint,
                          //   } = this.series[0]

                          //   liveChartInterval = setInterval(() => {

                          //     const carbonValues = getParam({ param: "carbon" });
                          //     const {
                          //       data
                          //     } = this.series[0];
                          //     const lastValues = data.map(item => item.y)
                          //     console.log(lastValues);
                          //     // const lastData = JSON.parse(localStorage.getItem("data") || JSON.stringify({ data: [] }));
                          //     // const {
                          //     //   data = []
                          //     // } = lastData;
                          //     // console.log(data);
                          //     // localStorage.setItem("data", JSON.stringify({ data: data.concat(message) }))
                          //     const [x, y, lastValue] = [
                          //       new Date().getTime(),
                          //       carbonValues.slice().pop(),
                          //       lastValues.slice().pop()
                          //     ]
                          //     if (!Number.isFinite(y) || lastValue === y) return;
                          //     const point = [x, y];

                          //     localStorage.setItem("data", "")
                          //     console.log(point);
                          //     addPoint(point);
                          //   }, 1000)
                          // },
                        }
                      }
                    }} />
                  </Widget>
                </Col>
              </Row> */}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Charts;
