import React, { Component } from 'react'
import { render } from 'react-dom'
import axios from 'axios';
import Example from './editorSupport';
import styled, { injectGlobal } from 'styled-components'
import { Link } from 'react-router-dom';
import 'c3/c3.css';
import { loadProgressBar } from 'axios-progress-bar';
import { Redirect } from 'react-router';
import Modal from 'react-modal';
import '../stylesheets/App.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.props.getEdms();
    loadProgressBar();
  }
 
  render() {
    /*Logic for pagination*/
    
  
      return (<div>This from Dashboard</div>);
    

  }
}

export default Dashboard;
