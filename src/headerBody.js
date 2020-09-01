import React, { Component } from 'react';
import { _getSpaAction } from './actions/spaAction';
import SpaStore from './stores/spaStore';
import Avatar from "./Images/man.svg";

class HeaderBody extends Component {
    constructor(props) {
        super()
        this.state = { data: [] }
    }
    componentDidMount() {
        SpaStore.on('change', this._getSpaDataChange);
        _getSpaAction();
    }
    _getSpaDataChange = type => {
        if (type === 'spaData') {
            const dt = SpaStore._getSpaData(type) || [];
            this.setState({ data: dt });
        }
        if (type === "statusChanged") {
            const dt = SpaStore._getSpaData("spaData") || [];
            this.setState({ data: dt });
        }
    }

    _getLessonData = () => {
        return (<React.Fragment>
            {this.state.data.map((item, i) => {
                return <span className={`page-icon ${this.props.currentIndex === i ? "active" : ""} ${item.status === "complete" ? "p-i-completed" : ""}`} onClick={() => this.props.onLessonClick(i)}>{i + 1}</span>
            })}
        </React.Fragment>
        )
    }
    render() {
        return (
            <header>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="icon"><img alt="avatar" src={Avatar}/></div>
                    <div style={{ textAlign: 'center' }}>
                        <h1> Lavender's Blue</h1>
                        <div style={{ display: "inline-flex", alignItems: "center" }}>
                            <h2 style={{ marginRight: "30px" }}>Lessons</h2>
                            {this._getLessonData()}
                        </div>
                    </div>
                    <div style={{ textAlign: "end" }}>
                        <h2 style={{ marginBottom: '30px', color: "#a702a6" }}>Guitar</h2>
                        <button>Exit Session</button>
                    </div>

                </div>
            </header>)
    }
}
export default HeaderBody;
