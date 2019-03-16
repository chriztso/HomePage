import React from 'react';
import fact from './fact.css';

class Facts extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
        <div className={fact.factStyle} > 
          <div className={fact.headerDiv}>
          <h3 className={fact.factHeader}>Did You Know?</h3>
          </div>
        </div>
        )
    }
}

export default Facts;