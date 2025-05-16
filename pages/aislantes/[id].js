import React from 'react';
import slugify from 'react-slugify';
import { useRouter } from 'next/router';

import Base from "../../components/Base";
import Hero from "../../components/Products/Hero";
import CustomHero from "../../components/Products/CustomHero";
import DetailCards from "../../components/Products/DetailCards";
import Details from "../../components/Products/Details";
import Attributes from "../../components/Products/Attributes";
import SubProducts from "../../components/Products/SubProducts";
import Map from "../../components/Products/Map";
import Benefits from "../../components/Products/Benefits";
import Video from "../../components/Products/Video";
import Instructions from "../../components/Products/Instructions";
import TechnicalInformation from "../../components/Products/TechnicalInformation";
import Recommendations from "../../components/Products/Recommendations";
import Downloads from "../../components/Products/Downloads";
import Tutorials from "../../components/Products/Tutorials";
import RelatedProducts from '../../components/Products/RelatedProducts';
import About from "../../components/Products/About";
import ContactForm from "../../components/Products/ContactForm";
import FullScreenSection from "../../components/Layout/FullScreenSection";

import { getCollectionIds, getCollectionById, getAllCollections } from '../../lib/collections';

import { ReactComponent as Dots } from '../../public/images/misc/dots.svg';
import { ReactComponent as Circle } from '../../public/images/misc/circle.svg';

export default function Product({ allProductsData, productData, instructionsData, localesData, provincesData, downloadsData, productLinesData, subProductsData }) {
  const { name, description } = productData;
  const { productImage, logo, ecommerceLink, color } = productData.globals;
  const router = useRouter();
  const isSiding = router.asPath.includes('siding');
  const isAtacama = router.asPath.includes('atacama');
  
  const ctaButtons = [
    {
      link: ecommerceLink || `/contacto?comprar=${productData.id}`,
      text: `Comprá ${name} Aquí`,
      icon: false,
      color: 'secondary',
      isExternal: true,
    }, {
      link: `/contacto`,
      text: 'Contactate con nosotros',
      icon: false,
      color: 'transparent',
      isExternal: false,
    }, {
      link: `/servicios/preguntas-frecuentes`,
      text: 'Preguntas Frecuentes',
      icon: false,
      color: 'none',
      isExternal: false,
    },
  ];
  const sloganContainer = productData.page?.filter(section => section.type === 'hero' ? section.slogan : '');

  return (
    <Base
      activePage="professionals"
      pageTitle={name}
      provinces={provincesData.provinces}
      locales={localesData.locales}
      footerDecorations={false}
      productLines={productLinesData}
    >
      {/* Loop through the sections and add the correct component */}
      {productData.page?.map((section, index) => {
        let markup = [];
        switch(section.type) {
          // Select which hero we'll render
          case 'hero':
            section.enableHero && section.heroType === 'custom' ? 
              markup.push (
                <CustomHero
                  images={section.heroImage}
                  product={name}
                  eyebrow={section.eyebrow}
                  slogan={section.slogan}
                  description={description}
                  logo={logo}
                  key={index}
                  color={color}
                  isSiding={isSiding}
                  ctaLink={section.ctaLink}
                  ctaText={section.ctaText}
                />
              )
            :
              markup.push (
                <Hero
                  images={section.heroImage}
                  product={name}
                  slogan={section.slogan}
                  benefits={section.mainBenefits}
                  key={index}
                />
              )
            break;
          // Details
          case 'details':
            section.enableDetailsSection === true &&
              markup.push (
                <Details
                  image={section.detailsImage}
                  title={name}
                  text={description}
                  logo={logo}
                  link={ecommerceLink || `/contacto?comprar=${productData.id}`}
                  functions={section.function}
                  applications={section.application}
                  presentations={section.presentation}
                  anchor="details"
                  key={index}
                />
              )
            break;
          // Detail cards
          case 'detailCards':
            section.enableDetailCardsSection === true &&
              markup.push (
                <DetailCards
                  cards={section.cards}
                  key={index}
                  background={isSiding && '/images/products/iso-siding/bg-light.jpg'}
                />
              )
            break;
          // Benefits
          case 'benefits':
            section.enableBenefitsSection === true &&
              markup.push (
                <Benefits
                  image={section.benefitsImage}
                  patent={section.patentImage}
                  subtitle={section.benefitsSubtitle}
                  title={section.benefitsTitle}
                  text={section.benefitsText}
                  logo={logo}
                  link={ecommerceLink || `/contacto?comprar=${productData.id}`}
                  benefits={section.benefitsList}
                  key={index}
                />
              )
            break;
          // Attributes
          case 'attributes':
            section.enableAttributesSection === true &&
              markup.push (
                <Attributes
                  title={section.attributesTitle}
                  text={section.attributesText}
                  attributes={section.attributes}
                  background={isSiding && '/images/products/iso-siding/bg-light.jpg'}
                  key={index}
                  color={color}
                  shouldExpand={true}
                />
              )
            break;
          // Video
          case 'video':
            section.enableVideoSection === true &&
              markup.push (
                <Video
                  video={section.video}
                  type={section.videoType}
                  title={section.videoTitle}
                  text={section.videoText}
                  classes="md:-bottom-12"
                  key={index}
                />
              )
            break;
          // Subproducts
          case 'subproducts':
            section.enableSubproductsSection === true &&
              markup.push (
                <SubProducts
                  products={subProductsData}
                  isSiding={isSiding}
                  color={color}
                  key={index}
                />
              )
            break;
          // Map
          case 'map':
            section.enableMapSection === true &&
              markup.push (
                <Map
                  key={index}
                  color={color}
                  product={productData.name}
                  logo={logo}
                >
                  {section.mapEmbed.code}
                </Map>
              )
            break;
          // Instructions
          case 'instructions':
            section.enableInstructions === true &&
              markup.push (
                <Instructions
                  product={name}
                  instructions={instructionsData}
                  pdf={productData.pdfInstruction && productData.pdfInstruction}
                  backgroundImage={isAtacama && '/images/products/atacama/bg-light.jpg'}
                  backgroundColor={isAtacama && '#C89956'}
                  key={index}
                />
              )
            break;
          // Technical Information
          case 'technicalInformation':
            section.enableTechnicalInformation === true &&
              markup.push (
                <TechnicalInformation
                  product={name}
                  productImage={productImage}
                  technicalInformation={section.technicalInformationList}
                  generalInformation={section.generalInformationList}
                  key={index}
                />
              )
            break;
          // Recommendations
          case 'recommendations':
            section.enableRecommendationsSection === true &&
              markup.push (
                <Recommendations
                  key={index}
                  shouldExpand={true}
                  recommendations={section.recommendations}
                  product={productData.name}
                  title={section.recommendationsTitle}
                />
              )
            break;
          // Downloads
          case 'downloads':
            section.enableDownloadsSection === true &&
              markup.push (
                <Downloads
                  title={section.downloadsTitle}
                  text={section.downloadsText}
                  downloads={downloadsData}
                  background={
                    productData.id === "atacama" ?
                      "/images/products/atacama/bg-dark.jpg"
                    :
                    productData.id === "iso-siding" ?
                      "/images/products/iso-siding/bg-dark.jpg"
                    : "/images/globals/isolant-aislantes-fondo-lineas-oscuras.jpg"
                  }
                  cardType="secondary"
                  key={index}
                  shouldExpand={false}
                />
              )
            break;
          // Related products
          case 'relatedProducts':
            section.enableRelatedProductsSection === true &&
              markup.push (
                <RelatedProducts
                  title={section.relatedProductsTitle}
                  products={section.relatedProducts.map(selectedProduct => allProductsData.filter(product => selectedProduct === product.name))}
                  textColor={productData.id === "atacama" ? "text-white" : "text-gray-800"}
                  key={index}
                  background={
                    productData.id === "atacama" ?
                      "/images/products/atacama/bg-dark.jpg"
                    :
                    productData.id === "iso-siding" ?
                      "/images/products/iso-siding/bg-dark.jpg"
                    : "/images/globals/isolant-aislantes-fondo-lineas-oscuras.jpg"
                  }
                />
              )
            break;
          // Tutorials
          case 'tutorials':
            section.enableTutorialsSection === true &&
              markup.push (
                <Tutorials
                  title={section.tutorialsTitle}
                  text={section.tutorialsText}
                  tutorials={section.tutorials}
                  key={index}
                  background={
                    productData.id === "atacama" ?
                      "/images/products/atacama/bg-light.jpg"
                    :
                    productData.id === "iso-siding" ?
                      "/images/products/iso-siding/bg-dark.jpg"
                    : "/images/globals/isolant-aislantes-fondo-lineas-oscuras.jpg"
                  }
                  color={color}
                />
              )
            break;
          // Colocation
          case 'colocation':
            section.enableColocationSection === true &&
              markup.push (
                <FullScreenSection
                  image={section.colocationImage}
                  title={section.colocationTitle}
                  titleUsesMarkdown={true}
                  key={index}
                  theme="dark"
                  height="full"
                  buttons={[{
                    link: section.colocationCtaLink,
                    text: section.colocationCtaText,
                    icon: false,
                    color: 'white',
                    isExternal: true,
                  }, {
                    link: section.technicalAssessorCtaLink,
                    text: section.technicalAssessorCtaText,
                    icon: false,
                    color: 'transparent',
                    isExternal: false,
                  }]}
                />
              )
            break;
          // CTA
          case 'cta':
            section.enableCtaSection === true &&
              markup.push (
                <FullScreenSection
                  image={section.ctaImage}
                  title={section.ctaTitle || sloganContainer.slogan}
                  titleUsesMarkdown={true}
                  backgroundPosition={section.ctaImageBackgroundPosition}
                  key={index}
                  theme="dark"
                  height="full"
                  classes="text-center"
                  layout="centered"
                  buttons={ctaButtons}
                >
                  <Dots className="hidden lg:block absolute left-4 xl:left-16 bottom-4 xl:-bottom-8 text-gray-100 fill-current z-10 transform rotate-90" />
                  <Circle className="hidden lg:block absolute right-4 xl:right-16 -bottom-8 text-red-200 fill-current z-10" />
                </FullScreenSection>
              )
            break;
          // About
          case 'about':
            section.enableAboutSection === true &&
              markup.push (
                <About
                  image={section.aboutImage}
                  title={section.aboutTitle}
                  text={section.aboutText}
                  key={index}
                  textClasses={productData.id === "atacama" ? "max-w-2xl" : "max-w-lg"}
                />
              )
            break;
          // Contact
          case 'contact':
            section.enableContactSection === true &&
              markup.push (
                <ContactForm
                  key={index}
                  background={
                    productData.id === "atacama" ?
                      "/images/products/atacama/bg-light.jpg"
                    :
                    productData.id === "iso-siding" ?
                      "/images/products/iso-siding/bg-dark.jpg"
                    : "/images/globals/isolant-aislantes-fondo-lineas-oscuras.jpg"
                  }
                  theme={section.theme}
                />
              )
            break;
          default:
            break;
        }

        return markup;
      })}
    </Base>
  )
}

export async function getStaticPaths() {
  const paths = getCollectionIds("products");

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const productData = getCollectionById("products", params.id);
  const downloadsSection = productData.page?.find(product => product.type === 'downloads') || null;
  const instructionsSection = productData.page?.find(product => product.type === 'instructions') || null;
  const subProductsSection = productData.page?.find(product => product.type === 'subproducts') || null;
  const instructionsData = instructionsSection && instructionsSection.instructions !== undefined ? instructionsSection.instructions.map(product => getCollectionById("instructions", slugify(product))): null;
  const subProductsData = subProductsSection && subProductsSection.subproducts !== undefined ? subProductsSection.subproducts.map(subproduct => getCollectionById("subproducts", slugify(subproduct))) : null;
  const downloadsData = downloadsSection && downloadsSection.downloads !== undefined && downloadsSection.downloads.map(download => getCollectionById("downloads", slugify(download)));
  const provincesData = getCollectionById("geolocalization", 'provinces');
  const localesData = getCollectionById("geolocalization", 'locales');
  const productLinesData = getAllCollections("productLines");
  const allProductsData = getAllCollections("products");

  return {
    props: {
      productData,
      subProductsData,
      instructionsData,
      provincesData,
      localesData,
      downloadsData,
      productLinesData,
      allProductsData,
    }
  }
}