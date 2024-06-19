import React from 'react'
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import Footer from '../../common/Footer'
import { CiSearch } from "react-icons/ci";


 const AdminDashboard = () => {
    return (
        <>

            <div className='container-fluid'>
                <div className='dashboard-wrapper'>
                    <Sidebar />
                    <div className='main-content'>
                        <Header />
                        <div className='p-5'>
                            <div className='d-flex justify-content-between py-3 w-75'>
                                <h4 className='text-capitalize text-dark fw-bolder'>
                                    Welcome
                                </h4>
                                <div class=" mb-3 d-flex" role="search">
                                    <span class="input-group-text" id="basic-addon1"><CiSearch className=' m-1 fs-3' /></span>
                                    <input type="search" class="form-control" placeholder="Search Mockups Logos.." aria-label="Username" aria-describedby="basic-addon1"/>
                                    <button class="btn ms-3 btn-primary text-white" type="submit">Search</button>
                                </div>

                            </div>

                            <div className='container'>
                                <div className='my-5'>
                                    <div className="row justify-content-around">
                                        <div className="col-md-3">
                                            <div className='bg-info text-white p-3 rounded-4 mb-4'>
                                                <p>
                                                    Orders
                                                </p>
                                                <p className='display-5 fw-semibold'>
                                                 20
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className='bg-primary text-white p-3 rounded-4 mb-4'>
                                                <p>
                                                   Cart
                                                </p>
                                                <p className='display-5 fw-semibold'>
                                                    3 items
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className='bg-warning text-white p-3 rounded-4 mb-4'>
                                                <p>
                                                    Account Status
                                                </p>
                                                <p className='display-5 fw-semibold'>
                                                    Active
                                                </p>
                                                
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className='bg-danger text-white p-3 rounded-4 mb-4'>
                                                <p>
                                                    Verified
                                                </p>
                                                <p className='display-5 fw-semibold'>
                                                    Yes
                                                </p>
                                                <p>
                                                  
                                                </p>
                                            </div>
                                        </div>


                                    </div>



                                </div>
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AdminDashboard;