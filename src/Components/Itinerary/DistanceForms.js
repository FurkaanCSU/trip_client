import React, {Component} from "react"
import {Formik, withFormik} from "formik"
import {Button, FormGroup, Row, Col, Form, Input, Label} from 'reactstrap'
import {PROTOCOL_VERSION, SERVER_REQUEST} from "../../Constants"
import {sendServerPostRequest} from "../../utils/restfulAPI"


export default class DistanceForms extends Component {
    render() {

        return(
            <div>
                <h3>Distance Calculator</h3>
                <Formik
                    initialValues={{place1: '', place2: '', earthRadius: 6371}}
                    validate={values => {
                        const errors = {};
                        if (!values.place1) {
                            errors.place1 = 'Required';
                        } else if (
                            !/^[+-]*\d+\.?\d*\s*,\s*[+-]*\d{0,3}[\.?\d*]*$/.test(values.place1)
                        ) {
                            errors.place1 = 'Invalid location';
                        }
                        if (!values.place2) {
                            errors.place2 = 'Required';
                        } else if (
                            !/^[+-]*\d+\.?\d*\s*,\s*[+-]*\d{0,3}[\.?\d*]*$/.test(values.place2)
                        ) {
                        errors.place2 = 'Invalid location';
                        }
                        return errors;
                    }
                    } onSubmit={(values, {setSubmitting}) => {
                        let place1 = values.place1.split(',')
                        let place2 = values.place2.split(',')
                        setSubmitting(false)
                        this.sendDistanceRequest({
                            place1: {
                                latitude: place1[0],
                                longitude: place1[1]
                            },
                            place2: {
                                latitude: place2[0],
                                longitude: place2[1]
                            },
                            earthRadius: values.earthRadius
                        })
                    }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                      handleSubmit,
                    isSubmitting,
                    submitForm,
                    setFieldValue
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className="centerForm">
                        <div>
                            <Input
                                type="place1"
                                name="place1"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.place1}
                            />
                            <div style={{color: "red", fontSize: 12}}>{errors.place1 && touched.place1 && errors.place1}</div>
                        </div>
                        <div>
                            <Input
                                type="place2"
                                name="place2"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.place2}
                            />
                            <div style={{color: "red", fontSize: 12}}>{errors.place2 && touched.place2 && errors.place2}</div>
                        </div>
                        <div>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="meters"
                                        value={values.earthRadius}
                                        checked={values.earthRadius === 6371000}
                                        onChange={() => setFieldValue("earthRadius", 6371000)}/>{' '}
                                    Meters
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio"
                                           name="kms"
                                           value={values.earthRadius}
                                           checked={values.earthRadius === 6371}
                                           onChange={() => setFieldValue("earthRadius", 6371)}
                                    />{' '}
                                    Kms
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio"
                                           name="miles"
                                           value={values.earthRadius}
                                           checked={values.earthRadius === 3958.8}
                                           onChange={() => setFieldValue("earthRadius", 3958.8)}
                                    />{' '}
                                    Mi.
                                </Label>
                            </FormGroup>
                        </div>
                        <Button type="submit" onClick={()=>submitForm()} disabled={isSubmitting }>
                            Submit
                        </Button>
                    </form>
                )}
                </Formik>
            </div>)
    }

    sendDistanceRequest(request){
        //console.log(request)
        sendServerPostRequest(SERVER_REQUEST, "distance", request).then((response) => {
            this.props.processDistanceResponse(response)
        })
    }
}