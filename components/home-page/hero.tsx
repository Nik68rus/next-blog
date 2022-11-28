import Image from 'next/image';
import React from 'react';
import classes from './hero.module.css';

type Props = {};

function Hero({}: Props) {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/site/guy.jpg" alt="Nik" width={300} height={300} />
      </div>
      <h1>Hi, I&apos;m Nik</h1>
      <p>This is a blog created with NextJS framework</p>
    </section>
  );
}

export default Hero;
