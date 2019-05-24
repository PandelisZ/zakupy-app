import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import uuidv1 from 'uuid/v1'


import api from '../api'


import { connect } from 'react-redux';
import { addList } from '../store/reducers/listReducer';


class NewListScreen extends Component {

  static navigationOptions = {
    title: 'Welcome',
  };

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

  async createList() {
    const { listName } = this.state
    if (listName) {

      const listResponse = await api.list.create({
        name: listName,
        _id: uuidv1()
      })
      await this.props.addList(listResponse.data.data)

      await this.props.navigation.push('Item', {listName: listResponse.data.data.name, listId: listResponse.data.data._id})
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
  () => {
    return {}
  },
  mapDispatchToProps,
)(withNavigation(NewListScreen))
