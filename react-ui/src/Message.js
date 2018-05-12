import React from 'react';

class Message extends React.Component {

	render() {
		const { user, chat } = this.props;
		console.log(chat);
		return (
			<li className={`chat ${user === chat.username ? "right" : "left"}`}>
		        {user !== chat.username
		            && <img src={chat.img} alt={`${chat.username}'s profile pic`} />
		        }
		        <p>{chat.content}</p>
	    	</li>
    	);
	}
}

export default Message;