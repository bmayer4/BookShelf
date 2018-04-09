import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const SideNavItems = (props) => {

    const loggedInitems = [
        {
            type: 'navItem',
            text: 'Home',
            link: '/',
            restricted: false
        },
        {
            type: 'navItem',
            text: 'Profile',
            link: '/user',
            restricted: false
        },
        {
            type: 'navItem',
            text: 'Reviews',
            link: '/user/reviews',
            restricted: false
        },
        {
            type: 'navItem',
            text: 'Add Review',
            link: '/user/add',
            restricted: false
        },
        {
            type: 'navItem',
            text: 'Logout',
            link: '/user/logout',
            restricted: false
        }
    ]

    const loggedOutitems = [
        {
            type: 'navItem',
            text: 'Home',
            link: '/',
            restricted: false
        },
        {
            type: 'navItem',
            text: 'Reviews',
            link: '/user/reviews',
            restricted: false
        },
        {
            type: 'navItem',
            text: 'Register',
            link: '/user/register',
            restricted: false
        },
        {
            type: 'navItem',
            text: 'Login',
            link: '/user/login',
            restricted: false
        }
    ]

    const showItems = () => {
        if (props.auth.auth) {
        return loggedInitems.map((item, i) => {
            return elements(item, i);
        })
        } else {
            return loggedOutitems.map((item, i) => {
                return elements(item, i);
            })
        }
    };

    const elements = (item, i) => {
        return (
            <div key={i} className={item.type}>
            <Link to={item.link} onClick={props.onHideNav}>
            {item.text}
            </Link>
            </div>
        );
    };

    return (
        <div>
            {showItems()}
        </div>
    )
}

const mapStateToProps = state => {
    return {
      auth: state.auth
    };
  };
  
export default connect(mapStateToProps)(SideNavItems);

