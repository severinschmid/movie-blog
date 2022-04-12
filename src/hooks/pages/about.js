import { CONFIG } from '../../config';
export default function About() {
  return (
    <div>
      <div className="paragraph__about">
        Welcome to version 2.0 of this blog! I made this website first and foremost to have a little project. And I like movies, so this is where the
        idea for this blog came from. And I sometimes get asked for movie recommendations, in the future I can just refer them here.
        <br />
        You can follow me on letterboxd @ssevi or send me an&nbsp;
        <a className="link__default" href={`mailto:${CONFIG.email}`}>
          email
        </a>
        , be it feedback on the website or on the movie choices. If you know me personally, feel free to text me if you have seen any of the movies on
        here, I would love to talk about it. If you cannot find any of the movies on the platform I listed them on I am sorry, but try to find them
        somewhere else if you can!
      </div>
      <div className="impressum">
        <a className="link__default" href="/Impressum.html">
          Impressum
        </a>
      </div>
    </div>
  );
}
