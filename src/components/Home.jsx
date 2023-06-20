import React from 'react'

function Home() {
  return (
    <div className="container px-4">

      <div className="row" style={{marginTop: 100}}>
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
            <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Small</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
          </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Home