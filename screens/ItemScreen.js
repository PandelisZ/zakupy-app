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
      debug: false
    };


    this.routeName = 'Item'


    this.props.navigation.setParams({
      title: this.listName
    })

    if (!this.props.currentList) {
      this.props.navigation.navigate({routeName: 'NewList'})
    }

    this.screenFilterTodos = this.screenFilterTodos.bind(this)
    this.componentWillFocus = this.componentWillFocus.bind(this)
    this.toggleDebugState = this.toggleDebugState.bind(this)
  }

  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent');
    this.subs.forEach(sub => sub.remove());
  }

  toggleDebugState() {
    this.setState({debug: !this.state.debug})
  }

  componentWillMount() {
    RNShake.addEventListener('ShakeEvent', this.toggleDebugState);

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

    if (payload) {
      this.routeName = payload.state.routeName
    } else {
      this.routeName = 'Item'
    }

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
     listId: this.props.currentList._id
    });
  }

  addNewItem = (show) => {
    this.setState({
      newItem: show
    });
  }

  screenFilterTodos = () => {
    let { items, currentList } = this.props;

    if (!currentList) {
      return []
    }

    if(items[currentList._id]) {
      items = items[currentList._id]
    } else {
      return []
    }

    console.log(this.routeName)

    if(this.routeName == 'Item'){
      return items.filter(function(item) {
        return item.status === 'empty';
      })
    }else if(this.routeName == 'Cart' ){
      return items.filter(function(item) {
        return item.status === 'done'
      })
    }else{
      return items;
    }
  }

  render() {
    const { newItem } = this.state;



    const {items, currentList, deleteItem, updateItem } = this.props;

    let ListItm = [];
    if(items && currentList && currentList._id && items[currentList._id] && items[currentList._id].length > 0){
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

              {this.state.debug && <Text style={{margin: 10, alignContent: "center"}}>{this.props.currentList._id}</Text>}
          </Content>


        <AddItemButton onAddNewItem={this.addNewItem} />
        </Container>
    );
  }
}

function mapStateToProps (state) {
  return {
      items: state.itemReducer,
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
