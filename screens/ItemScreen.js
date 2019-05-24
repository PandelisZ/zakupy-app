import React from 'react';
import { Container, Header, Title, Content, Body, Text, Icon, List } from 'native-base';
import AddItemButton from '../components/AddItemButton';
import AddItem from '../components/AddItem'

import ListItem from '../components/ListItem';
import { connect } from 'react-redux';
import { addItem, deleteItem, updateItem } from '../store/reducers/itemReducer';


 class ItemsScreen extends React.Component {
  static navigationOptions = {
    title: 'Shopping List',
  }
  constructor(props) {
    super(props);
    this.state = {
      newItem: false,
    };
  }

  saveItemData = (item) => {
    this.addNewItem(show = false);
    this.props.addItem(item);
  }

  addNewItem = (show) => {
    this.setState({
      newItem: show
    });
  }

  screenFilterTodos = () => {
    const{ screen, items } = this.props;
    if( screen == "Active"){
      return items.filter(function(todo) {
        return !todo.completed;
      })
    }else if(screen == "Completed" ){
      return items.filter(function(todo) {
        return todo.completed;
      })
    }else{
      return items;
    }
  }

  render() {
    const { newItem } = this.state;

    const { items, showNewItem, screen, deleteItem, updateItem } = this.props;

    let ListItm = [];
    if(items.length > 0){
      let scrTodos = this.screenFilterTodos();
      ListItm = scrTodos.map( (item, index) =>
        <ListItem
          key={ index }
          item={ item }
          deleteItem={ deleteItem }
          updateItem={ updateItem }
          />
      );
    }

    return (
        <Container>

          <Content>
            {ListItm}

            {newItem &&
                  <AddItem
                    onPress={ this.saveItemData }
                    onCancel={ this.addNewItem }
                  />
                }
          </Content>


        <AddItemButton onAddNewItem={this.addNewItem} />
        </Container>
    );
  }
}

function mapStateToProps (state) {
  return {
      items: state.itemReducer.items
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addItem: (item) => dispatch(addItem(item)),
    deleteItem: (item) => dispatch(deleteItem(item)),
    updateItem: (item) => dispatch(updateItem(item)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemsScreen)
