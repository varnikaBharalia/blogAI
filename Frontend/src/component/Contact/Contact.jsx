import Button from "./Button/Button";
import { MdOutlineMessage } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { useState } from "react";
import './Contect.css'; 
const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, message });
    // You can trigger toast or API call here
  };

  return (
    <div className="Content_form">
      <div>
        <div className="form_btns">
          <Button
            text="VAI SUPPORT CHAT"
            icon={<MdOutlineMessage fontSize="1rem" />}
          />
          <Button
            text="VAI CALL"
            icon={<IoCallOutline fontSize="1rem" />}
          />
        </div>

        <Button
          is_outline={true}
          text="VAI EMAIL FORM"
          icon={<MdOutlineMessage fontSize="1.3rem" />}
        />

        <form onSubmit={onSubmit}>
          <div className="form_control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form_control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form_control">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={10}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button text="SUBMIT" />
          </div>
        </form>
      </div>

      <div>
        <img src="image/social.svg" alt="social" />
      </div>
    </div>
  );
};

export default Contact;
