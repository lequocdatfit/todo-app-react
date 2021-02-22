import './App.css';
import React, { Component } from 'react'
import TodoItem from './components/TodoItem';
import checkedAll from './img/checked-all.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      todoItems : JSON.parse(localStorage.getItem('TodoItem')) || []
    }
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onItemClick(item) {
    return (event) => {
      const { todoItems } = this.state;
      const isComplete = item.isComplete;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems : [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      }, function() {
        localStorage.setItem('TodoItem',  JSON.stringify(this.state.todoItems));
      });
    }
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      let text = event.target.value;
      const { todoItems } = this.state;
      text.trim();
      if(!text) {
        return;
      }
      this.setState({
        'todoItems' : [
          {
            title : text, isComplete: false,
          },
          ...todoItems,
        ],
        'newItem' : ''
      }, function() {
        localStorage.setItem('TodoItem',  JSON.stringify(this.state.todoItems));
      })
    }
  }

  onChange(event) {
    this.setState({
      newItem : event.target.value,
    })
  }

  render() {
    return (
      <div className="App">
        <h2>ToDo-App</h2>
        <div className="input-item">
          <img className="checkedAll" src={checkedAll} />
          <input 
            className="inputfield"
            placeholder="Add new item..." 
            value={this.state.newItem}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}/>
        </div>
        {
          this.state.todoItems.map((item, index) => 
            <TodoItem 
              key={index} 
              item={item} 
              onClick={this.onItemClick(item)} />)
        }
      </div>
    );
  }
}

export default App;
