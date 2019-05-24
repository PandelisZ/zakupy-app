import React from 'react';
import { ListItem, Text, CheckBox, Body, Button, Icon } from 'native-base';
import { updateItem } from '../store/reducers/itemReducer';


export default class listItem extends React.Component {
  render() {

    const { item, deleteItem, updateItem } = this.props;

    return (
      <ListItem>
        <CheckBox
            checked = { item.completed }
            onPress = { () => updateItem({
              ...item,
              completed: !item.completed
            }) }
            />
        <Body>
            <Text>{ item.title }</Text>
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
