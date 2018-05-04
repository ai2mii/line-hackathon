import React, { Component } from 'react'
import axios from 'axios'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Alert, Card, Row, Col, Input, Button, message } from 'antd'
import cloudFunction from './service/cloudFunction'

const { TextArea } = Input

class ReportForm extends Component {
  state = {
    isLoadingReport: true,
    isEditReport: false,
    copied: false,
    reportData: '',
    isFetchDataError: false,
  }

  title = 'Dairy Report'
  titleDairyReport = 'Jobthai Upgrade'

  componentDidMount = () => {
    cloudFunction.getDairyReport()
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

  reportFormat = (reportDairyObj) => {
    const memberNameArray = Object.keys(reportDairyObj)
    let reportString = `
      ${this.titleDairyReport}
    `
    memberNameArray.forEach((name) => {
      reportString = `${reportString}
        ${name}
          ${reportDairyObj[name].message}
      `
    })
    return reportString
  }

  handleClick = () => {
    console.log('test')
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

  showResportData = () => {
    if (this.state.isFetchDataError) {
      return (
      <Alert
        message="Error"
        description="Cannot get dairy report, Please try again."
        type="error"
        showIcon
      />)
    }

    if (this.state.isEditReport) {
      return (
        <Card loading={false} title={this.title}>
          <TextArea defaultValue={this.state.reportData} onChange={this.handleEdited} style={{ paddingLeft: '20px' }} autosize />
          <Button type="primary" onClick={this.handleSaveEdit} style={{ marginTop: 16 }}>Save</Button>
        </Card>
      )
    }
    return (
      <Card loading={this.state.isLoadingReport} title={this.title} style={{ whiteSpace: 'pre-wrap', paddingLeft: '20px' }}>
        {this.state.reportData}
      </Card>
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
                {this.showResportData()}
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
