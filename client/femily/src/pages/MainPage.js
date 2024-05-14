import React from "react";
import '../components/styles.css';
import main from '../components/assets/mainfoto.png';
import phone from '../components/assets/phone.svg';
import map from '../components/assets/map.svg';
import clock from "../components/assets/clock.svg";
import fone from '../components/assets/Component 29.png'
import Specialist from "../components/Specialist";
import Futter from "../components/Futter";

const Main = () => {
    return (
        <div className="main-container">
            <div className="container" style={{backgroundImage: `url(${fone})`}}>
                <div className="text-container">
                    <div className="title">САЛОН КРАСОТЫ FEMILY <br /> CHILL & BEAUTY</div>
                    <div className="mini_title">Уникальное beauty-пространство <br /> для милых девушек</div>
                </div>
                <div className="image-container">
                    <img src={main} style={{ width: '30vw' }} alt="Логотип" className="logo-image" />
                </div>
            </div>
            <div className="title_welcome">ДОБРО ПОЖАЛОВАТЬ</div>
            <div className="container_welcome">
                <div className="text-container_welcome">
                    <div className="content_welcome">
                        <p>FEMILY - это уютное место, в котором <br /> каждая девушка почувствует себя как дома и <br /> проведет время с удовольствием.</p>
                        <p>Наш салон работает с конца 2022 года, но <br /> уже успел зарекомендовать себя в своем сегменте.</p>
                    </div>
                </div>
            </div>
            <div className="title_specialist"> НАШИ СПЕЦИАЛИСТЫ</div>
            <div style={{ margin: '0 8vw' }}><Specialist /></div>
            <div className="title-kontakt">СВЯЗЬ С НАМИ</div>
            <div className="contact-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <img src={phone} style={{ width: '5vw' }} alt="Телефон" className="phone" />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1vw' }}>
                    <p style={{ margin: '0', fontFamily: 'Cormorant', fontSize:'1.5vw' }}>ТЕЛЕФОН</p>
                    <p style={{ margin: '0', fontFamily: 'Cormorant', fontSize: '1.2vw', textDecoration:'underline' }}>8 (930) 056-88-88</p>
                </div>
            </div>
            <div style={{marginRight: '7vw', marginLeft:'7vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <img src={map} style={{ width: '5vw' }} alt="Карта" className="map" />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1vw' }}>
                    <p style={{ margin: '0', fontFamily: 'Cormorant', fontSize:'1.5vw' }}>НИЖНИЙ НОВГОРОД</p>
                    <p style={{ margin: '0', fontFamily: 'Cormorant', fontSize: '1.2vw', textDecoration:'underline' }}>ул. Маршала Баграмяна, 4</p>
                </div>
            </div>
            <div style={{  display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={clock} style={{ width: '5vw' }} alt="Часы" className="clock" />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1vw' }}>
                    <p style={{ margin: '0',  fontFamily: 'Cormorant', fontSize:'1.5vw' }}>ВРЕМЯ РАБОТЫ</p>
                    <p style={{ margin: '0',  fontFamily: 'Cormorant', fontSize: '1.2vw', textDecoration:'underline' }}>Ежедневно с 09:00 до 21:00</p>
                </div>
            </div>
            </div>
            <div className="map-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2vw' }}>
            <div style={{ position: 'relative', overflow: 'hidden', border: '0.5vw solid #DFC19F', borderRadius: '0', width: '70vw', height: '25vw' }}>
                <a href="https://yandex.ru/maps/org/femily_chill_beauty/174476665238/?utm_medium=mapframe&utm_source=maps"> </a>
                <a href="https://yandex.ru/maps/47/nizhny-novgorod/category/beauty_salon/184105814/?utm_medium=mapframe&utm_source=maps"> </a>
                <a href="https://yandex.ru/maps/47/nizhny-novgorod/category/nail_salon/20476284572/?utm_medium=mapframe&utm_source=maps"> </a>
                <iframe src="https://yandex.ru/map-widget/v1/?ll=42.908050%2C56.323753&mode=search&oid=174476665238&ol=biz&sll=40.411881%2C56.219983&source=serp_navig&sspn=0.068321%2C0.020611&text=femily%20chill%20beauty&z=7" title="maps" style={{ width: "100%", height: "100%", position: 'relative' }}></iframe>
            </div>
        </div>
        <Futter />
        </div>
    );
}

export default Main;
