import React from 'react';
import { ListItem, Text, CheckBox, Body, Button, Icon } from 'native-base';
import { updateItem } from '../store/reducers/itemReducer';


export default class listItem extends React.Component {
  render() {

    const { item, deleteItem, updateItem } = this.props;

    return (
      <ListItem>
        <CheckBox
            checked = { item.status === 'done' }
            onPress = { () => updateItem({
              ...item,
              status: item.status === 'done' ? 'empty' : 'done'
            }) }
            />
        <Body>
            <Text>{ item.name }</Text>
        </Body>
        <Button
            transparent
            onPress = { () => deleteItem( item ) }
        >
            <Icon name = { 'trash' } />
        </Button>
      </ListItem>
    );
  }
}
