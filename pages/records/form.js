import React from 'react'
import {Button, Row, Col, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'
import {Field, reduxForm} from 'redux-form'

const renderField = ({input, meta, label, ...props}) => (
  <FormGroup controlId={input.name}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} {...props}/>
  </FormGroup>
)

const RecordForm = props => {
  const {handleSubmit} = props
  return (
    <Form inline onSubmit={handleSubmit}>
    <Field name="date" component={renderField} type="date" label="起始日期:"/>
    {' '}
    <Field name="period" component={renderField} type ="number" value={3} max={30} min={1} label="间隔时间:"/>
    {' '}
    <Button type="submit" bsStyle="primary">查询</Button>
    </Form>
  )
}

export default reduxForm({
  form:'record'
})(RecordForm)
