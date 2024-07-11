// Filter.js
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import React from 'react';

const Filter = ({ valueKey, name, data }) => {
    const colors = {
        "white": "bg-white",
        "safety green": "bg-lime-500",
        "forest green": "bg-green-800",
        "sport grey": "bg-gray-800",
        "ash": "bg-gray-800",
        "black": "bg-black",
        "red": "bg-red-800",
        "royal": "bg-blue-800",
        "navy": "bg-blue-900",
        "purple": "bg-purple-800",
        "maroon": "bg-red-800",
        "cardinal red": "bg-red-800",
        "dark heather": "bg-gray-800",
        "carolina blue": "bg-blue-300",
        "dark chocolate": "bg-amber-800",
        "irish green": "bg-green-600",
        "s orange": "bg-orange-600",
        "graphite heather": "bg-gray-800",
        "black/ gold": "bg-black",
        "graphite/ white": "bg-gray-800",
        "black/ white": "bg-black",
        "cardinal/ white": "bg-red-800",
        "lt blue/ white": "bg-blue-300",
        "maroon/ white": "bg-red-800",
        "navy/ gold": "bg-blue-900",
        "navy/ white": "bg-blue-900",
        "purple/ white": "bg-purple-800",
        "royal/ gold": "bg-blue-800",
        "royal/ white": "bg-blue-800",
        "scarlet/ white": "bg-red-800",
        "vegas gold/ wht": "bg-yellow-500",
        "orange/ white": "bg-orange-600",
        "hunter/ white": "bg-green-800",
        "black/ red": "bg-black",
        "yellow": "bg-yellow-400",
        "pink": "bg-pink-500",
        "sand": "bg-gray-200",
        "silver": "bg-gray-400",
        "heather grey": "bg-gray-400",
        "banana": "bg-yellow-300",
        "burgundy": "bg-red-800",
        "celadon": "bg-teal-200",
        "heather charcoal": "bg-gray-700",
        "cream": "bg-yellow-100",
        "pacific blue": "bg-blue-400",
        "powder blue": "bg-blue-200",
        "slate": "bg-gray-600",
        "charcoal": "bg-gray-900",
        "forest": "bg-green-900",
        "ash grey": "bg-gray-300",
        "royal blue": "bg-blue-800",
        "true navy": "bg-blue-900",
        "gold": "bg-yellow-500",
        "kelly": "bg-green-600",
        "orange": "bg-orange-500",
        "cardinal": "bg-red-800",
        "military green": "bg-green-700",
        "harbor blue": "bg-blue-500",
        "dark ash": "bg-gray-800",
        "blue jerry": "bg-blue-400",
        "eternity": "bg-purple-600",
        "flag": "bg-gray-700",
        "cotton candy": "bg-pink-300",
        "evening sky": "bg-blue-300",
        "blue ocean": "bg-blue-700",
        "gum drop": "bg-purple-400",
        "fluorescent swrl": "bg-green-500",
        "prism": "bg-gray-500",
        "mystique": "bg-purple-600",
        "neon rainbow": "bg-gray-500",
        "moondance": "bg-gray-500",
        "reactive rainbow": "bg-gray-500",
        "saturn": "bg-gray-500",
        "woodstock": "bg-gray-500",
        "wild spider": "bg-gray-500",
        "santa barbara": "bg-gray-500",
        "multi rainbow": "bg-gray-500",
        "aurora": "bg-gray-500",
        "karma": "bg-gray-500",
        "earth": "bg-gray-500",
        "fire": "bg-gray-500",
        "blaze": "bg-gray-500",
        "mardi gras": "bg-gray-500",
        "flo blue/ pink": "bg-gray-500",
        "rasta web": "bg-gray-500",
        "union jack": "bg-gray-500",
        "independence": "bg-gray-500",
        "snow cone": "bg-gray-500",
        "zen rainbow": "bg-gray-500",
        "minty rainbow": "bg-gray-500",
        "lotus": "bg-gray-500",
        "coral reef": "bg-gray-500",
        "carnival": "bg-gray-500",
        "flashback": "bg-gray-500",
        "lava lamp": "bg-gray-500",
        "barbados": "bg-gray-500",
        "st. lucia": "bg-gray-500",
        "pastel neon": "bg-gray-500",
        "sunshine": "bg-gray-500",
        "blast": "bg-gray-500",
        "desert rose": "bg-gray-500",
        "jellybean": "bg-gray-500",
        "lagoon": "bg-gray-500",
        "mint fusion": "bg-gray-500",
        "pride": "bg-gray-500",
        "sherbet": "bg-gray-500",
        "multi black": "bg-gray-500",
        "multi blue": "bg-gray-500",
        "unicorn": "bg-gray-500",
        "grand canyon": "bg-gray-500",
        "glacier": "bg-gray-500",
        "everglades": "bg-gray-500",
        "yellowstone": "bg-gray-500",
        "acadia": "bg-gray-500",
        "yosemite": "bg-gray-500",
        "sunflower": "bg-gray-500",
        "funnel cake": "bg-gray-500",
        "fire cracker": "bg-gray-500",
        "silver rainbow": "bg-gray-500",
        "ferris wheel": "bg-gray-500",
        "zero g": "bg-gray-500",
        "lollypop": "bg-gray-500",
        "gummy bear": "bg-gray-500",
        "slushy": "bg-gray-500",
        "cherry cola": "bg-gray-500",
        "moonbeam": "bg-gray-500",
        "swirl red": "bg-gray-500",
        "swirl blue": "bg-gray-500",
        "swirl black": "bg-gray-500",
        "swirl purple": "bg-gray-500",
        "hypnotize": "bg-gray-500",
        "quest": "bg-gray-500",
        "serenity": "bg-gray-500",
        "harmony": "bg-gray-500",
        "dharma": "bg-gray-500",
        "voodoo": "bg-gray-500",
        "jamberry": "bg-gray-500",
        "citrus": "bg-gray-500",
        "willow": "bg-gray-500",
        "magic": "bg-gray-500",
        "black shibori": "bg-gray-500",
        "spider denim": "bg-gray-500",
        "spider mustard": "bg-gray-500",
        "spider olive": "bg-gray-500",
        "spider taupe": "bg-gray-500",
        "white/ black": "bg-gray-100",
        "white/ royal": "bg-blue-800",
        "white/ turquoise": "bg-teal-200",
        "white/ red": "bg-red-800",
        "spider red": "bg-gray-500",
        "spider mint": "bg-gray-500",
        "spider gray": "bg-gray-500",
        "spider black": "bg-gray-500",
        "spider royal": "bg-gray-500",
        "spider gold": "bg-gray-500",
        "spider baby blue": "bg-gray-500",
        "spider lime": "bg-gray-500",
        "spider orange": "bg-gray-500",
        "spider pink": "bg-gray-500",
        "spider turquoise": "bg-gray-500",
        "spider navy": "bg-gray-500",
        "spider silver": "bg-gray-500",
        "spider purple": "bg-gray-500",
        "spider crimson": "bg-gray-500",
        "spider kelly": "bg-gray-500",
        "spider green": "bg-gray-500",
        "spider dandelion": "bg-gray-500",
        "spider burgundy": "bg-gray-500",
        "spider lavender": "bg-gray-500",
        "deep forte blue": "bg-blue-900",
        "coral craze": "bg-pink-500",
        "cypress green": "bg-green-700",
        "summer squash": "bg-yellow-300",
        "mauve": "bg-purple-400",
        "mint": "bg-teal-300",
        "soothing blue": "bg-blue-200",
        "freshwater": "bg-blue-400",
        "bright yellow": "bg-yellow-400",
        "light blue": "bg-blue-200",
        "light tan": "bg-yellow-200",
        "golden yellow": "bg-yellow-300",
        "grey": "bg-gray-400",
        "light pink": "bg-pink-200",
        "hot pink": "bg-pink-600",
        "kelly green": "bg-green-600",
        "turquoise": "bg-teal-400",
        "grey heather": "bg-gray-400",
        "true royal/ blk": "bg-blue-800",
        "clasc navy/ crbn": "bg-blue-900",
        "classic red/ blk": "bg-red-800",
        "sp scarlet red": "bg-red-800",
        "sport silver": "bg-gray-400",
        "sport chrty pink": "bg-pink-600",
        "sport maroon": "bg-red-800",
        "sport orange": "bg-orange-500",
        "sport purple": "bg-purple-600",
        "sport red": "bg-red-800",
        "sp burnt orange": "bg-orange-500",
        "silver melange": "bg-gray-400",
        "black melange": "bg-gray-800",
        "vegas gold": "bg-yellow-500",
        "dark green": "bg-green-900",
        "graphite": "bg-gray-800",
        "power blue": "bg-blue-300",
        "texas orange": "bg-orange-500",
        "lime": "bg-lime-500",
        "athletic orange": "bg-orange-500",
        "scarlet": "bg-red-800",
        "electric blue": "bg-blue-600",
        "brown": "bg-brown-800",
        "safety orange": "bg-orange-500",
        "safety yellow": "bg-yellow-500",
        "coral": "bg-pink-500",
        "light yellow": "bg-yellow-200",
        "olive": "bg-green-600",
        "teal": "bg-teal-500",
        "pastel blue": "bg-blue-200",
        "pastel mint": "bg-teal-200",
        "fuchsia": "bg-pink-600",
        "light lime": "bg-lime-300",
        "melon": "bg-pink-300",
        "salmon": "bg-pink-400",
        "sky blue": "bg-blue-300"
    }


    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [valueKey]: id,
        };

        if (current[valueKey] === id) {
            query[valueKey] = null;
        }

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            { skipNull: true },
        );

        router.push(url);
    };

    return (
        <div className='mb-8'>
        <h3 className='text-lg font-semibold'>{name}</h3>
        <div className='flex flex-wrap gap-2 mt-2'>
            {data.map((filter) => (
                <div key={filter.id} className="flex items-center">
                    <button
                        className={`min-h-10 py-2 shadow-lg p-3 min-w-[40px] rounded-lg ${
                            name.toLowerCase() === 'colors' ? colors[filter.name.toLowerCase()] : ''
                        } ${
                            selectedValue === filter.name
                                ? 'bg-red-500 text-white'
                                : 'bg-white border border-gray-300'
                        }`}
                        onClick={() => onClick(filter.name)}
                        style={{
                            border: name.toLowerCase() === 'colors' && selectedValue === filter.name ? '2px solid black' : '',
                            borderRadius: name.toLowerCase() === 'colors' ? '50%' : '',
                        }}
                    >
                        {name.toLowerCase() === 'colors' ? '' : filter.name}
                    </button>
                </div>
            ))}
        </div>
        <hr className='my-10 border-gray-300 h-px' />
    </div>
    );
};

export default Filter;
