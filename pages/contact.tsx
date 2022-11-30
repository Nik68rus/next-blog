import Head from 'next/head';
import React from 'react';
import ContactForm from '../components/contact/contact-form';

type Props = {};

function ContactPage({}: Props) {
  return (
    <>
      <Head>
        <title>Next Blog - Contact form</title>
      </Head>
      <ContactForm />;
    </>
  );
}

export default ContactPage;
