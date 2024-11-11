import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const SingleEvent = ({ data }) => {
    const inputEmail = useRef()
    const router = useRouter()
    const [message, setMessage] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailVal = inputEmail.current.value;
    const eventId = router?.query.id;

    const validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailVal.match(validRegex)) {
      setMessage('Please introduce a correct email address')
    }


    try {
        const res = await fetch('/api/email-registration', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: emailVal, eventId})
        });

        if (!res.ok) throw new Error(`Error: ${res.status}`)

        const data = await res.json();

        setMessage(data.message)

        console.log("post", data)

        inputEmail.current.value = '';

    } catch(e) {
        console.log('error', e);
    }

  };
  return (
    <div className="event-single-page">
      <h1>{data.title}</h1>
      <Image src={data.image} width={1000} height={500} alt={data.title} />
      <p>{data.description}</p>

      <form onSubmit={handleSubmit} className="email-registration">
        <label>Get registered for this event!</label>
        <input
        ref={inputEmail}
          type="email"
          id="email"
          placeholder="Please insert your email here"
        />
        <button type="submit">Submit</button>
      </form>
      { message && <p>{message}</p>}
    </div>
  );
};
export default SingleEvent;
