import Link from "next/link";
import Image from "next/image";

const EventsPage = ({ data }) => {
  return (
    <div className="events-page">
      {data.map((event) => (
        <Link className="card" key={event.id} href={`/events/${event.id}`}>
          <div>
            <Image
              src={event.image}
              alt={event.title}
              width={600}
              height={400}
            />
          </div>
          <h2>{event.title}</h2>
        </Link>
      ))}
    </div>
  );
};
export default EventsPage;
