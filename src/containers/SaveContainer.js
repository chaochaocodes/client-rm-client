import React, { Component } from 'react';
import IndexList from '../components/IndexList';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { api } from "../services/api";

const options = [
    10, 20, 30, 40, 50
  ]

class SaveContainer extends Component {
    
    state = {
        all_listings: [],
        select_amount: 10,
        start_index: 0
    }
    
    componentDidMount(){
        console.log("Save container mounted!", this.props)
        api.listings.getSavedListings(this.props.currentUser.id)
        .then(res => res.json())
        .then(res => {
          console.log(`---save container ${res}`)
          this.setState({all_listings: res})
        })
  }

    showMoreListings = () => {
      let add = parseInt(this.state.select_amount)
      let start = parseInt(this.state.start_index)
      const new_start = add + start
      this.setState({
        start_index: new_start
      })
      console.log(this.state)
  }

    showLessListings = () => {
        let minus = parseInt(this.state.select_amount)
        let start = parseInt(this.state.start_index)
        const new_start = start - minus
        if(new_start >= 0) {
            this.setState({
            start_index: new_start
            })
        }
        console.log(this.state)
    }

    getSelectListings = () => {
      return this.state.all_listings.slice(this.state.start_index, this.state.start_index+this.state.select_amount);
    }

    handleChange = (e) => {
      console.log("Selected num", e.target.value)
      this.setState({ select_amount: parseInt(e.target.value)})
    }

    render() {
      console.log("SaveContainerfires")
      console.log(this.state.all_listings)
        return ( 
          <div>
              <Grid container direction="column" justify="center" alignItems="center">
                <div> 
                <h3>Browse Your Saved Listings</h3>
                <select justify="right" value={null} className="form-control" onChange={this.handleChange}>
                    <option value={options[0]}>{options[0]}</option>
                    <option value={options[1]}>{options[1]}</option>
                    <option value={options[2]}>{options[2]}</option>
                    <option value={options[3]}>{options[3]}</option>
                    <option value={options[4]}>{options[4]}</option>
                </select>
                </div> 
                <IndexList 
                  container={"save container"} 
                  listings={this.getSelectListings()}
                  handleDelete={this.props.handleDelete}/>
              </Grid>
              <Grid container direction="row" justify="center" alignItems="center">
                <Button variant="contained" color="primary" onClick={() => this.showLessListings()}> {`<<`} </Button> &nbsp;
                 {this.state.start_index} - {parseInt(this.state.start_index+this.state.select_amount)} &nbsp; 
                <Button variant="contained" color="primary" onClick={() => this.showMoreListings()}> >> </Button>
              </Grid>
          </div>
        );
    }
}

export default SaveContainer;