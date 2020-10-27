import React, { Children } from 'react'

export default function Header(props) {
    return (
        <header>
            <h1>ReactJS: {props.title}</h1>
            {props.children}
        </header>
    )

}