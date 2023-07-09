import React from 'react'
import styled from 'styled-components'

const About = () => {
  return (
    <Wrapper>
      <h3>About <span>Us</span></h3>
      <p>
      Introducing "NiftFlix," the ultimate movie companion app that leverages the captivating NiftFlix API. With a tap of your finger, you'll unlock a treasure trove of enchanting movies and TV shows that'll make your movie nights unforgettable and keep you entertained for hours on end. Explore a vast collection of cinematic wonders, from heartwarming romances to spine-tingling thrillers, hilarious comedies to thought-provoking dramas. Get ready to elevate your movie-watching experience, one captivating story at a time, and let the laughter, tears, and excitement flow! Choose NiftFlix, and let the magic of cinema come alive in the palm of your hand.
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
 span {
  color: var(--primary-500);
 }
 p {
  line-height: 2;
  color: var(--grey-500);
  margin-top: 2rem;
 }
`

export default About