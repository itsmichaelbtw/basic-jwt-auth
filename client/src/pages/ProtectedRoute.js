import React from 'react'

import Typography from "antd/lib/typography"
import PageHeader from "antd/lib/page-header"
import Button from "antd/lib/button"

import { ApplicationUseContext, ApplicationProvider } from "../context/state"

const { Text } = Typography

export default function ProtectedRoute() {
    const [state, dispatch] = ApplicationUseContext()

    return (
        <div className="align">
            <Text style={{ fontSize: 16 }}>You are seeing this page because you are logged in</Text>
            <Button type="primary" style={{ marginTop: 24 }} onClick={() => dispatch({type: "REMOVE_USER"})}>Logout</Button>
        </div>
    )
}
