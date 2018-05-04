import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { DatePicker, Alert, Card, Row, Col, Input, Button, message } from 'antd'
import cloudFunction from './service/cloudFunction'

const { TextArea } = Input

class ReportForm extends Component {
  state = {
    isLoadingReport: true,
    isEditReport: false,
    copied: false,
    reportData: '',
    isFetchDataError: false,
    dateReport: moment().format("YYYY-MM-DD"),
  }

  title = 'Daily Report'
  titleDailyReport = 'Jobthai Upgrade'

  componentDidMount = () => {
    this.fetchDailyReport(this.state.dateReport)
  }

  fetchDailyReport = (dateReport) => {
    cloudFunction.getDailyReport(dateReport)
      .then((response) => {
          const reportData = response.data
          this.setState({
            reportData: this.reportFormat(reportData),
            isLoadingReport: false,
          })
      })
      .catch((err) => {
        console.log(err)
        this.setState({ isFetchDataError: true })
      })
  }

  reportFormat = (reportDailyObj) => {
    const memberNameArray = Object.keys(reportDailyObj)
    let reportString = `
      ${this.titleDailyReport} ${this.state.dateReport}
    `
    memberNameArray.forEach((name) => {
      reportString = `${reportString}
        ${name}
          ${reportDailyObj[name].message}
      `
    })
    return reportString
  }

  handleClick = () => {
    this.setState({ isLoadingReport: false })
  }

  handleEdited = (e) => {
    console.log(e.target.value)
    this.setState({ reportData: e.target.value })
  }

  handleSaveEdit = () => {
      this.setState({ isEditReport: !this.state.isEditReport })      
  }

  handleEditReport = () => {
    this.setState({ isEditReport: !this.state.isEditReport })
  }

  handleCopy = () => {
    this.setState({ copied: true })
  }

  alertMsgCopied = () => {
    message.success('Copied');
  }

  handleSelectDate = (date, dateString)  => {
    this.setState({ dateReport: dateString })
    this.fetchDailyReport(dateString)
  }

  showReportData = () => {
    if (this.state.isFetchDataError) {
      return (
      <Alert
        message="Error"
        description="Cannot get Daily report, Please try again."
        type="error"
        showIcon
      />)
    }

    if (this.state.isEditReport) {
      return (
        <Card loading={false} title={`${this.title} ${this.state.dateReport}`}>
          <DatePicker onChange={this.handleSelectDate} defaultValue={moment()}/>
          <TextArea defaultValue={this.state.reportData} onChange={this.handleEdited} style={{ paddingLeft: '20px' }} autosize />
          <Button type="primary" onClick={this.handleSaveEdit} style={{ marginTop: 16 }}>Save</Button>
        </Card>
      )
    }
    return (
      <div>
        <DatePicker onChange={this.handleSelectDate} defaultValue={moment()} />
        <Card loading={this.state.isLoadingReport} title={`${this.title} ${this.state.dateReport}`} style={{ whiteSpace: 'pre-wrap', paddingLeft: '20px' }}>
          {this.state.reportData}
        </Card>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Row style={{ padding: '25px', minHeight: '580px' }}>
          <Col span={4} />
          <Col span={16}>
            <Row>
              <Col span={24}>
                {this.showReportData()}
              </Col>
            </Row>
            <Row>
              <Col span={2}>
                <Button
                  type="primary"
                  style={{ margin: '10px 0px 10px 0px' }}
                  onClick={this.handleEditReport}
                  disabled={this.state.isEditReport}
                >
                  Edit
                </Button>
              </Col>
              <Col span={18} />
              <Col span={4} style={{ textAlign: 'left' }}>
                <CopyToClipboard text={this.state.reportData}
                  onCopy={this.handleCopy}>
                  <Button type="primary" style={{ margin: '10px 0px 10px 0px' }}  onClick={this.alertMsgCopied} >Copy to clipboard </Button>
                </CopyToClipboard>
              </Col>
            </Row>
            <Row>
              <Col span={21} />
              <Col span={3}>
                <Button type="primary" style={{ background: 'green', borderColor: 'green' }}>Send to LINE</Button>
              </Col>
            </Row>
          </Col>
          <Col span={4} />
        </Row>
      </div>
    );
  }
}

export default ReportForm;
