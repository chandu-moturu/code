// import { useTranslation } from "react-i18next";
import './home.css'
import video from './Hair Salon BROLL video shot on SONY A7siii.mp4'

export const Home = () => {
  // const { t } = useTranslation();

  return (
    <main className="home-main">
      <div className="home-container">
        {/* <h1>Home</h1> */}
        <video
          className="home-video"
          src={video}
          autoPlay
          muted
          loop
          controls={false}
          // type="video/mp4" 
        />
      </div>
      {/* <h1>{t('title')}</h1>
      <span>{t('label')} </span> */}
    </main>
  );
};
