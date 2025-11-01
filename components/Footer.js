// Globals
import React from "react";
import Image from 'next/image';

// Components
import { smallTextClasses } from '../classes/Text';
import { horizontalPadding } from '../classes/Spacing';

// SVGs
import { ReactComponent as FacebookIcon } from '../public/images/icons/social/facebook.svg';
import { ReactComponent as WhatsappIcon } from '../public/images/icons/social/whatsapp.svg';
import { ReactComponent as InstagramIcon } from '../public/images/icons/social/instagram.svg';
import { ReactComponent as YoutubeIcon } from '../public/images/icons/social/youtube.svg';
import { ReactComponent as Dots } from '../public/images/misc/dots.svg';
import { ReactComponent as Circle } from '../public/images/misc/circle.svg';

// Styles
import FooterStyles from './Footer.module.css';

export default function Footer({ footerTheme, footerDecorations}) {
  return (
    <footer className={`
      ${horizontalPadding} py-4 sm:py-8 lg:py-16
      ${footerTheme === 'light' ? 'bg-white' : `bg-no-repeat bg-cover ${FooterStyles.DarkFooter}`}
    `}>
      <section className="container mx-auto flex flex-col sm:flex-row sm:items-center relative">
        {footerDecorations &&
          <React.Fragment>
            <Dots className="hidden lg:block absolute left-0 -top-28 text-gray-400 fill-current z-10 transform rotate-90" />
            <Circle className="hidden lg:block absolute right-0 -top-20 text-red-200 fill-current z-10" />
          </React.Fragment>
        }
        <div className={`${footerTheme === 'light' ? 'text-gray-500' : 'text-gray-300'} flex-1 ${smallTextClasses}`}>
          <p>
            Copyright &copy; {new Date().getFullYear()} Isolant Aislantes S.A. Designed &amp; Developed by 
            <a
              href="https://juangarcia.design"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 underline hover:no-underline"
            >
                JMG
            </a>.
          </p>
          <p className="my-1">
            Calle del Canal Esquina Calle 7. Parque Industrial Pilar, Pcia. de Buenos Aires, Argentina | 0810-44-ISOLANT (4765268) | <a href="mailto:isolant@isolant.com.ar" className="hover:opacity-90">isolant@isolant.com.ar</a>
          </p>
          <div className="flex items-center">
            Seguinos:
            <ol className="flex ml-2">
              <li className="mr-1">
                <a
                  href="https://www.facebook.com/Isolant.Aislantes/?fref=ts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookIcon
                    className={`fill-current ${footerTheme === 'light' ? 'text-gray-500' : 'text-gray-300'} hover:text-gray-700`}
                  />
                </a>
              </li>
              <li className="mr-1">
                <a
                  href="https://www.instagram.com/isolant.aislantes/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon
                    className={`fill-current ${footerTheme === 'light' ? 'text-gray-500' : 'text-gray-300'} hover:text-gray-700`}
                  />
                </a>
              </li>
              <li className="mr-1">
                <a
                  href="https://www.youtube.com/channel/UCrYVrCoJOaHIxyim1-SHvtw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YoutubeIcon
                    className={`fill-current ${footerTheme === 'light' ? 'text-gray-500' : 'text-gray-300'} hover:text-gray-700`}
                  />
                </a>
              </li>
              <li className="mr-1">
                <a
                  href="https://wa.me/5491124930555"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappIcon
                    className={`fill-current ${footerTheme === 'light' ? 'text-gray-500' : 'text-gray-300'} hover:text-gray-700`}
                  />
                </a>
              </li>
            </ol>
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <a
            href="https://servicios1.afip.gov.ar/clavefiscal/qr/response.aspx?qr=97fB6CLw_Ad2yzL3ul6Lrw,,"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <Image
              src="/images/globals/isolant-aislantes-data-fiscal.webp"
              alt="Data Fiscal de Isolant Aislantes"
              layout="intrinsic"
              width={45}
              height={62}
            />
          </a>
        </div>
      </section>
                
                
      <a
            href="https://wa.me/5491124930555?text=Hola!%20Quisiera%20hacer%20una%20consulta%20🙂"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 z-50 shadow-xl transition-transform transform hover:scale-110"
            aria-label="Contactar por WhatsApp"
      >
            <Image
              src="/images/icons/Whatsapp-Download-Free-PNG.png"
              alt="WhatsApp"
              width={60}
              height={60}
              className="object-contain"
            />
      </a>



    </footer>
  )
}
