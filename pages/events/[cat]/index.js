import CatEvent from "@/src/components/events/CatEvent";

const EventCatPage = ({data, pageName}) => <CatEvent data={data} pageName={pageName} />

export default EventCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import('/data/data.json');
  const allPaths = events_categories.map(event => ({params: {cat: event.id.toString()}}));
  
  return {
    paths: allPaths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { allEvents } = await import('/data/data.json');
  const id = context?.params.cat;
  const data = allEvents.filter(event => event.city === id);
  return {
    props: {data, pageName: id}
  }
}