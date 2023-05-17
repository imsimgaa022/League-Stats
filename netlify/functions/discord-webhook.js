import axios from 'axios';

export async function handler(event, context) {
  const { commitId, commitMessage, branch } = JSON.parse(event.body);

  // Customize the message content
  const message = `New deployment on branch ${branch}\nCommit ID: ${commitId}\nCommit Message: ${commitMessage}`;

  try {
    // Send a POST request to the Discord webhook URL
    await axios.post("https://discordapp.com/api/webhooks/1108403114144436234/De4boyqEmarsQ8qQJyXrt0jmpF--guZeANbdmbjNcFFRkl9MdDt_wJQpbAlh7qHi7nuG", { content: message });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending Discord message:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send Discord message' }),
    };
  }
}
