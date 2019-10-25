import React, { Component } from 'react'

class MeetingList extends Component {
    render() {
        const { meetings } = this.props;

        const myMeetings = meetings.map(item => {
            return (
                <div className="list-group-item d-flex" key={item.meetingID}>
                    <section className="pl-3 text-left align-self-center">
                        {item.meetingName}
                    </section>
                </div >
            );
        });

        console.log(myMeetings);

        return <div>{myMeetings}</div>
    }

}

export default MeetingList; 
