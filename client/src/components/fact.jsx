import React from 'react';
import fact from './fact.css';
import Axios from 'axios';

class Facts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            question1 : '',
            answer1: '',
            question2 : '',
            answer2: '',
            question3 : '',
            answer3: ''
        }
    }
    componentDidMount(){
        Axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
        .then((data) => {this.setState({question1: data.data.results[0].question})
                          this.setState({answer1: data.data.results[0].correct_answer})
                          this.setState({question2: data.data.results[1].question})
                          this.setState({answer2: data.data.results[1].correct_answer})
                          this.setState({question3: data.data.results[2].question})
                          this.setState({answer3: data.data.results[2].correct_answer})
                        })  
        .catch((err) => {console.log(err)});
    }

    render(){
        return(
        <div className={fact.factStyle} > 
          <div className={fact.headerDiv}>
          <h3 className={fact.factHeader}>Did You Know?</h3>
          </div>
          <div > 
            <span className={fact.trivia}>Question: {this.state.question1}</span>
          </div>
          <div> 
            <span className={fact.trivia}>Answer: {this.state.answer1}</span>
          </div>
          <div > 
            <span className={fact.trivia}>Question: {this.state.question2}</span>
          </div>
          <div> 
            <span className={fact.trivia}>Answer: {this.state.answer2}</span>
          </div>
          <div > 
            <span className={fact.trivia}>Question: {this.state.question3}</span>
          </div>
          <div> 
            <span className={fact.trivia}>Answer: {this.state.answer3}</span>
          </div>
        </div>
        )
    }
}

export default Facts;