import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import { uppercaseTextClasses, standardTextClasses, smallTextClasses } from "../../classes/Text";

import styles from './Filters.module.css';

export default function Filters({
  productLines,
  categories,
  subcategories,
  setActiveProducts,
  allProducts,
}) {
  const router = useRouter();
  const query = router.query;

  const [isExpanded, setIsExpanded] = useState({
    category: '',
    subcategory: ''
  });

  const getMatchedProductsByNames = (names = []) => {
    return names
      .map((name) => allProducts.find((product) => product.name === name))
      .filter(Boolean);
  };

  const getMatchedSubcategories = (names = []) => {
    return names
      .map((sub) => subcategories.find((subcat) => subcat.title === sub))
      .filter(Boolean);
  };

  const getAllProductsFromSubcategories = (arr = []) => {
    const matched = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] && Array.isArray(arr[i].matchedProducts)) {
        matched.push(arr[i].matchedProducts);
      }
    }

    return Array.from(new Set(matched.flat().filter(Boolean)));
  };

  const setActiveProductsAndCategory = (products, category) => {
    setActiveProducts(Array.isArray(products) ? products.filter(Boolean) : []);
    setIsExpanded(category);
  };
  
  useEffect(() => {
    if (query && query.categoria) {
      const selectedCategory = categories.filter(
        (category) =>
          category.id === query.categoria ||
          category.id === query.categoria.toLowerCase()
      );

      if (!selectedCategory.length) return;

      const matchedSubcategories = getMatchedSubcategories(selectedCategory[0].subcategories);

      matchedSubcategories.forEach((subcat) => {
        subcat.matchedProducts = getMatchedProductsByNames(subcat.products);
      });

      const totalProducts = getAllProductsFromSubcategories(matchedSubcategories);

      setActiveProductsAndCategory(totalProducts, {
        category: selectedCategory[0].title,
        subcategory: ''
      });
    } else if (query && query.linea) {
      const selectedProductLine = productLines.filter(
        (productLine) =>
          productLine.id === query.linea ||
          productLine.id === query.linea.toLowerCase()
      );

      if (!selectedProductLine.length) return;

      const matchedProducts = getMatchedProductsByNames(selectedProductLine[0].products);

      setActiveProductsAndCategory(matchedProducts, {
        category: selectedProductLine[0].title,
        subcategory: ''
      });
    } else {
      setActiveProductsAndCategory(allProducts, { category: '', subcategory: '' });
    }
  }, [query, categories, productLines, subcategories, allProducts]);

  return (
    <aside className="grid gap-4 md:gap-8 lg:col-span-3">
      {/* Product lines */}
      <div className="flex flex-col gap-3">
        <h3
          className={`${uppercaseTextClasses} font-semibold text-gray-800`}
        >
          Categor&iacute;as
        </h3>
        <ul className="flex flex-col gap-2">
          {productLines.sort((a, b) => a.order > b.order ? 1 : -1).map((productLine, index) => {
            const matchedProducts = getMatchedProductsByNames(productLine.products);

            return (
              <li
                key={index}
                className={`${standardTextClasses} ${isExpanded.category === productLine.title ? 'text-gray-800' : 'text-gray-500'}`}
              >
                <button
                  className="transition duration-100 ease-in-out hover:opacity-80 font-light text-left flex items-baseline"
                  onClick={() =>
                    setActiveProductsAndCategory(matchedProducts, {
                      category: productLine.title,
                      subcategory: ''
                    })
                  }
                >
                  {productLine.title} ({matchedProducts.length})
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-3">
        <h3
          className={`${uppercaseTextClasses} font-semibold text-gray-800`}
        >
          Usos
        </h3>
        <ul className="flex flex-col gap-2">
          {categories.sort((a, b) => a.order > b.order ? 1 : -1).map((category, index) => {
            const matchedSubcategories = getMatchedSubcategories(category.subcategories);

            matchedSubcategories.forEach((subcat) => {
              subcat.matchedProducts = getMatchedProductsByNames(subcat.products);
            });

            const totalProducts = getAllProductsFromSubcategories(matchedSubcategories);

            return (
              <li
                key={index}
                className={`${standardTextClasses} flex flex-col gap-2 items-start mb-2`}
              >
                <button
                  className={`${standardTextClasses} ${isExpanded.category === category.title ? "text-gray-800" : "text-gray-500"} flex items-center gap-2`}
                  onClick={() =>
                    setActiveProductsAndCategory(totalProducts, {
                      category: category.title,
                      subcategory: ''
                    })
                  }
                >
                  {category.title}{" "}
                  <span>({totalProducts.length})</span>
                  <svg
                    className={`fill-current transition ease-in-out duration-200 ${isExpanded.category === category.title ? 'rotate-180' : ''}`}
                    fill="none"
                    height="7"
                    viewBox="0 0 12 7"
                    width="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m11.611 1.47145-5.22268 5.0039c-.16406.13672-.32813.19141-.46485.19141-.16406 0-.32812-.05469-.46484-.16406l-5.249999-5.03125c-.2734374-.2461-.2734374-.683595-.027344-.929689.246094-.273438.683594-.273438.929683-.027344l4.8125 4.593753 4.78513-4.593753c.2461-.246094.6836-.246094.9297.027344.2461.246094.2461.683589-.0273.929689z" />
                  </svg>
                </button>
                <ol
                  className={`flex flex-col gap-2 pl-4 ${isExpanded.category === category.title ? '' : 'hidden'}`}
                >
                  {matchedSubcategories.map((subcategory, index) => {
                    return (
                      <li key={index}>
                        <button
                          className={`${smallTextClasses} ${styles.SubcategoryButton} transition duration-100 ease-in-out hover:opacity-80 text-left ${isExpanded.subcategory === subcategory.title ? 'text-gray-800' : 'text-gray-500'}`}
                          onClick={() =>
                            setActiveProductsAndCategory(subcategory.matchedProducts, {
                              category: category.title,
                              subcategory: subcategory.title
                            })
                          }
                        >
                          {subcategory.title}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ul>

        {/* Reset filters */}
        <div className="md:mt-4">
          <button
            className={`transition duration-100 ease-in-out hover:opacity-80 font-light text-left flex items-baseline text-gray-500 ${standardTextClasses}`}
            onClick={() => setActiveProductsAndCategory(allProducts, { category: '', subcategory: '' })}
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </aside>
  );
}
