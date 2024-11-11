import path from 'path';
import fs from 'fs';

function buildPath() {
    return path.join(process.cwd(), 'data', 'data.json');
}

function extractData(filePath) {
    const jsonData = fs.readFileSync(filePath);
    return JSON.parse(jsonData)
}

export default function handler(req, res) {
    const { method } = req;

    const filePath = buildPath();

    const {events_categories, allEvents} = extractData(filePath);

    if (!allEvents) return res.status(404).json({
        message: 'Events data not found'
    })


    if (method === "POST") {
        const {email, eventId} = req.body;

        const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || !email.match(validRegex)) {
            res.status(422).json({message: "Invalid email address"})
        }

        // we add our code here
        const newAllEvents = allEvents.map(ev => {
            if (ev.id === eventId) {
                if (ev.emails_registered.includes(email)) {
                    res.status(409).json({
                        message: "this email has already been registered"
                    })
                }
                return {
                    ...ev, emails_registered: [...ev.emails_registered, email]
                }
            }
            return ev;
        })

        fs.writeFileSync(filePath, JSON.stringify({events_categories, allEvents: newAllEvents})) 
        
        res.status(200).json({message: `You have been registered successfully with the email: ${email} for the event: ${eventId}`})
    }


}