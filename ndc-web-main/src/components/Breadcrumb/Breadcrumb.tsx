"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaHome } from "react-icons/fa";

const pathMappings: { [key: string]: string } = {
  "ug-programmes": "UG Programme",
  "pg-programmes": "PG Programme",
  "science-programmes": "Basic Sciences",
};

// Programmes (kept from your original)
const ugProgrammes = ["B.Com", "B.Com-BDA", "BBA", "BCA", "B.Science"];
const pgProgrammes = ["MBA", "MCA", "M.Com"];

// Tabs mapping: slug → label
const tabSlugToLabel: Record<string, string> = {
  "student-oriented-cells": "Student Oriented Cells",
  "faculty-oriented-cells": "Faculty Oriented Cells",
  "academic-&-social-engagement-forums": "Academic & Social Engagement Forums",
};

// Keep slugifier in sync with KnowEverything
const slugify = (label: string) =>
  label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const Breadcrumb: React.FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const programmeName = decodeURIComponent(
    (searchParams.get("programme") || "").trim()
  );

  let programmeCategory = "";
  if (pgProgrammes.includes(programmeName)) programmeCategory = "pg-programmes";
  else if (ugProgrammes.includes(programmeName)) programmeCategory = "ug-programmes";

  const programmeCategoryHash = programmeCategory
    .replace("-programmes", "_programme")
    .replace("-and-technology", "_programme")
    .replace("-", "_");

  const pathSegments = pathname.split("/").filter(Boolean);

  // === ACTIVITIES branch ===
  const isActivities = pathSegments[0] === "activities";
  const activitiesTabSlug = pathSegments[1] || ""; // e.g. "student-oriented-cells"
  const activitiesTabLabel =
    tabSlugToLabel[activitiesTabSlug] || ""; // "" when not on child route
  const activitiesTabHash = activitiesTabLabel
    ? encodeURIComponent(activitiesTabLabel)
    : "";

  return (
    <nav className={`w-[90%] mt-8 mx-auto flex flex-wrap items-center space-x-2 mb-8 text-gray-700 ${className}`}>
      {/* Home */}
      <Link href="/" className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
        <FaHome className="w-5 h-5" />
      </Link>

      {/* === ACTIVITIES crumbs (hash back to tab) === */}
      {isActivities ? (
        <>
          <span className="text-gray-400">›</span>
          {/* Always send to activities root; if we know the tab, include the hash */}
          <Link
            href={`/activities${activitiesTabHash ? `#${activitiesTabHash}` : ""}`}
            className="text-gray-500 hover:text-gray-700 capitalize break-words"
          >
            Activities
          </Link>

          {activitiesTabLabel && (
            <>
              <span className="text-gray-400">›</span>
              {/* Clicking this **must** jump to the tab on the Activities page */}
              <Link
                href={`/activities#${activitiesTabHash}`}
                className="text-gray-500 hover:text-gray-700 capitalize break-words"
              >
                {activitiesTabLabel}
              </Link>
            </>
          )}

          {/* If your route has deeper segments like /activities/<tab>/<programme> */}
          {pathSegments.slice(2).map((segment, i, arr) => {
            const isLast = i === arr.length - 1;
            const href = "/" + pathSegments.slice(0, 2 + i + 1).join("/");
            const displayName = decodeURIComponent(segment).replace(/-/g, " ").toUpperCase();

            return (
              <div key={href} className="flex items-center space-x-2 break-words">
                <span className="text-gray-400">›</span>
                {!isLast ? (
                  <Link href={href} className="text-gray-500 hover:text-gray-700 capitalize break-words">
                    {displayName}
                  </Link>
                ) : (
                  <span className="text-orange-600 font-semibold capitalize break-words">
                    {displayName}
                  </span>
                )}
              </div>
            );
          })}
        </>
      ) : (
        // === Your existing Departments crumbs (unchanged, except a small fix) ===
        <>
          {programmeCategory && (
            <>
              <span className="text-gray-400">›</span>
              <Link href="/departments" className="text-gray-500 hover:text-gray-700 capitalize break-words">
                Departments
              </Link>

              <span className="text-gray-400">›</span>
              <Link
                href={`/departments#${programmeCategoryHash}`}
                className="text-gray-500 hover:text-gray-700 capitalize break-words"
              >
                {pathMappings[programmeCategory] ||
                  programmeCategory.replace("-", " ").toUpperCase()}
              </Link>
            </>
          )}

          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;

            let href = "/" + pathSegments.slice(0, index + 1).join("/");
            if (segment === "ug-programmes" || segment === "pg-programmes" || segment === "science-programmes") {
              href = `/departments#${programmeCategoryHash}`;
            }

            let displayName =
              (pathMappings[segment] || decodeURIComponent(segment)).toUpperCase();

            if (
              programmeName &&
              segment === programmeName.toLowerCase().replace(/ /g, "-")
            )
              return null;

            return (
              <div key={href} className="flex items-center space-x-2 break-words">
                <span className="text-gray-400">›</span>
                {!isLast ? (
                  <Link href={href} className="text-gray-500 hover:text-gray-700 capitalize break-words">
                    {displayName}
                  </Link>
                ) : (
                  <span className="text-orange-600 font-semibold capitalize break-words">
                    {programmeName || displayName}
                  </span>
                )}
              </div>
            );
          })}
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;
