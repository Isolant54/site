import React, { useEffect } from 'react';
import slugify from 'react-slugify';

import Base from "../components/Base";

import Hero from "../components/Home/Hero";
import HighlightedProducts from "../components/Home/HighlightedProducts";
import Categories from "../components/Home/Categories";
import ProductLines from "../components/Home/ProductLines";
import TechnicalService from "../components/Home/TechnicalService";
import CardSlider from "../components/Home/CardSlider";
import InstagramSlider from '../components/Home/InstagramSlider';

import { getAllCollections, getCollectionById } from "../lib/collections";

import { attributes } from "../content/homepage.md";

import { fullBleedContainer } from '../classes/Layout';

export default function Homepage({ highlightedProductsData, categoriesData, productLinesData, productSelectorTypesData }) {
  let {
    pageTitle,
    sliderEnabled,
    heroSlider,
    highlightedProductsEnabled,
    categoriesEnabled,
    categoriesTitle,
    productLinesEnabled,
    productLinesTitle,
    productLinesCtaText,
    productLinesCtaLink,
    technicalServiceEnabled,
    technicalServiceTitle,
    technicalServiceText,
    technicalServiceLinkText,
    technicalServiceLinkHref,
    services,
    otherServicesEnabled,
    otherServicesTitle,
    otherServicesSlider,
    contactFormEnabled,
    instagramSlider
  } = attributes;

  useEffect(() => {
    const formScript = document.createElement('script')
    formScript.setAttribute('data-b24-form', 'inline/4/z6c8i0')
    formScript.setAttribute('data-skip-moving', 'true')
    formScript.innerHTML = `(function(w,d,u){
      var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);
      var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
      })(window,document,'https://cdn.bitrix24.es/b26232869/crm/form/loader_4.js')`;
    
    const position = document.querySelector('.bitrix-form-container');
    position.appendChild(formScript);
  }, [])

  return (
    <Base
      pageTitle={pageTitle}
      footerTheme="dark"
      footerDecorations={false}
      productLines={productLinesData}
    >
      {sliderEnabled &&
        <Hero
          slider={heroSlider}
        />
      }
      {highlightedProductsEnabled &&
        <HighlightedProducts
          products={highlightedProductsData}
        />
      }
      {categoriesEnabled &&
        <Categories
          title={categoriesTitle}
          categories={categoriesData}
        />
      }
      {productLinesEnabled &&
        <ProductLines
          title={productLinesTitle}
          productLines={productLinesData}
          ctaText={productLinesCtaText}
          ctaLink={productLinesCtaLink}
        />
      }
      {technicalServiceEnabled &&
        <TechnicalService
          title={technicalServiceTitle}
          text={technicalServiceText}
          linkText={technicalServiceLinkText}
          linkHref={technicalServiceLinkHref}
          services={services}
        />
      }
      {otherServicesEnabled &&
        <CardSlider
          title={otherServicesTitle}
          services={otherServicesSlider}
        />
      }
      {contactFormEnabled &&
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
      }
    </Base>
  )
}

export async function getStaticProps() {
  const productSelectorTypesData = getAllCollections("productSelector/types");
  const productLinesData = getAllCollections("productLines");
  const categoriesData = getAllCollections("categories");
  const highlightedProductsData = attributes.highlightedProducts.map(product => getCollectionById("products", slugify(product)));

  return {
    props: {
      productLinesData,
      highlightedProductsData,
      categoriesData,
      productSelectorTypesData,
    },
  };
}
