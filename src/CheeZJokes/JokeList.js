import React ,{Component} from 'react';
import Joke from './Joke';
import axios from 'axios';
class JokeList extends Component{
    constructor(props){
        super(props);
        this.state={
            jokes:[],
            isLoading:true
        };
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
        this.handleAddingJokes = this.handleAddingJokes.bind(this);
    }
    renderJokeItem(){
        return this.state.jokes.map( jokeItem => (
           <Joke key={jokeItem.id} jokeItem={jokeItem} upVote={this.upVote} downVote={this.downVote}/>
        ));
    }
    async get10Jokes(){
        const s = new Set(this.state.jokes);
        let res;
        let currSize = s.size;
        while(s.size !== currSize + 10){
            res = await axios.get("https://icanhazdadjoke.com/",{
                headers:{ Accept: "application/json"}
            });
            s.add({joke:res.data.joke,score:0,id:res.data.id});
        }
        return s;
    }
    handleAddingJokes(){
        this.setState({
            isLoading:true
        });
        this.addJokes();
    }
    addJokes(){
        this.get10Jokes().then( jokes =>{
                let newJokes = [...jokes];
                newJokes.sort((a,b)=> b.score - a.score  );
                this.setState({
                    jokes: newJokes,
                    isLoading:false
                });
        } );
    }
    componentDidMount(){
        this.addJokes();
    }
    upVote(id){
        
        let jokes = this.state.jokes.map( jokeItem =>{
                if(jokeItem.id === id){
                    return {...jokeItem,score:jokeItem.score+1}
                }
                else
                    return jokeItem;
                } );
        jokes.sort((a,b)=> b.score - a.score  );        
        this.setState({
            jokes:jokes
        });
    }
    downVote(id){
        let jokes = this.state.jokes.map( jokeItem =>{
            if(jokeItem.id === id){
                return {...jokeItem,score:jokeItem.score-1}
            }
            else
                return jokeItem;
            } );
        jokes.sort((a,b)=> b.score - a.score  );        
        this.setState({
            jokes:jokes
        });
    }
    render(){
        return(
            <div>
                {
                    this.state.isLoading ?
                    <h1>Loading........</h1>
                    :
                    <div>
                        <h1>Dad Jokes</h1>
                        <div > {this.renderJokeItem()}</div>
                       
                        <button onClick={this.handleAddingJokes}>New Jokes</button>
                    </div>
                }
            </div>
            
        )
    }
}

export default JokeList;
