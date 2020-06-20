/*
 * @file: NotFound.js
 * @description: Component to show not found if no route matches with defined routings OR if user enter something in route which does not match with routes in our application then user will come to this page
 * @author: Megha Sethi
 * */
import React, { Component } from 'react'

export default class NotFound extends Component {
  render() {
    return (
      <div>
        404 Not Found
      </div>
    )
  }
}
