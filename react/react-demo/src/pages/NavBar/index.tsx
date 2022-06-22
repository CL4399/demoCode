import React, { Component } from "react"

export default class Navbar extends Component {
    render() {
        return (
            <nav className="nav-wrapper">
                <div className="list" style={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
                    <a href="/">Home</a>
                    <a href="/#/404">404</a>
                    <a href="/#/about">About</a>
                </div>
            </nav>
        )
    }
}
