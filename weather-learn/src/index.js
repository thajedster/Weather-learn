import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import "semantic-ui-css/semantic.min.css";
import Loader from './Loader';

class App extends React.Component {
    //same with this.state inside constructor
    state = { lat: null, errorMessage: ''};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({lat: position.coords.latitude}),
            (err) => this.setState({errorMessage: err.message})
        );
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat = {this.state.lat} />
        }

        return <Loader message="Please accept location request"/>;
    }

    render() {
        return(
            <div className="border solid red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector("#root")
);