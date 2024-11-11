import Image from "next/image";
import Link from "next/link";

const CatEvent = ({data, pageName}) => {
  return (
    <div className="cat-events">
      <h1>Events in {pageName}</h1>

      <div className="content">
        {data.map((event) => (
          <Link className="card" href={`/events/${event.city}/${event.id}`} key={event.id}>
            <Image
              src={event.image}
              alt={event.title}
              width={300}
              height={200}
            />
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default CatEvent;
