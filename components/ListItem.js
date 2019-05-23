import React from 'react';
import { ListItem, Text, CheckBox, Body, Button, Icon } from 'native-base';
import { updateItem } from '../store/reducers/itemReducer';


export default class listItem extends React.Component {
  render() {

    const { list, deleteItem, updateList } = this.props;

    return (
      <ListItem>
        <CheckBox
            checked = { list.completed }
            onPress = { () => updateList({
              ...list,
              completed: !list.completed
            }) }
            />
        <Body>
            <Text>{ list.title }</Text>
        </Body>
        <Button
            transparent
            onPress = { () => deleteItem( list ) }
        >
            <Icon name = { 'trash' } />
        </Button>
      </ListItem>
    );
  }
}
