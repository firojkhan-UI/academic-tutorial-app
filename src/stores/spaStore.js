import { EventEmitter } from 'events';
import dispatcher from '../dispatchers/dispatcher'

 class SpaStore extends EventEmitter {
    constructor() {
        super()
    }
    _getSpaData = type => {
        return this[type] || []
    }
    _getCurrentIndexData = index => {
        return this.spaData && this.spaData[index];
    }

    _returnLessonStatus = (data = {}) => {
        for (let index = 0; index < data.objectiveDetails.length; index++) {
            if (data.objectiveDetails[index]["status"] !== "done") {
                return "incomplete"
            }
        }
        return "complete";
    }

    _setObjectiveStatus = (lessonIndex, objectiveIndex, status) => {
        const data = {...this.spaData[lessonIndex]};
        data.objectiveDetails[objectiveIndex]["status"] = status;
        this.spaData[lessonIndex] = data;
        this.spaData[lessonIndex]["status"] = status !== "done" ? "incomplete" : this._returnLessonStatus(data);
        this.emit('change', "statusChanged");
    }

    _setSpaData = (data,type)=> {
        this[type] = data
        this.emit('change', type)
    }
    _handleAction = action => { 
        switch(action.type) {
            case 'spaData': {
                this._setSpaData(action.data, action.type)
            }
        }
    }
}
const spaStore = new SpaStore();
dispatcher.register(spaStore._handleAction.bind(spaStore));
export default spaStore;