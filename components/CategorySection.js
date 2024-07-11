import React from 'react';
// /bg-img/ourshop.png
import OverlayContainer from './OverlayContainer';
import LinkButton from './LinkButton';


function CategorySection() {
    return (
        <>
            {/* ===== Category Section ===== */}
            <section className="category_section container-sm mx-auto w-full h-auto py-10">
                <div className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="w-full sm:col-span-2 lg:col-span-2">
                        <OverlayContainer
                            imgSrc="/bg-img/banner_minipage1.jpg"
                            imgSrc2="/bg-img/banner_minipage1-tablet.jpg"
                            imgAlt="New Arrivals"
                        >
                            <LinkButton
                                href="/collection"
                                extraClass="absolute p-3 hover:bg-black hover:text-white z-20"
                            >
                                New arrivals
                            </LinkButton>
                        </OverlayContainer>
                    </div>
                    <div className="w-full">
                        <OverlayContainer
                            imgSrc="/bg-img/banner_minipage2.jpg"
                            imgAlt="Women Collection"
                        >
                            <LinkButton
                                href="/collection"
                                extraClass="absolute p-3 hover:bg-black hover:text-white bottom-10-per z-20"
                            >
                                Women Collection
                            </LinkButton>
                        </OverlayContainer>
                    </div>
                    <div className="w-full">
                        <OverlayContainer
                            imgSrc="/bg-img/banner_minipage3.jpg"
                            imgAlt="Men Collection"
                        >
                            <LinkButton
                                href="/collection"
                                extraClass="absolute p-3 hover:bg-black hover:text-white bottom-10-per z-20"
                            >
                                Men Collection
                            </LinkButton>
                        </OverlayContainer>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CategorySection;
