import React from "react"
import App from "./app"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
const container = document.getElementById("root")
const root = createRoot(container as HTMLDivElement)
root.render(
    <Router>
        <App />
    </Router>
)
