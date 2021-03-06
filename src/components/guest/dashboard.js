import React, { useState, useEffect, useContext } from 'react';
import './styles.scss';
import superagent from 'superagent';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Results from '../search/jobs/results';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { If, Then, Else } from 'react-if';

import * as Icon from 'react-bootstrap-icons';
const jobsApi = 'https://jobify-app-v2.herokuapp.com/search/job';

export default function GuestDashbaord() {
  const context = useContext(AuthContext);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  let history = useHistory();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [visable, setVisable] = useState(false);
  const [loader, setLoader] = useState(false);
  const sugJobs = [
    {
      id: 1,
      title: 'Developer',
      location: 'usa',
      type: 'Full Time (iam from database)',
      description: 'A full time job with 900jd salary.',
      applicants_num: 50,
      company_id: 1,
      company_name: 'Demo Company Esseil',
      phone: '079028555',
      company_url: 'www.demo.com',
      logo: 'https://www.flaticon.com/svg/static/icons/svg/993/993891.svg',
      country: 'USA',
      auth_id: 2,
    },
    {
      id: 3,
      title: 'Developer',
      location: 'usa',
      type: 'Full Time (iam from database)',
      description: 'A full time job with 900jd salary.',
      applicants_num: 49,
      company_id: 3,
      company_name: 'Demo Company',
      phone: '079028555',
      company_url: 'www.demo.com',
      logo: 'https://www.flaticon.com/svg/static/icons/svg/993/993891.svg',
      country: 'KSA',
      auth_id: 3,
    },
    {
      id: 2,
      title: 'civil eng',
      location: 'Jordan',
      type: 'Full Time (iam from database)',
      description: 'A full time job with 100jd salary 24hour wooork.',
      applicants_num: 49,
      company_id: 2,
      company_name: 'Demo Company',
      phone: '079028555',
      company_url: 'www.demo.com',
      logo: 'https://www.flaticon.com/svg/static/icons/svg/993/993891.svg',
      country: 'KSA',
      auth_id: 4,
    },
    {
      id: 2,
      title: 'Developer',
      location: 'Jordan',
      type: 'Full Time',
      description: 'A full time job with 900jd salary.',
      applicants_num: 50,
      company_id: 2,
      company_name: 'Demo Company',
      phone: '079028555',
      company_url: 'www.demo.com',
      logo: 'https://www.flaticon.com/svg/static/icons/svg/993/993891.svg',
      country: 'KSA',
      auth_id: 4,
    },
    {
      id: 1,
      title: 'Developer',
      location: 'Jordan',
      type: 'Full Time',
      description: 'A full time job with 900jd salary.',
      applicants_num: 8,
      company_id: 1,
      company_name: 'Demo Company Esseil',
      phone: '079028555',
      company_url: 'www.demo.com',
      logo: 'https://www.flaticon.com/svg/static/icons/svg/993/993891.svg',
      country: 'USA',
      auth_id: 2,
    },
  ];
  const checkSize = () => {
    setScreenSize(window.screen.width);
  };
  useEffect(() => {
    return () => {
      window.removeEventListener('resize', checkSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize]);

  const jobList = async (e) => {
    e.preventDefault();
    setLoader(true);

    await superagent
      .get(jobsApi)

      .query({ title: title, location: location })

      .then((data) => {
        setResults([...data.body.resultDB, ...data.body.resultAPI]);
        setLoader(false);
        setVisable(true);
      });
  };

  return (
    <Container style={{ textAlign: 'center' }}>
      <Container style={{ textAlign: 'center' }}>
        <Form onSubmit={jobList}>
          <br></br>
          <Row style={{ display: 'flex', flexDirection: 'row' }}>
            <Row style={{ display: 'flex', flexDirection: 'column', marginTop: '40px' }}>
              <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start', marginLeft: '5px' }}>
                <h2 style={{ textAlign: 'left', fontSize: '45px', fontWeight: 'bold' }}>Lets Find your</h2>
                <h2 style={{ textAlign: 'left', fontSize: '45px', fontWeight: 'bold' }}>
                  Dream <span style={{ color: '#504edf', fontSize: '45px', fontWeight: 'bold' }}>Job</span>
                </h2>
                <h3 style={{ color: '#9393A1', marginTop: '15px', marginBottom: '15px' }}>We have what you are looking for</h3>
              </Row>
              <Row sm={6} className='search-container' style={{ width: 'fit-content', justifyContent: 'flex-start', margin: 0, height: 'fit-content' }}>
                <Col sm={5} className='input-filed pad'>
                  <Icon.EnvelopeFill className='icon' />

                  <Form.Control className='input' required name='title' type='text' onChange={(e) => setTitle(e.target.value)} placeholder='Job Title' />
                </Col>
                <Col sm={5} className='input-filed pad'>
                  <Icon.GeoAltFill className='icon' />
                  <Form.Control className='input' required name='location' type='text' onChange={(e) => setLocation(e.target.value)} placeholder='Country' />
                </Col>

                <Col sm={2}>
                  <Button variant='outline-dark' className='button land-page-btn' type='submit'>
                    <Icon.Search size='20' />
                  </Button>
                </Col>
              </Row>
            </Row>
            <Row style={{ width: '40%', justifyContent: 'flex-end' }} id='searchImg'>
              <Col className='flexF'>
                <Image className='image' style={{ width: '100%' }} src='../../assets/user.png' rounded />
              </Col>
            </Row>
          </Row>
          <Row>
            <If condition={results[0]}>
              <Then>
                <Results results={results} visable={visable} loader={loader} />
              </Then>
              <Else>
                <If condition={visable}>
                  <Container style={{ justifyContent: 'center', marginTop: '30px' }}>
                    <Col sm={12} style={{ color: '#717171', fontSize: 40, fontWeight: 700, textAlign: 'center' }}>
                      NO RESULTS
                    </Col>
                  </Container>
                </If>
              </Else>
            </If>
          </Row>
        </Form>
      </Container>
      <Container style={{ justifyContent: 'center', marginTop: '150px', marginBottom: '100px' }}>
        <Row style={{ justifyContent: 'center' }}>
          <h2 style={{ fontSize: '35px', fontWeight: 'bold', color: 'black', borderBottom: '4px solid #504edf', padding: '10px' }}>Job Categories</h2>
        </Row>
        <Row sm={8} style={{ justifyContent: 'center' }}>
          <Row style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }} sm={8}>
            <Col style={{ marginTop: '30px', justifyContent: 'center', alignSelf: 'center' }}>
              <Card style={{ margin: '0 auto', width: '18rem', height: '300px', alignItems: 'center', paddingTop: '20px', backgroundColor: ' #eaecf1', border: '1px solid #e1e3e8 ', boxShadow: '0 0 7px #888888', borderRadius: '5px' }}>
                <Card.Img style={{ width: '70px' }} variant='top' src='../../assets/Icon1.png' roundedCircle />
                <Card.Body>
                  <Card.Title style={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>Software Engineering</Card.Title>
                  <Card.Text style={{ color: '#515151', fontSize: '14px' }}>The combination of autonomy, pay, flexibility, and job satisfaction leads to software engineers being quite happy compared to people in other professions.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col style={{ marginTop: '30px' }}>
              <Card style={{ margin: '0 auto', width: '18rem', height: '300px', textAlign: 'center', alignItems: 'center', paddingTop: '20px', backgroundColor: ' #eaecf1', border: '1px solid #e1e3e8 ', boxShadow: '0 0 7px #888888', borderRadius: '5px' }}>
                <Card.Img style={{ width: '70px' }} variant='top' src='../../assets/Icon2.png' roundedCircle />
                <Card.Body>
                  <Card.Title style={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>Application Development</Card.Title>
                  <Card.Text style={{ color: '#515151', fontSize: '14px' }}>The process of creating a computer program or a set of programs to perform the different tasks that a business requires.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col style={{ marginTop: '30px', justifyContent: 'center' }}>
              <Card style={{ margin: '0 auto', width: '18rem', height: '300px', justifyContent: 'center', alignItems: 'center', paddingTop: '20px', backgroundColor: ' #eaecf1', border: '1px solid #e1e3e8 ', boxShadow: '0 0 7px #888888', borderRadius: '5px' }}>
                <Card.Img style={{ width: '70px', justifyContent: 'center' }} variant='top' src='../../assets/Icon5.png' roundedCircle />
                <Card.Body>
                  <Card.Title style={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>Construction Engineering</Card.Title>
                  <Card.Text style={{ color: '#515151', fontSize: '14px' }}>Professional discipline that deals with the designing, planning, construction and management of infrastructures.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row sm={8} style={{ justifyContent: 'center' }}>
            <Col style={{ marginTop: '30px' }}>
              <Card style={{ margin: '0 auto', width: '18rem', height: '300px', alignItems: 'center', paddingTop: '20px', backgroundColor: ' #eaecf1', border: '1px solid #e1e3e8 ', boxShadow: '0 0 7px #888888', borderRadius: '5px' }}>
                <Card.Img style={{ width: '70px' }} variant='top' src='../../assets/Icon.png' roundedCircle />
                <Card.Body>
                  <Card.Title style={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>Business Administrations</Card.Title>
                  <Card.Text style={{ color: '#515151', fontSize: '14px' }}>The performance or management of business operations and decision-making.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col style={{ marginTop: '30px' }}>
              <Card style={{ margin: '0 auto', width: '18rem', height: '300px', textAlign: 'center', alignItems: 'center', paddingTop: '20px', backgroundColor: ' #eaecf1', border: '1px solid #e1e3e8 ', boxShadow: '0 0 7px #888888', borderRadius: '5px' }}>
                <Card.Img style={{ width: '70px' }} variant='top' src='../../assets/Icon5.png' roundedCircle />
                <Card.Body>
                  <Card.Title style={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>Marketing</Card.Title>
                  <Card.Text style={{ color: '#515151', fontSize: '14px' }}>The process of understanding your customers, and building and maintaining relationships with them.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col style={{ marginTop: '30px' }}>
              <Card style={{ margin: '0 auto', width: '18rem', height: '300px', textAlign: 'center', alignItems: 'center', paddingTop: '20px', backgroundColor: ' #eaecf1', border: '1px solid #e1e3e8 ', boxShadow: '0 0 7px #888888', borderRadius: '5px' }}>
                <Card.Img style={{ width: '70px' }} variant='top' src='../../assets/Icon6.png' roundedCircle />
                <Card.Body>
                  <Card.Title style={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }}>Finance</Card.Title>
                  <Card.Text style={{ color: '#515151', fontSize: '14px' }}>The management, creation, and study of money and investments.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Row>
      </Container>
      <Container style={{ textAlign: 'center', marginTop: '50px' }}>
        <Container style={{ width: 'fit-content', textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black', borderBottom: '4px solid #504edf', padding: '10px' }}>Featured Jobs</h2>
        </Container>
        <Container className='list-container ' style={{ marginTop: '20px' }} fluid>
          <Row sm={8} className='flexRow list-header list-container-sp' style={{ padding: '25px' }}>
            <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'left' }} className='table-row-l-home' sm={3}>
              Job Title
            </Col>
            <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'left' }} className='table-row-l-home' sm={3}>
              Company{' '}
            </Col>
            <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'left' }} className='table-row-l-home' sm={2}>
              Location
            </Col>
            <Col style={{ color: '#515151', fontWeight: 660, textAlign: 'center' }} className='table-row-l-home' sm={2}>
              Type
            </Col>
            <Col sm={1}></Col>
            <Col sm={1}></Col>
          </Row>
          {sugJobs.map((item) => {
            return (
              <Row className='flexRow list-body' sm={8}>
                <Col style={{ fontWeight: 650, textAlign: 'left' }} className='table-row-l-home' sm={3}>
                  {item.title}
                </Col>
                <Col style={{ textAlign: 'left', color: '#515151' }} className='table-row-l-home' sm={3}>
                  {item.company_name}
                </Col>
                <Col style={{ textAlign: 'left', color: '#515151' }} className='table-row-l-home' sm={2}>
                  {item.location}
                </Col>
                <Col style={{ textAlign: 'center', color: '#515151' }} className='table-row-l-home' sm={2}>
                  {item.type}
                </Col>
                <Col style={{ textAlign: 'center', paddingRight: '10px' }} className='button-col pad' sm={1}>
                  <Button
                    className='button land-page-btn'
                    style={{ width: '100%' }}
                    onClick={() => {
                      history.push('/signup');
                    }}
                    variant='praimary'
                  >
                    Save
                  </Button>
                </Col>
                <Col style={{ textAlign: 'center', paddingRight: '10px' }} className='button-col pad' sm={1}>
                  <Button
                    className='button land-page-btn'
                    style={{ width: '100%' }}
                    onClick={() => {
                      history.push('/signup');
                    }}
                    variant='praimary'
                  >
                    Apply
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Container>
      </Container>
      <Container style={{ marginTop: '100px', width: '75%' }}>
        <Row>
          <Col sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start', marginLeft: '5px', marginTop: '50px' }}>
            <h2 style={{ textAlign: 'left', fontSize: '35px', fontWeight: 'bold' }}>We Offer Jobs From </h2>
            <h2 style={{ textAlign: 'left', fontSize: '35px', fontWeight: 'bold' }}>Companies All Over</h2>
            <h2 style={{ textAlign: 'left', fontSize: '35px', fontWeight: 'bold' }}>The World</h2>
          </Col>
          <Col sm={4} style={{ justifyContent: 'center' }}>
            <Image id='worldImg' className='image' style={{ width: '400px' }} src='../../assets/Mask8.png' rounded />
          </Col>
        </Row>
      </Container>
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '100px', width: '85%', alignItems: 'center', marginBottom: '50px' }}>
        <Row style={{ justifyContent: 'center' }}>
          <h2 style={{ fontSize: '35px', fontWeight: 'bold', color: 'black', borderBottom: '4px solid #504edf', padding: '10px' }}>Contact Us</h2>
        </Row>
        <Row style={{ alignItems: 'center' }}>
          <Col sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start', marginLeft: '5px', marginTop: '50px', alignItems: 'center' }}>
            <Form style={{ width: '100%' }}>
              <Form.Group controlId='formBasicPassword'>
                <Form.Control style={{ backgroundColor: ' #e1e3e8', padding: '30px', paddingLeft: '10px' }} type='text' placeholder='First Name' />
              </Form.Group>
              <Form.Group controlId='formBasicEmail'>
                <Form.Control style={{ backgroundColor: ' #e1e3e8', padding: '30px', paddingLeft: '10px' }} type='email' placeholder='E-mail' />
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Control style={{ backgroundColor: ' #e1e3e8', paddingBottom: '100px', paddingLeft: '10px', paddingTop: '20px' }} type='message' placeholder='Message' />
              </Form.Group>

              <Button style={{ backgroundColor: '#504edf', padding: '10px', fontWeight: 'bold', border: '1px solid #504edf' }} variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
          <Col sm={5} style={{ justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Image className='image' style={{ width: '100%' }} src='../../assets/Mask6.png' rounded />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
