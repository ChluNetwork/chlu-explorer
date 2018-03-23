import React, { Component } from 'react'
import { Form } from 'semantic-ui-react';

export default class OpenMultihashForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            multihash: ''
        }
    }

    onChangeMultihash(event, { value }) {
        this.setState({ multihash: value })
    }

    submit(){
        this.props.onSubmit({
            multihash: this.state.multihash
        })
        this.setState({ multihash: '' })
    }

    render() {
        return <Form onSubmit={this.submit.bind(this)} style={this.props.style}>
            <Form.Input
                placeholder="Review Record Multihash"
                value={this.state.multihash}
                onChange={this.onChangeMultihash.bind(this)}
            />
        </Form>
    }
}