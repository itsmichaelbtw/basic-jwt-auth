import React from 'react'

import Typography from "antd/lib/typography"
import PageHeader from "antd/lib/page-header"
import { ApplicationUseContext, ApplicationProvider } from "../context/state"

const { Text } = Typography

export default function Home() {
    const [state, dispatch] = ApplicationUseContext()

    return (
        <div className="align">
            <Text style={{ fontSize: 16 }}>You are viewing the home page</Text>
        </div>
    )
}
