import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SideNavigation from './SideNavigation';
import FontAwesome from 'react-fontawesome';


class Header extends Component {

    state = {
        showNav: false
    }

    onOpenNav = () => {
        this.setState({
            showNav: true
        })
    }

    onHideNav = () => {
        this.setState({
            showNav: false
        })
    }

    render() {
        return (
            <header>
                <div className="open_nav">
                <FontAwesome name="bars" onClick={this.onOpenNav} style={{
                    color: "#fff", padding: "10px", cursor: "pointer"
                }}/>
                </div>
                <SideNavigation showNav={this.state.showNav} onHideNav={this.onHideNav}/>
                <Link to="/" className="logo">
                    BookShelf
                </Link>
            </header>
        );
    }
}

export default Header;