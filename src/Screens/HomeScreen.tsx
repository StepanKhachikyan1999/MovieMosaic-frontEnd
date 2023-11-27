import React from 'react'
import Layout from "../Layout/Layout";
import Banner from "../components/Home/Banner";
import PopularMovies from "../components/Home/PopularMovies";
import Promos from "../components/Home/Promos";
import TopRated from "../components/Home/Toprated";

const HomeScreen = () => {
    return (
        <Layout>
            <div className=''>
                <Banner/>
                <PopularMovies/>
                <Promos/>
                <TopRated/>
            </div>
        </Layout>
    );
};

export default HomeScreen