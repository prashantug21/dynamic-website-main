"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image'

interface Attribute {
  id: number;
  AttributeMain: string;
  AttributePart: string | null;
}

interface ChannelVariants {
  id: number;
  Website: string;
  WebsiteShort: string;
  EmailHeadline: string;
  Email: string;
  Banner: string;
}

interface LocalizationData {
  data: any[]; // Adjust this type as needed
}

interface ClaimsData {
  data: any[]; // Adjust this type as needed
}

interface Attributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  ClaimId: string;
  PromotionalClaim: string;
  Attribute: Attribute;
  Evidence: string | null;
  claims: ClaimsData;
  ChannelVariants: ChannelVariants;
  localizations: LocalizationData;
}

interface FeatureSectionProps {
  claimsData: {
    id: number;
    attributes: Attributes;
  }[];
}

export default function FeaturesSection({ claimsData }: FeatureSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at the first cloned section
  const [headingsOffset, setHeadingsOffset] = useState(0);
  const [activeHeadingIndex, setActiveHeadingIndex] = useState(0);

  // Array of background colors for carousel items
  const bgColors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200'];
  const headingColor=[ 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-purple-500','text-red-500'];

  // Grouping claimsData by AttributeMain
  const groupedByAttributeMain = claimsData.reduce((acc, claim) => {
    const attributeMain = claim.attributes.Attribute.AttributeMain;
    if (!acc[attributeMain]) {
      acc[attributeMain] = [];
    }
    acc[attributeMain].push(claim);
    return acc;
  }, {} as Record<string, typeof claimsData>);

  // Convert to array of sections with their widths
  const groupedItems = Object.entries(groupedByAttributeMain).map(([attributeMain, claims]) => ({
    attributeMain,
    claims,
    width: 250 * claims.length // Width based on number of claims
  }));

  // Duplicate the first and last items for infinite scrolling
  const infiniteGroupedItems = [
    groupedItems[groupedItems.length - 1], // Last item
    ...groupedItems,
    groupedItems[0], // First item
  ];



  const totalSections = infiniteGroupedItems.length;

  // Calculate cumulative widths of sections
  const cumulativeWidths = infiniteGroupedItems.reduce((acc, section, index) => {
    const width = section.width;
    const totalWidth = acc.length > 0 ? acc[acc.length - 1] + width : width;
    return [...acc, totalWidth];
  }, [] as number[]);

  // Handle navigation to specific section based on heading click
  const handleHeadingClick = (index: number) => {
    setCurrentIndex(index + 1); // +1 to account for the cloned last section
  };

  // Handle Next and Prev buttons
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % totalSections;
      if (nextIndex === totalSections - 1) {
        // Reset index to show the first item without animation
        setTimeout(() => setCurrentIndex(1), 500);
      }
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexAdjusted = (prevIndex - 1 + totalSections) % totalSections;
      if (prevIndexAdjusted === 0) {
        // Reset index to show the last item without animation
        setTimeout(() => setCurrentIndex(totalSections - 2), 500);
      }
      return prevIndexAdjusted;
    });
  };

  const carouselStyle = {
    transform: `translateX(-${currentIndex == 0 ? 0 : cumulativeWidths[currentIndex - 1]}px)`,
    width: `${cumulativeWidths[totalSections - 1] || 0}px`,
  };

  useEffect(() => {
    const headingWidth = 240; // Width of each heading item
    const visibleHeadingsCount = Math.floor(document.querySelector('.headings-carousel')!.clientWidth / headingWidth);
    const newOffset = Math.max(0, (currentIndex - 1) * headingWidth - (visibleHeadingsCount - 1) * headingWidth);
    setHeadingsOffset(newOffset);
  }, [currentIndex]);

  useEffect(() => {
    setActiveHeadingIndex(currentIndex - 1); // Update the active heading index
  }, [currentIndex]);

  const headingsCarouselStyle = {
    transform: `translateX(-${activeHeadingIndex < 5 ? activeHeadingIndex * 300 : 4 * 300}px)`, // Move the active heading to the left
    width: `${groupedItems.length * 300}px`, // Total width of all headings
    transition: 'transform 0.5s', // Add transition effect
  };

  return (
    <div className="bg-white text-black py-16">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-8">Features</h1>

      <div className="max-w-7xl bg-[#f0f2f5] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        {/* Headings Carousel */}
        <div className="headings-carousel flex overflow-hidden whitespace-nowrap" style={headingsCarouselStyle}>
          {groupedItems.map((section, index) => (
            <div
              key={index}
              className={`heading-item flex place-items-end cursor-pointer px-4 py-2 ${index === currentIndex - 1 ? 'bg-[#b5cff5]' : 'bg-[#c7d9f3]'}`}
              onClick={() => handleHeadingClick(index)}
              style={{ width: '300px' }}
            >
              <h2 className={`font-semibold duration-300 ${index===currentIndex-1?headingColor[index%headingColor.length]:'text-black'} ${index === currentIndex - 1 ? 'text-3xl' : 'text-lg'}`}>{section.attributeMain}</h2>
            </div>
          ))}
        </div>

        {/* Main Carousel */}
        <div
          className="carousel flex transition-transform duration-500 ease-in-out"
          style={carouselStyle}
        >
          {infiniteGroupedItems.map((section, index) => (
            <div
              key={index}
              className={`carousel-item flex-shrink-0`} // Apply different background colors
              style={{ width: `${section.width}px` }} // Set dynamic width
            >
              {/* Claims Items */}
              <div className="flex flex-wrap justify-center gap-4 mt-4 border-x-[1px] border-gray-400">
                {section.claims.map((claim: any) => (
                  <div key={claim.id} className={`p-2 w-full max-w-[230px] h-[400px] ${bgColors[index % bgColors.length]} ${index !== currentIndex ? 'opacity-70' : ''}`}>
                    <div className='relative'>
                    <Image
                    src={`/images/image(${claim.id%2 +1}).jpg`}
                    alt="Image"
                    width={250}
                    height={250}
                    />
                    <Image
                    src={`/svgs/icon${claim.id%12 +1}.drawio.svg`}
                    className='absolute bottom-1 left-1'
                    alt="Logo"
                    width={50}
                    height={50}
                    />
                    
                    </div>
                    {/* Render AttributePart as the headline */}
                    {claim.attributes.Attribute.AttributePart && (
                      <h2 className="text-xl font-bold mt-2 text-gray-800">
                        {claim.attributes.Attribute.AttributePart}
                      </h2>
                    )}
                    <p className="text-md mt-4 text-gray-500">
                      {claim.attributes.ChannelVariants.Website.length < 150
                        ? claim.attributes.ChannelVariants.Website
                        : claim.attributes.ChannelVariants.WebsiteShort.length < 150
                          ? claim.attributes.ChannelVariants.WebsiteShort
                          : `${claim.attributes.ChannelVariants.WebsiteShort.substring(0, 150) + '...'}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="carousel-controls flex justify-center gap-8 mt-8">
          <button
            className="bg-gray-300 px-4 py-2"
            onClick={handlePrev}
            disabled={currentIndex === 1} // Disable "Prev" button at the start
          >
            &lt;
          </button>
          <button
            className="bg-gray-300 px-4 py-2"
            onClick={handleNext}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
