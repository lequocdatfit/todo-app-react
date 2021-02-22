import React, { Component } from 'react';
import './TodoItem.css';
import checked from '../img/checked.svg';
import checkMark from '../img/check-mark.svg';


class TodoItem extends Component{
    render() {
        const { item, onClick } = this.props;
        let className = 'TodoItem';
        if(item.isComplete) {
            className+= ' TodoItem-complete';
        }

        let url = checkMark;
        if(item.isComplete) {
            url = checked;
        }
        return(
            <div className={className}>
                <img onClick={onClick} src={url} />
                <p>{this.props.item.title}</p>
            </div>
        );
    }
}

export default TodoItem;