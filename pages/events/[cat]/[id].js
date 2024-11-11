import SingleEvent from '@/src/components/events/single-event';
import Image from 'next/image';

const EventPage = ({data}) => <SingleEvent data={data} />

export default EventPage;

export async function getStaticPaths() {
    const data = await import('/data/data.json')
    const {allEvents} = data;
    const allPaths = allEvents.map(path => {
        return {
            params: {
                cat: path.city,
                id: path.id,
            }
        }
    })
    return {
        paths: allPaths,
        fallback: false 
    }
}

export async function getStaticProps(context) {
    const {allEvents} = await import('/data/data.json');
    const {id} = context?.params;
    const eventData = allEvents.find(event => (event.id === id))
    return {
        props: {
            data: eventData,
        }
    }
}