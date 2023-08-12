import React from 'react'
import Layout from '../components/layout/Layout'
import au from '../images/about.jpeg'

const About = () => {
  return (
    <Layout title={"About us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={au}
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 mt-4 p-4">
          <p className="text-justify mt-4">
          The Ecommerce website "Name City Shop" is designed to serve the residents of a specific city or region by providing a convenient online platform for purchasing various products. The website aims to cater to customers of all age groups and demographics, offering a diverse range of products to meet their specific needs and preferences.

To ensure a seamless user experience, the website should have a user-friendly interface and visually appealing design. It should prioritize responsive design to ensure compatibility with different devices and screen sizes. Navigating through the website should be easy, allowing customers to browse and find products effortlessly.

The product catalog should be comprehensive, featuring a wide variety of items ranging from daily essentials to specialty products. Efficient categorization of products will enable customers to search and explore different categories easily. Each product should have a detailed description, pricing information, high-quality images, and customer reviews (if available) to assist customers in making informed decisions.

The website should incorporate a robust search functionality, allowing customers to find specific products quickly. Advanced filtering options such as price range, brand, popularity, and customer ratings will assist customers in refining their search results.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
