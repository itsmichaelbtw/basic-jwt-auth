import React, { useEffect, useState } from 'react'
import Typography from "antd/lib/typography"
import PageHeader from "antd/lib/page-header"
import Form from "antd/lib/form"
import Input from "antd/lib/input"
import Button from "antd/lib/button"
import Checkbox from "antd/lib/checkbox"

import Api from "../utils/api"

import { Link } from "react-router-dom"
import { ApplicationUseContext, ApplicationProvider } from "../context/state"
import { Redirect } from "react-router-dom"
import Alert from 'antd/lib/alert'


export default function Register() {
    const [error, setError] = useState({ show: false, msg: "" })
    const [isLoading, setLoading] = useState(false)
    const [state, dispatch] = ApplicationUseContext()

    const Register = async (values) => {
        setLoading({ show: true, msg: "" })

        try {
            const RegisterUser = await Api.Register(values)

            if (values.remember) {
                localStorage.setItem("session", RegisterUser)
            }

            dispatch({
                type: "SET_USER",
                payload: {
                    token: RegisterUser.token
                }
            })
        } catch (error) {
            setLoading(false)
            setError({ show: true, msg: error.error })
        }
    }

    // redirect user to register page, no need to show register page if already logged in

    if (state.session.token) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="align">
            <Form name="register-form" className="register-form" initialValues={{ remember: true }} onFinish={Register}>
                {
                    error.show && <Alert style={{ marginBottom: 16 }} message={error.msg} type="error" closable afterClose={() => setError({ ...error, show: false })} />
                }
                <Form.Item name="username" hasFeedback rules={[{ required: true, message: 'Please input your Username!' }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="email" hasFeedback rules={[{ required: true, message: 'Please input your Email!' }, () => ({
                    validator(_, value) {
                        const toCheck = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                        
                        if (!value || toCheck.test(value)) {
                            return Promise.resolve()
                        }

                        if (value === "") {
                            return Promise.resolve()
                        }

                        return Promise.reject("Invalid email address")
                    }
                })]}>
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" hasFeedback rules={[{ required: true, message: 'Please input your Password!' }]}>
                    <Input type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item name="confirm" hasFeedback rules={[{ required: true, message: 'Please confirm your Password!'}, ({getFieldValue}) => ({
                    validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                            return Promise.resolve()
                        } 

                        return Promise.reject("The two passwords you entered do not match")
                    }
                })]}>
                    <Input type="password" placeholder="Confirm Password" />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button" loading={isLoading}>
                        Register
                    </Button>
                    Or <Link to="/login">login</Link>
                </Form.Item>
            </Form>
        </div>
    )
}
