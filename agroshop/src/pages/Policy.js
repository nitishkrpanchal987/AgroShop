import React from 'react'
import Layout from '../components/layout/Layout'
import pp from '../images/contactus.jpeg'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus mt-4 ms-4">
        <div className="col-md-6 ">
          <img
            src={pp}
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
        </div>
      </div>
    </Layout>
  )
}

export default Policy
