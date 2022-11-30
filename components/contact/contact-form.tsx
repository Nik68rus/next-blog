import { useState, useContext } from 'react';
import { isEmail } from '../../helpers/validator';
import NotificationContext from '../../store/notification-context';
import { IMessageBody } from '../../types';
import classes from './contact-form.module.css';

type Props = {};

function ContactForm({}: Props) {
  const notificationCtx = useContext(NotificationContext);

  const { showNotification } = notificationCtx;

  const [formData, setFormData] = useState<IMessageBody>({
    email: '',
    name: '',
    message: '',
  });

  const fieldChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, name, message } = formData;

    // if (!isEmail(email) || name.trim() === '' || message.trim() === '') {
    //   showNotification({
    //     title: 'Failed',
    //     message: 'Wrong input!',
    //     status: 'error',
    //   });
    //   return;
    // }

    showNotification({
      title: 'Loading',
      message: 'Wait please!',
      status: 'pending',
    });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        showNotification({
          title: 'Failed',
          message: data.message || 'Something went wrong!',
          status: 'error',
        });
      } else {
        showNotification({
          title: 'Success',
          message: 'Message added succesfully!',
          status: 'success',
        });
      }
    } catch (err) {
      let msg;
      if (typeof err === 'string') {
        msg = err;
      } else if (err instanceof Error) {
        msg = err.message; // works, `e` narrowed to Error
      }
      showNotification({
        title: 'Failed',
        message: msg || 'Data adding failed! Try again later!',
        status: 'error',
      });
    }
  };

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData['email']}
              required
              onChange={fieldChangeHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData['name']}
              // required
              onChange={fieldChangeHandler}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your message</label>
          <textarea
            id="message"
            name="message"
            value={formData['message']}
            rows={5}
            onChange={fieldChangeHandler}
            required
          />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
