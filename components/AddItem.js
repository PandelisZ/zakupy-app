import React from 'react';
import { Body,  Icon, CheckBox, ListItem } from 'native-base';
import { Input, Button } from 'native-base';

export default class AddItem extends React.Component{
    constructor(props) {
        super(props);
        const name = "";
        const status = 'empty';
        const createdAt = "";

        this.state = {
            name,
            status,
            createdAt,
        };
    }

    setStateUtil = (property, value) => {
        this.setState({
            [property]: value,
        });
    }

    render(){
        const { status, title } = this.state;
        const { onPress, onCancel } = this.props;
        return(
            <ListItem>
                <CheckBox
                    checked = { status === 'checked' }
                    onPress = { () => this.setStateUtil("status", status === 'checked' ? 'empty' : 'checked') }
                 />
                <Body>
                    <Input placeholder = "What do you need to buy?"
                        onChangeText = { (txt) => this.setStateUtil("name", txt) }
                        onSubmitEditing = { () => onPress( this.state ) }
                    />
                </Body>
                <Button
                    transparent
                    onPress = { () => onCancel( show = false ) }
                >
                    <Icon name = { 'trash' } />
                </Button>
            </ListItem>
        );
    }
}
