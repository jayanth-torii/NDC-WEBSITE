import React from "react";
import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";
import BackgroundDecor from "@/components/ui/BackgroundDecor";

interface Crumb {
  label: string;
  path?: string;
}

interface ActivitiesPageShellProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  breadcrumbs: Crumb[];
  children: React.ReactNode;
}

export default function ActivitiesPageShell({
  eyebrow,
  title,
  subtitle,
  image,
  breadcrumbs,
  children,
}: ActivitiesPageShellProps) {
  return (
    <main className="relative min-h-screen bg-gray-50/50 flex flex-col w-full overflow-hidden">
      <BackgroundDecor />
      <div className="relative z-10">
        <GlobalBanner
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          image={image}
          breadcrumbs={breadcrumbs}
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        {children}
      </div>
    </main>
  );
}
