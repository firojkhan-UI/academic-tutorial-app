import React from 'react';
import SpaStore from './stores/spaStore';

class SideBar extends React.Component {
    constructor(props) {
        super()
        this.state = { data: [] }
    }
    componentDidMount() {
        SpaStore.on('change', this._getSpaDataChange);
        const dt = SpaStore._getCurrentIndexData(this.props.index) || [];
        this.setState({ data: dt });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.index !== this.props.index) {
            const dt = SpaStore._getCurrentIndexData(this.props.index) || [];
            this.setState({ data: dt });
        }
    }

    _getSpaDataChange = type => {
        if (type === "statusChanged") {
            const dt = SpaStore._getCurrentIndexData(this.props.index) || [];
            this.setState({ data: dt });
        }
    }


    onIconClick = (type, objectiveIndex) => {
        SpaStore._setObjectiveStatus(this.props.index, objectiveIndex, type);
    }

    returnObjective = () => {
        const { objectiveDetails = [] } = this.state.data;
        return (<React.Fragment>
            {objectiveDetails.map((el, index) => {
                return (
                    <div className={`objective ${el.status}`}>
                        <div className="content-text-formate">Time Signature</div>
                        <p>{`${el.order}/${objectiveDetails.length} (${el.durationInMinutes} Mins)`}</p>
                        <div className="objective-icons">
                            <span onClick={() => this.onIconClick("done", index)} style={{ backgroundColor: "#09bb09" }}>
                                <i className="fa fa-check" ></i>
                            </span>
                            <span onClick={() => this.onIconClick("notDoing", index)} style={{ backgroundColor: "red" }}>
                                <i className="fa fa-close"></i>
                            </span>
                            <span onClick={() => this.onIconClick("nextClass", index)} style={{ backgroundColor: "#0095ff" }}>
                                <i className="fa fa-edit"></i>
                            </span>
                        </div>
                    </div>
                )
            })}
        </React.Fragment>)
    };

    returnVideosLink = () => {
        let arr = [];
        const { objectiveDetails = [] } = this.state.data;
        objectiveDetails.forEach((item, index) => {
            arr.push(
                <a onClick={() => { this.props.onVideoLinkClick(index) }} href="#">{`Video link ${index + 1}`}</a>
            )
        })
        return arr;
    }
    render() {
        return (
            <div className="menu-bar">
                <h2>Menu</h2>
                <hr></hr>
                <div style={{ overflow: "scroll", height: "calc(100% - 114px)", padding: "30px" }}>
                    {this.returnVideosLink()}
                    {this.returnObjective()}
                </div>
            </div>
        )
    }
}

export default SideBar;