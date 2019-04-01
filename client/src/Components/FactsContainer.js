
import React,{Component} from "react";
import Fact from "./Fact";
import LoadingFactsAnimation from "./LoadingFactsAnimation";

class FactsContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      facts: null,
      errorOnLoad: false
    };
  }

  async fetchStory(storyNum){
    try{
      let response = await fetch(`/api/story/${storyNum}`);
      if(response.status !== 200){
        throw new Error(`${response.status} ${response.statusText}`);
      }
      let responseData = await response.json();
      this.setState(() => {
        return { facts: responseData.data, errorOnLoad: false };
      });
    } catch (error){
      this.setState(() => {
        return {
          facts: null,
          errorOnLoad: true
        }
      });
      console.log("[ERROR]: ", error.message);
    }
  }

  componentDidMount(){
    this.fetchStory(this.props.match.params.id)
    .then(() => {})
    .catch((error) => {
      this.setState(() => {
        return {
          facts: null,
          errorOnLoad: true
        }
      });
      console.log("[ERROR]: ", error.message);
    });
  }
  render(){
    return (
      <div className="container">
        <div className="dataContainer">
          <div className="dataContainerHeading">
            <h3>FACTS</h3>
          </div>
          <div className="graphInfoContainer">
            { this.state.facts && this.state.facts.length > 0 ? (
              this.state.facts.map((eachFact, index) => {
                return <Fact fact={eachFact} key={index}/>
              })
            ) : (
              this.state.errorOnLoad ? (
                <LoadingFactsAnimation errorOnLoad={true} />
                ) : (
                <LoadingFactsAnimation />
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export { FactsContainer as default };


























