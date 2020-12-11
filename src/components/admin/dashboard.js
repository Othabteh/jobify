import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';
import superagent from 'superagent';
import { If, Then } from 'react-if';
import { MDBContainer } from "mdbreact";
import ReactCountryFlag from "react-country-flag"


import './styles.scss';
import { Container, Row, Col } from 'react-bootstrap';

export default function AdminDashboard() {
  const [data, setData] = useState();
  const [avgAge, setAvgAge] = useState();
  const [errHand, setErrHand] = useState(true)

  const [topCountryPerson, setTopCountryPerson] = useState([]);
  const [topCountryComapny, setTopCountryComapny] = useState([]);


  const color = [
    '#504EDF',
    '#232B4E',
    '#006666',
    '#0000b3',
    '#8080ff',
    '#5c5c8a',
    '#6600ff'
  ]
  const borderColor = [
    '#504EDF',
    '#232B4E',
    '#006666',
    '#0000b3',
    '#8080ff',
    '#5c5c8a',
    '#6600ff'
  ]

  function chartBarHandler(title, data, labels) {
    return {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: data,
          backgroundColor: color,
          borderColor: borderColor,
          borderWidth: 3,
        }]
      },
      options: {
        legend: {
          labels: {
            boxWidth: 0,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              lineHeight: 2,
              display: false
            }
          }]
        }
      }
    }
  }

  function chartDoughnutHandler(title, data, labels) {
    return {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: data,
          backgroundColor: color,
          borderColor: borderColor,
          borderWidth: 3,
        }]
      },
      options: {
        rotation: (0.5 * Math.PI) - (25 / 180 * Math.PI),
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              lineHeight: 2,
              display: false
            }
          }]
        }
      }
    }
  }

  async function getData() {
    const API = 'https://jobify-app-v2.herokuapp.com';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiYWNjb3VudF90eXBlIjoiYWRtaW4iLCJwcm9maWxlIjp7fSwiaWF0IjoxNjA3NjEzOTUwLCJleHAiOjM2MTYwNzYxMzk1MH0.cV-8lRQZKQbI_-4V8TujDoE5n0oMrXixx223HCyRIH4';
    const response = await superagent.get(`${API}/admin`).set('authorization', `Basic ${token}`);
    setData(response.body);
  }

  useEffect(() => {
    if (data && !errHand) {
      setAvgAge(data.avgAge);
      setTopCountryPerson(data.numberPersonEachCountry);
      setTopCountryComapny(data.numberCompanyEachCountry);

      let appUser = document.getElementById('appUser').getContext('2d');
      let appReports = document.getElementById('appReports').getContext('2d');
      let appReportsOpenClose = document.getElementById('appReportsOpenClose').getContext('2d');
      let jobs = document.getElementById('jobs').getContext('2d');
      let statusApps = document.getElementById('statusApps').getContext('2d');
      let statusOffer = document.getElementById('statusOffer').getContext('2d');
      let offerJob = document.getElementById('offerJob').getContext('2d');
      let appOfferJob = document.getElementById('appOfferJob').getContext('2d');
      let dbApiRatio = document.getElementById('dbApiRatio').getContext('2d');
      let topComponiesSendApp = document.getElementById('topComponiesSendApp').getContext('2d');
      let topComponiesSendOffer = document.getElementById('topComponiesSendOffer').getContext('2d');
      let topJobTitle = document.getElementById('topJobTitle').getContext('2d');


      let appUsernew = new Chart(appUser, chartBarHandler(`Total Users ${data.totalUser}`, [data.numCompany, data.numPerson], ['Companies', 'Applicant']));
      let appReportsnew = new Chart(appReports, chartBarHandler(`Total Reports ${data.numOfReports}`, [data.numOfReportsEach[0].number_of_reports, data.numOfReportsEach[1].number_of_reports], [data.numOfReportsEach[0].account_type === 'c' ? 'Company' : 'Applicant', data.numOfReportsEach[1].account_type === 'c' ? 'Company' : 'Applicant']));
      let appReportsOpenClosenew = new Chart(appReportsOpenClose, chartDoughnutHandler('Open/Close Reports', [data.numOfReportsOpen, data.numOfReportsCloesd], ['Open Report', 'Close Report']));
      let dataJob = [];
      let labelsJob = [];
      data.numOfJobsEach.forEach((job, index) => {
        if (index < 5) {
          dataJob.push(job.number_of_each_jobstitle)
          labelsJob.push(job.title)
        }
      })
      let jobsnew = new Chart(jobs, chartBarHandler(`Total Jobs ${data.numOfJobs}`, dataJob, labelsJob));
      let dataApp = [];
      let labelsApp = [];
      let totalApplication = 0;
      data.statusApps.forEach(app => {
        totalApplication += Number(app.number_of_accepted_apps);
        dataApp.push(app.number_of_accepted_apps)
        labelsApp.push(`${app.status} Application`)
      })
      let statusAppsnew = new Chart(statusApps, chartDoughnutHandler('Job Status', dataApp, labelsApp));

      let dataOffer = [];
      let labelaOfeer = [];
      data.offersStatus.forEach(app => {
        totalApplication += Number(app.number_of_accepted_apps);
        dataOffer.push(app.number_of_offers)
        labelaOfeer.push(`${app.status} Offer`)
      })
      let statusOffersnew = new Chart(statusOffer, chartDoughnutHandler('Job Status', dataOffer, labelaOfeer));

      let offerJobTitle = [];
      let labelsOfferJobTitle = [];
      data.numOfOfferEach.forEach((jobTitle, index) => {
        if (index <= 8) {
          offerJobTitle.push(jobTitle.number_of_each_offertitle)
          labelsOfferJobTitle.push(jobTitle.title)
        }
      })
      let offerJobnew = new Chart(offerJob, chartBarHandler(`Most In Demand Job Offer`, offerJobTitle, labelsOfferJobTitle));


      let appOfferJobnew = new Chart(appOfferJob, chartBarHandler(`Number Of Application|Offers|Jobs`, [data.numOfTotalApp, data.numOfOffers, data.numOfJobs], ['Application', 'Offers', 'Jobs']));

      let dbApiRationew = new Chart(dbApiRatio, chartDoughnutHandler('Job Status', [data.numOfDbApp, data.numOfApiApp], ['DataBase', 'Third Party Provider']));

      let compantAppNum = [];
      let labelsCompantAppNum = [];
      data.numOfCompanyAppEach.forEach((company, index) => {
        if (index < 5) {
          compantAppNum.push(company.number_of_each_companyapp)
          labelsCompantAppNum.push(company.company_name)
        }
      })

      let topComponiesSendAppnew = new Chart(topComponiesSendApp, chartBarHandler(`Top Companies Interactive By Send Offers`, compantAppNum, labelsCompantAppNum));

      let compantOfferNum = [];
      let labelsCompantOfferNum = [];
      data.numOfCompanyOffersEach.forEach((company, index) => {
        if (index < 5) {
          compantOfferNum.push(company.number_of_each_companyoffers)
          labelsCompantOfferNum.push(company.company_name)
        }
      })

      let topComponiesSendOffernew = new Chart(topComponiesSendOffer, chartBarHandler(`Top Companies Interactive By Received Application`, compantOfferNum, labelsCompantOfferNum));

      let applicpintNumJobTitle = [];
      let labelsapplicpintNumJobTitle = [];
      data.numberPersonEachJobTitle.forEach((company, index) => {
        if (index < 8) {
          applicpintNumJobTitle.push(company.number_person_ofeach_jobtilte)
          labelsapplicpintNumJobTitle.push(company.job_title)
        }
      })

      let topJobTitlenew = new Chart(topJobTitle, chartBarHandler(`Most Applicant Job Title`, applicpintNumJobTitle, labelsapplicpintNumJobTitle));


    } else {
      getData()
      setErrHand(false)
    }
  }, [data]);



  function People() {
    return topCountryPerson.map(item => {

      return (
        <Row className="country">
          <Col>{item.country}</Col>
          <Col>{item.number_person_ofeach_country}</Col>
        </Row>
      )
    })
  }

  function Company() {
    return topCountryComapny.map(item => {
      return (
        <Row className="country">
          <Col>{item.country}</Col>
          <Col>{item.number_company_ofeach_country}</Col>
        </Row>
      )
    })
  }

  const ScrollBarPage = () => {
    const scrollContainerStyle = { width: "200px", maxHeight: "200px", overflowY: 'scroll', overflowX: 'hidden'  };
    return (
      <Row>
        <Col className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle}>
          <MDBContainer>
            <People />
          </MDBContainer>
        </Col>
        <Col className="scrollbar scrollbar-primary  mt-5 mx-auto" style={scrollContainerStyle}>
          <MDBContainer>
            <Company />
          </MDBContainer>
        </Col>
      </Row >
    );
  }


  return (
    <Container>
      <Row >
        <Col style={{ width: '400px', height: '200px', margin: '50px' }}>
          <canvas className='myChart' id="appUser" width="400" height="200"></canvas>
        </Col>
        <Col style={{ width: '400px', height: '200px', margin: '50px' }}>
          <canvas className='myChart' id="appReportsOpenClose" width="400" height="200" ></canvas>
        </Col>
      </Row>

      <Row >
        <Col style={{ width: '400px', height: '200px', margin: '50px' }}>
          <canvas className='myChart' id="jobs" width="400" height="200"></canvas>
        </Col>
        <Col style={{ width: '400px', height: '200px', margin: '50px' }}>
          <canvas className='myChart' id="appReports" width="400" height="200" ></canvas>
        </Col>
      </Row>
      <Row >
        <Col style={{ width: '400px', height: '200px', margin: '50px' }}>
          <canvas className='myChart' id="statusApps" width="400" height="200" ></canvas>
        </Col>
        <Col style={{ width: '400px', height: '200px', margin: '50px' }}>
          <canvas className='myChart' id="statusOffer" width="400" height="200" ></canvas>
        </Col>
      </Row>

      <Row >
        <canvas className='myChart' id="offerJob" width="200" height="50" ></canvas>
      </Row>

      <Row style={{
        height: '150px',
      }}>

      </Row>

      <Row >
        <Col style={{ width: '400px', height: '200px', margin: '50px' }}>
          <canvas className='myChart' id="appOfferJob" width="400" height="200" ></canvas>
        </Col>
        <Col style={{ width: '400px', height: '200px', margin: '50px', fontSize: '50px', fontFamily: 'Fantasy', textAlign: 'center' }}>
          Average age
           <br />
          {avgAge} Years
        </Col>
      </Row>
      <Row >
        <canvas className='myChart' id="dbApiRatio" width="200" height="100" ></canvas>
      </Row>



      <Row style={{
        height: '150px',
      }}>

      </Row>
      <Row className="countryHeader">
        <Col>Location</Col>
        <Col>Total Applicant</Col>
        <Col>Location</Col>
        <Col>Total Companies</Col>
      </Row>
      <ScrollBarPage />

      <Row >
        <Col style={{ width: '400px', height: '200px', margin: '50px' }}>
          <canvas className='myChart' id="topComponiesSendApp" width="400" height="200" ></canvas>
        </Col>
        <Col style={{ width: '400px', height: '200px', margin: '50px', fontSize: '50px', fontFamily: 'Fantasy', textAlign: 'center' }}>
          <canvas className='myChart' id="topComponiesSendOffer" width="400" height="200" ></canvas>
        </Col>
      </Row>


      <Row >
        <canvas className='myChart' id="topJobTitle" width="400" height="100" ></canvas>
      </Row>


    </Container>
  )
}



