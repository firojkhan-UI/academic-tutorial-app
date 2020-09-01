import React from 'react';
import SpaStore from './stores/spaStore';
import Activity from './Images/activity.svg';
import Classflow from './Images/classflow.svg';

class DisplayView extends React.Component {
    constructor(props) {
        super()
        this.state = { data: [], openModal: false, modalData: "", currentId : "" }
    }

    componentDidMount() {
        const dt = SpaStore._getCurrentIndexData(this.props.currentLesson) || [];
        this.setState({ data: dt });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentLesson !== this.props.currentLesson) {
            const dt = SpaStore._getCurrentIndexData(this.props.currentLesson) || []
            this.setState({ data: dt, currentId: "" });
        }
    }

    onClick = index => {
        this.setState({
            currentId: index,
        });
    }


    returnThumbnail = () => {
        const { objectiveDetails = [] } = this.state.data;
        return (<React.Fragment>
            {objectiveDetails.map((el, index) => {
                const { objectiveVideosDetails = [] } = objectiveDetails.length && objectiveDetails[index];
                const { url = "" } = objectiveVideosDetails.length && objectiveVideosDetails[0];
                const id = url.split("/")[url.split("/").length - 2];
                let currentIndex = this.state.currentId || this.props.currentObjective;
                if (index !== currentIndex) {
                    return <div className="thumbnail" >
                        <iframe src={`https://player.vimeo.com/video/${id}?api=0&background=1&mute=0&loop=0&autoplay=0`} frameborder="0"/>
                        <div onClick={() => this.onClick(index)} class="overlay"></div>
                        </div>
                }
            })}
        </React.Fragment>
        )
    }

    onClickActivity = (type, data = {}) => {
        let modalData = {};
        if (type === "classflow") {
            modalData['heading'] = "Class flow";
            modalData['data'] = data.classFlow;
        } else {
            modalData['heading'] = "View activity";
            modalData['data'] = data.activities;

        }
        this.setState({
            openModal: !this.state.openModal,
            modalData
        })
    }

    render() {
        const { objectiveDetails = [] } = this.state.data;
        const { objectiveVideosDetails = [] } = objectiveDetails.length && objectiveDetails[this.state.currentId || this.props.currentObjective] || {};
        const { url = "" } = objectiveVideosDetails.length && objectiveVideosDetails[0];
        const id = url.split("/")[url.split("/").length - 2];
        return (
            <div className="display-view">
                <iframe id="video" title="vimeo-player" src={`https://player.vimeo.com/video/${id}`} frameborder="0" allowfullscreen></iframe>
                <div className="thumbnail-container">{this.returnThumbnail()}</div>
                <div className="activity">
                    <div>
                        <p className="icon" onClick={() => this.onClickActivity("activity", objectiveDetails[0])}>
                            <img alt="activity" src={Activity} />
                        </p>
                        <div onClick={() => this.onClickActivity("activity", objectiveDetails[0])}>view activity</div>
                    </div>
                    <div>
                        <p onClick={() => this.onClickActivity("classflow", objectiveDetails[0])} className="icon">
                            <img alt="classflow" src={Classflow} />
                        </p>
                        <div onClick={() => this.onClickActivity("classflow", objectiveDetails[0])}>view classflow</div>
                    </div>
                </div>
                {this.state.openModal && <div id="myModal" class="modal">
                    <div class="modal-content">
                        <div>
                            <h2>{this.state.modalData.heading}</h2>
                            <span onClick={this.onClickActivity} class="close">&times;</span>
                        </div>
                        <p>{this.state.modalData.data.length ? this.state.modalData.data : "Nothing to display"}</p>
                    </div>
                </div>}
            </div>
        )
    }
}

export default DisplayView;