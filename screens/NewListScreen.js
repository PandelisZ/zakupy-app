import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import uuidv1 from 'uuid/v1'


import api from '../api'


import { connect } from 'react-redux';
import { addList, resetList } from '../store/reducers/listReducer';
import { resetItems } from '../store/reducers/itemReducer';
import { View } from 'react-native';


class NewListScreen extends Component {

  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props)
    this.state = {
      listName: null,
      isDebug: false
    }

    this.createList = this.createList.bind(this)
    this.resetRedux = this.resetRedux.bind(this)
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

  resetRedux() {
    this.props.resetList()
    this.props.resetItems()
  }

  render() {
    return (
      <Container>
        <Content onPress={this.setDebug}>
          <Form>
            <Item fixedLabel>
              <Label>List Name</Label>
              <Input onChangeText={(listName) => {this.setState({ listName })}} />
            </Item>
          </Form>
          <Button block primary onPress={this.createList}>
            <Text>Create</Text>
          </Button>
          <View style={{paddingVertical: 20}} />
            <Button block danger onPress={this.resetRedux}>
              <Text>DEBUG: Delete cache</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}


function mapDispatchToProps (dispatch) {
  return {
    addList: (list) => dispatch(addList(list)),
    resetList: (list) => dispatch(resetList()),
    resetItems: (item) => dispatch(resetItems())
  }
}

export default connect(
  () => {
    return {}
  },
  mapDispatchToProps,
)(withNavigation(NewListScreen))
