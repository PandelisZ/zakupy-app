import React from 'react';
import { Container, Header, Title, Content, Body, Text, Icon } from 'native-base';
import AddItemButton from '../components/AddItemButton';
import AddItem from '../components/AddItem'

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'Shopping List',
  }
  constructor(props) {
    super(props);
    this.state = {
      newItem: false,
    };
  }

  saveItemData = (todo) => {
    this.addNewItem(show = false);
    console.log("Todo is: " + todo.title + " " + (todo.completed ? "completed!" : "not completed!"));
  }

  addNewItem = (show) => {
    this.setState({
      newItem: show
    });
  }

  render() {
    const { newItem } = this.state;
    return (
        <Container>

          <Content>
            {newItem &&
                  <AddItem
                    onPress = { this.saveItemData }
                    onCancel = { this.addNewItem }
                  />
                }
          </Content>


        <AddItemButton onAddNewItem={this.addNewItem} />
        </Container>
    );
  }
}
