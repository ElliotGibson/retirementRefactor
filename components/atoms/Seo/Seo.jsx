import Head from "next/head";
import PropTypes from 'prop-types';

import { defaultSeo } from "global/constants";

function Seo({...pageSeo}){
    let seo = {
        description: pageSeo?.description || defaultSeo.description,
        keywords: pageSeo?.keywords || defaultSeo.keywords,
        canonical: pageSeo?.canonical || defaultSeo.canonical,
        title: pageSeo?.title || defaultSeo.title,
        preventIndexing: pageSeo?.preventIndexing ?? defaultSeo.preventIndexing,
        favicon: pageSeo?.favicon || defaultSeo.favicon,
        shareImage: pageSeo?.shareImage || defaultSeo.shareImage
    }

    return <Head>
        <link rel="icon" href={seo.favicon}/>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} key="description" />
            <meta name="keywords" content={seo.keywords} />
            <meta name="twittercard" content="summary_large_image" key="twitter:card" />
            <meta property="og:url" content={seo.canonical} key="og:url" />
            <meta property="og:title" content={seo.title} key="og:title" />
            <meta property="og:description" content={seo.description} key="og:description" />
            <meta property="og:image" content={seo.shareImage} key="og:image" />
            <link rel="canonical" href={seo.canonical} />
            {
                seo.preventIndexing && (
                    <>
                        <meta name="robots" content="noindex" />
                        <meta name="googlebot" content="noindex" />
                    </>
                )
            }
    </Head>
}

Seo.propTypes = {
    description: PropTypes.string,
    keywords: PropTypes.string,
    canonical: PropTypes.string,
    title: PropTypes.string,
    preventIndexing: PropTypes.string,
    favicon: PropTypes.string,
    shareImage: PropTypes.string
}

export default Seo;