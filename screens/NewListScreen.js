import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import Expo from 'expo';


import { connect } from 'react-redux';
import { addList } from '../store/reducers/listReducer';

class NewListScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listName: null
    }



    this.createList = this.createList.bind(this)
  }

  static navigationOptions = {
    title: 'New List',
  };

  createList() {
    const { listName } = this.state

    if (listName) {
      addList(listName)
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>List Name</Label>
              <Input onChangeText={(listName) => {this.setState({ listName })}} />
            </Item>
          </Form>
          <Button block primary onPress={this.createList}>
            <Text>Create</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


function mapDispatchToProps (dispatch) {
  return {
    addList: (list) => dispatch(addList(list))
  }
}

export default connect(
  undefined,
  mapDispatchToProps,
)(NewListScreen)
