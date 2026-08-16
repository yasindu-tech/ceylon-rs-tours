"use client"

import Script from "next/script"
import { TRIPADVISOR_LOCATION_ID, TRIPADVISOR_LISTING_URL } from "@/lib/tripadvisor-links"

const UNIQ = 201

// Official Tripadvisor "selfserveprop" rating badge — compact, rating-only,
// free, no API key needed. Used in the footer. The fuller review section
// further down the page uses hand-copied reviews stored in MongoDB instead
// (see lib/models/tripadvisor-review.ts) since this widget type never
// renders review text, only the rating, and the Content API is paid.
interface TripAdvisorWidgetProps {
  className?: string
}

export function TripAdvisorWidget({ className }: TripAdvisorWidgetProps) {
  const src =
    `https://www.jscache.com/wejs?wtype=selfserveprop&uniq=${UNIQ}&locationId=${TRIPADVISOR_LOCATION_ID}` +
    `&lang=en_US&rating=true&nreviews=0&writereviewlink=true&popIdx=false` +
    `&iswide=false&border=true&display_version=2`

  return (
    <div className={className}>
      <div id={`TA_selfserveprop${UNIQ}`} className="TA_selfserveprop">
        <ul id={`ta-links-${UNIQ}`} className="TA_links">
          <li id={`ta-link-item-${UNIQ}`}>
            <a target="_blank" rel="noopener noreferrer" href={TRIPADVISOR_LISTING_URL}>
              <img
                src="https://www.tripadvisor.com/img/cdsi/img2/branding/150_logo-11900-2.png"
                alt="TripAdvisor"
              />
            </a>
          </li>
        </ul>
      </div>
      <Script async strategy="lazyOnload" src={src} />
    </div>
  )
}
