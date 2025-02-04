import React from 'react'
import Titles from '../Titles'
import { BsCollectionFill } from 'react-icons/bs'
import Movie from '../Movie'
import Loader from '../Notfications/Loader'
import { Empty } from '../Notfications/Empty'
import { useTranslation } from 'react-i18next'

function PopularMovies({isLoading, movies}: any) {
    const { t } = useTranslation()
    return (
        <div className="my-16">
            {/*<Titles title="Popular Movies" Icon={BsCollectionFill}/>*/}
            <Titles title={t('popularMovies')} Icon={BsCollectionFill}/>
            {isLoading ? (
                <Loader/>
            ) : movies?.length > 0 ? (
                <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                    {movies?.slice(0, 8).map((movie: any, index: any) => (
                        <Movie key={index} movie={movie}/>
                    ))}
                </div>
            ) : (
                <div className="mt-6">
                    <Empty message="It seem's like we dont have any movie"/>
                </div>
            )}
        </div>
    );
}

export default PopularMovies

// new
