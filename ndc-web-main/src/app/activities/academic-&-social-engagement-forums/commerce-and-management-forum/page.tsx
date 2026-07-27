import React from "react";
import ActivitiesPageShell from "@/components/Activities/CommonComponents/PageShell";
import AntiragginCommitte from "@/components/Activities/CommonComponents/AntiragginCommitte";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Target, Lightbulb, Users, LineChart, Briefcase, Speech, Presentation, BookOpen, BrainCircuit } from "lucide-react";
import { getActivityCell } from "@/services/data.service";

export const revalidate = 300;

async function CommerceAndManagementForum() {
  const data: any = await getActivityCell("commerce-and-management-forum");

  if (!data) return null;

  const aboutData = data.AboutVisionMissionSections;
  const objectives = aboutData?.AccordienSection?.find((s: any) => s.title === "Objectives of Forum")?.ListPoints || [];
  const activities = aboutData?.AccordienSection?.find((s: any) => s.title === "Activities/ Program of the forum")?.ListPoints || [];

  const icons = [Target, Lightbulb, Users, LineChart, Briefcase, Speech, Presentation, BookOpen, BrainCircuit];

  return (
    <ActivitiesPageShell
      eyebrow="Academic & Social Engagement Forums"
      title="Commerce And Management Forum"
      image={data.bannerSection?.image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Academic & Social Engagement Forums", path: "/activities#Academic%20%26%20Social%20Engagement%20Forums" },
        { label: "Commerce And Management Forum" },
      ]}
    >
      {/* Hero Intro */}
      <Reveal>
        <div className="rounded-[24px] border border-card-border bg-gradient-to-br from-surface-tint to-white p-8 md:p-14 mb-12 shadow-[var(--shadow-card)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>
          
          <h1 className="text-3xl md:text-5xl font-black mb-8 text-navy tracking-tight flex items-center gap-4 relative z-10">
            <span className="w-2.5 h-12 bg-orange rounded-full inline-block shadow-sm"></span>
            {aboutData?.title}
          </h1>
          
          <div className="relative z-10">
            {aboutData?.AboutDescription?.map((paragraph: string, index: number) => (
              <p key={index} className="text-justify text-body-gray leading-relaxed text-[17px] md:text-[18px] font-medium">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Objectives & Activities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        
        {/* Objectives Section */}
        {objectives.length > 0 && (
          <div>
             <h2 className="text-2xl text-navy font-bold mb-6 flex items-center gap-3 border-b-2 border-surface-tint pb-4">
                <Target className="text-orange" size={28} />
                Objectives of Forum
             </h2>
             <RevealGroup className="space-y-4">
               {objectives.map((obj: string, i: number) => {
                 const Icon = icons[i % icons.length];
                 return (
                   <RevealItem key={i}>
                     <div className="flex items-start gap-4 p-5 rounded-[16px] border border-card-border bg-white shadow-sm hover:shadow-md hover:border-orange/30 transition-all duration-300 group">
                       <div className="w-12 h-12 rounded-full bg-surface-tint flex flex-shrink-0 items-center justify-center text-navy group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                         <Icon size={20} />
                       </div>
                       <p className="text-body-gray text-[16px] leading-relaxed pt-1 font-medium group-hover:text-navy transition-colors">{obj}</p>
                     </div>
                   </RevealItem>
                 );
               })}
             </RevealGroup>
          </div>
        )}

        {/* Activities Section */}
        {activities.length > 0 && (
          <div>
             <h2 className="text-2xl text-navy font-bold mb-6 flex items-center gap-3 border-b-2 border-surface-tint pb-4">
                <Lightbulb className="text-orange" size={28} />
                Activities & Programs
             </h2>
             <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {activities.map((act: string, i: number) => (
                 <RevealItem key={i}>
                   <div className="bg-surface-tint rounded-[16px] p-5 border border-transparent hover:border-orange/40 hover:bg-white transition-all duration-300 h-full flex flex-col justify-center items-center text-center group shadow-sm">
                     <span className="w-8 h-8 rounded-full bg-white text-orange shadow-sm flex items-center justify-center mb-3 font-bold group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                       {i + 1}
                     </span>
                     <span className="text-navy font-semibold text-[15px] leading-snug">{act}</span>
                   </div>
                 </RevealItem>
               ))}
             </RevealGroup>
          </div>
        )}

      </div>

      <AntiragginCommitte data={data.ForumCoordinators} />
    </ActivitiesPageShell>
  );
}

export default CommerceAndManagementForum;
