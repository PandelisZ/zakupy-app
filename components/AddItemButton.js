import React from 'react';
import { Container, Fab, Icon } from 'native-base';
import vars from '../vars'

export default class AddItemButton extends React.Component{
    render(){
        const { onAddNewItem } = this.props;
        return(
            <Container>
                <Fab
                    style={{ backgroundColor: vars.yellowPrimary }}
                    position="bottomRight"
                    onPress={() => onAddNewItem(show = true) } >
                    <Icon name="add" />
                </Fab>
            </Container>
        );
    }
}
