// Globals
import React, { useEffect } from "react";

// Components
import Base from "../components/Base";
import Hero from "../components/Hero";
import InsetCallout from "../components/Layout/InsetCallout";
import ServiceCard from "../components/Cards/ServiceCard";
import PhilosophyVideo from "../components/Products/Video";
import Philosophy from "../components/AboutUs/Philosophy";
import TimelineSlider from "../components/AboutUs/TimelineSlider";
import OurProduct from "../components/AboutUs/OurProduct";
import Patents from "../components/AboutUs/Patents";
import TechnicalInformation from "../components/AboutUs/TechnicalInformation";
import Entrepreneurs from "../components/AboutUs/Entrepreneurs";
import Policies from "../components/AboutUs/Policies";
import Ethics from "../components/AboutUs/Ethics";
import InstagramSlider from "../components/Home/InstagramSlider";

// Library
import { getAllCollections, getCollectionById } from '../lib/collections';

// Content
import { attributes as aboutUsAttributes } from "../content/about-us.md";
import { attributes as homepageAttributes } from "../content/homepage.md";

// Classes
import { fullBleedContainer } from "../classes/Layout";

export default function AboutUs({ provincesData, localesData, productLinesData, productsData, downloadsData }) {
  let {
    pageTitle,
    heroVideoBackground,
    heroVideoImage,
    heroImageMobile,
    heroTitle,
    heroText,
    heroCtaLink,
    heroCtaText,
    missionVission,
    timelineTitle,
    timeline,
    productImage,
    productTitle,
    productText,
    aboutUsVideo,
    philosophyTitle,
    philosophy,
    patentBackgroundImage,
    patentImage,
    patentTitle,
    patentText,
    patentCtaText,
    patentCtaLink,
    technicalInformationImage,
    technicalInformationTitle,
    technicalInformationText,
    technicalInformationFormTitle,
    technicalInformationFormText,
    technicalInformationCtaText,
    technicalInformationCtaLink,
    entrepreneursImage,
    entrepreneursTitle,
    entrepreneursText,
    entrepreneursCtaText,
    entrepreneursCtaLink,
    policiesTitle,
    policies,
    ethicsImage,
    ethicsTitle,
    ethicsText
  } = aboutUsAttributes;

  const { instagramSlider } = homepageAttributes;

  const heroButton = [{
    link: heroCtaLink,
    text: heroCtaText,
    icon: true,
    color: 'transparent',
    isExternal: false,
  }];

  useEffect(() => {
    const container = document.querySelector('.bitrix-form-container');
    if (!container) return;

    container.innerHTML = '';

    const formScript = document.createElement('script');
    formScript.setAttribute('data-b24-form', 'inline/4/z6c8i0');
    formScript.setAttribute('data-skip-moving', 'true');
    formScript.innerHTML = `(function(w,d,u){
      var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);
      var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
    })(window,document,'https://cdn.bitrix24.es/b26232869/crm/form/loader_4.js')`;

    container.appendChild(formScript);
  }, []);

  return (
    <Base
      activePage="professionals"
      footerTheme="dark"
      pageTitle={pageTitle}
      provinces={provincesData.provinces}
      locales={localesData.locales}
      footerDecorations={true}
      productLines={productLinesData}
    >
      <Hero
        videoBackground={heroVideoBackground}
        imageBackground={heroVideoImage}
        imageBackgroundMobile={heroImageMobile}
        title={heroTitle}
        text={heroText}
        buttons={heroButton}
        showForm={false}
      />

      <section className="bg-gray-100">
        <InsetCallout
          decorations={true}
          gridClasses={`grid gap-8 grid-cols-1 sm:grid-cols-2`}
        >
          {missionVission.map((info, index) => 
            <li key={index}>
              <ServiceCard
                service={info}
                classes={`max-w-sm mx-auto`}
              />
            </li>
          )}
        </InsetCallout>

        <Philosophy
          title={philosophyTitle}
          philosophy={philosophy}
        />

        <PhilosophyVideo
          video={aboutUsVideo}
        />

        <TimelineSlider
          title={timelineTitle}
          timeline={timeline}
        />
      </section>

      <OurProduct
        image={productImage}
        title={productTitle}
        text={productText}
      />

      <Patents
        background={patentBackgroundImage}
        image={patentImage}
        title={patentTitle}
        text={patentText}
        ctaLink={patentCtaLink}
        ctaText={patentCtaText}
      />

      <TechnicalInformation
        image={technicalInformationImage}
        title={technicalInformationTitle}
        text={technicalInformationText}
        formTitle={technicalInformationFormTitle}
        formText={technicalInformationFormText}
        ctaText={technicalInformationCtaText}
        ctaLink={technicalInformationCtaLink}
        products={productsData}
      />

      <Entrepreneurs
        image={entrepreneursImage}
        title={entrepreneursTitle}
        text={entrepreneursText}
        ctaText={entrepreneursCtaText}
        ctaLink={entrepreneursCtaLink}
      />

      <Policies
        title={policiesTitle}
        policies={policies.map(policy => downloadsData.filter(download => download.title === policy))}
      />

      <Ethics
        image={ethicsImage}
        title={ethicsTitle}
        text={ethicsText}
      />

      <section
        className={`
          ${fullBleedContainer}
          relative grid lg:grid-cols-2
          bg-white
        `}
        id="contacto"
      >
        <div
          className="w-full h-96 md:h-screen order-last lg:order-none relative overflow-x-hidden"
        >
          <InstagramSlider
            slider={instagramSlider}
          />
        </div>

        <div
          className="relative flex flex-col justify-center items-center"
        >
          <div className="bitrix-form-container" />
        </div>
      </section>
    </Base>
  );
}

export async function getStaticProps() {
  const productsData = getAllCollections("products");
  const productLinesData = getAllCollections("productLines");
  const provincesData = getCollectionById("geolocalization", 'provinces');
  const localesData = getCollectionById("geolocalization", 'locales');
  const downloadsData = getAllCollections("downloads");

  return {
    props: {
      provincesData,
      localesData,
      productsData,
      productLinesData,
      downloadsData
    },
  };
}
