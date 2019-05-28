import React from 'react';
import { Container, Header, Title, Content, Body, Text, Icon, List } from 'native-base';
import AddItemButton from '../components/AddItemButton';
import AddItem from '../components/AddItem'
import RNShake from 'react-native-shake';

import ListItem from '../components/ListItem';
import { connect } from 'react-redux';
import { addItem, deleteItem, updateItem, getAllItemsForList } from '../store/reducers/itemReducer';
import listReducer from '../store/reducers/listReducer';


 class ItemsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const {state} = navigation;

    let title = 'Shopping List'

    if(state.params && state.params.title) {
      title = state.params.title
    }

    return {
      title: `${title}`,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      newItem: false,
      debug: true
    };



    this.props.navigation.setParams({
      title: this.listName
    })

    if (!this.props.currentList) {
      this.props.navigation.navigate({routeName: 'NewList'})
    }

    this.screenFilterTodos = this.screenFilterTodos.bind(this)
    this.componentWillFocus = this.componentWillFocus.bind(this)
  }

  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent');
    this.subs.forEach(sub => sub.remove());
  }

  componentWillMount() {
    RNShake.addEventListener('ShakeEvent', () => {
      this.setState({debug: true})
    });

    this.subs = [
      this.props.navigation.addListener('willFocus', (payload) => this.componentWillFocus(payload)),
    ];
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentList) {
      if (prevProps.currentList._id !== this.props.currentList._id) {
        this.componentWillFocus()
      }
    }
  }

  componentWillFocus(payload) {

    const {setParams} = this.props.navigation;

    if (this.props.currentList) {
      setParams({
        title: this.props.currentList.name
      })
    }

  }


  saveItemData = (item) => {
    this.addNewItem(show = false);
    this.props.addItem({
     ...item,
     listId: this.listId
    });
  }

  addNewItem = (show) => {
    this.setState({
      newItem: show
    });
  }

  screenFilterTodos = () => {
    let { screen, items } = this.props;

    items = items.filter((item) => {
      return item.listId == this.listId
    })

    if( screen == "All"){
      return items.filter(function(todo) {
        return !todo.completed;
      })
    }else if(screen == "Done" ){
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
    if(items && items.length > 0){
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

              {this.state.debug && <Text>{this.listId}</Text>}
          </Content>


        <AddItemButton onAddNewItem={this.addNewItem} />
        </Container>
    );
  }
}

function mapStateToProps (state) {
  return {
      items: state.itemReducer.items,
      currentList: state.listReducer.currentList
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
