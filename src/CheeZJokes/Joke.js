import React ,{Component} from 'react';

class Joke extends Component{
    constructor(props){
        super(props);
        this.handleUpVote = this.handleUpVote.bind(this);
        this.handleDownVote = this.handleDownVote.bind(this);
    }
    handleUpVote(){
        this.props.upVote(this.props.jokeItem.id);
    }
    handleDownVote(){
        this.props.downVote(this.props.jokeItem.id);
    }
    render(){
        const jokeItem = this.props.jokeItem;
        return(
            <li style={{marginLeft:0}}>
            <button onClick={this.handleUpVote}>up</button>
                {jokeItem.score }
            <button onClick={this.handleDownVote}>down</button>
                {jokeItem.joke}
             </li>
        )
    }
}

export default Joke;