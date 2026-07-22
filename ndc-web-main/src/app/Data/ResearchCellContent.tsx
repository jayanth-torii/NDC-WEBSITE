const ResearchCellContent = {
    aboutSections: [{
        title: "ABOUT RESEARCH CELL",
        description: `
        Nagarjuna College of Management Studies is dedicated to fostering a research culture among both faculty and students. 
        We, at NCMS, recognize that fundamental, long-term research is essential for the growth and development of our institution, 
        and our research policy is designed to promote research aptitude among all learners. 
        Our ultimate goal is to contribute to national development by identifying research areas of academic, practical, and socially relevant significance.

        To achieve these aims, we are committed to ensuring that all our research activities comply with established standards and norms governing ethical and safe research conduct. 
        Our research policy provides a broad framework for our research activities.`,
    }],


   
    visionMission: {
        vision: {
            title: "VISION",
            description: "To create a conducive environment to lead and sustain research culture.",
        },
        mission: {
            title: "MISSION",
            points: [
                "To foster a dynamic research community that inspires and encourages faculty and students to engage in research.",
                "To equip faculty and students with necessary skills, knowledge, and resources to engage in research that addresses real-world challenges and advances the frontiers of knowledge.",
                "To provide a supportive and collaborative research environment that promotes interdisciplinary collaborations, creativity, and critical thinking.",
            ],
        },
    },
    collapsibleSections: {
        objectives: {
            title: "Objectives",
            points: [
                "To inform and assist researchers in identifying appropriate research opportunities announced by different academic, research, industry, or government organizations.",
                "To promote interdisciplinary research and establish modalities for preparing and undertaking joint ventures covering more than one knowledge domain, as well as policies involving external agencies/experts in such projects.",
                "To create awareness about patents and Intellectual Property Rights and motivate researchers to apply for patents.",
                "To take initiatives for granting study leave, sabbatical leave, on-duty leave, seed money, reduction in workload, etc., to deserving faculty members for advanced research.",
                "To identify and establish linkages, including MOUs, for long-term relationships with national and international research organizations to widen the scope of research opportunities and funding options available to researchers.",
                "To encourage and facilitate the publication of research works in reputed academic international/national journals and also facilitate the presentation of their research work through academic events such as workshops/seminars/conferences.",
                "To create an ecosystem for innovations, including an incubation center and other initiatives for the creation and transfer of knowledge.",
                "To facilitate community-oriented research initiatives and transfer the research findings for the social and economic development of the community.",
                "We are committed to implementing these objectives and creating a research-friendly environment that promotes innovative thinking and the pursuit of knowledge.",
            ],
        },
    },
    activities: {
        title: "PUBLICATIONS",
        buttons: [
            {
                name: "Journal",
                pdf: "/pdfs/anti-sexual-activity.pdf"
            },
            {
                name: "Conference Proceedings",
                pdf: "/pdfs/anti-sexual-activity.pdf"
            },
            {
                name: "Books/Books Chapters",
                pdf: "/pdfs/anti-sexual-activity.pdf"
            },
        ]
        ,
    },
    TabbedSectionContent: {
        title: "RESOURCES & EVENTS",
        description:
            "Explore various workshops, seminars, and conferences conducted for academic and professional growth.",
        imageSrc: "/images/ResourcesEvents/banner.png",
        tabsList: ["Workshops/Seminars/Conference", "Conference Books"],
        tabContent: {
            "Workshops/Seminars/Conference": [
                { name: "A Talk on Why and What all should be conserved? Hidden Elements of Nature that Support Human Survival and Celebration of National Energy Conservation Day-12-12-2023", path: "talk-on-conservation" },
                { name: "Guest Talk on Career and Growth in IT Service Management (ITSM)-09-12-2023", path: "career-growth-it" },
                { name: "Guest Talk on Industrialization and Its Impact on Environment and Society-07-12-2023", path: "industrialization-impact" },
                { name: "Guest Talk on Higher Education Abroad-29-11-2023", path: "higher-education-abroad" },
                { name: "Motivational Session by Start-up Founder – Celebration of Entrepreneurship Day-27-11-2023", path: "research-conference-2024" },
                { name: "Current Industrial Trends- 07-11-2023", path: "ai-trends" },
                { name: "Guest Talk on Live Equity Markets: Why, How and What?-12-10-2023", path: "data-science-tech" },
                { name: "Workshop on Communication Skill Development-04-10-2023", path: "research-conference-2024" },],
                "Conference Books": [
                    { name: "Re-Discovering Business Practices Post Covid – 19-2023", path: "research-conference-2024" },
                    { name: "Sustainability of Small Enterprises of India in Post Covid Era-2023", path: "ai-trends" },
                    { name: "Bhasha Sampada I – Kannada-2023", path: "data-science-tech" },
                    { name: "Guest Talk on Higher Education Abroad-29-11-2023", path: "research-conference-2024" },
                    { name: "Bhasha Sampada I – English-2023", path: "ai-trends" },
                    { name: "Patharagithi-2023", path: "data-science-tech" },
                    { name: "The Thoughtful Pen-2023", path: "research-conference-2024" },
                    { name: "Tarangini-2023", path: "ai-trends" },  
                ],
        },
    },

    policies: {
        title: "POLICIES & COMPOSITION",
        description: "Stay Updated with the Policy and Compositions ",
        policybutton:"VIEW POLICY ",
        compositionbutton: "VIEW COMPOSITION",
        policyPdf: "",
        compositionPdf : "/pdfs/student-center/rc/R-D-Cell-1.pdf",
        imageUrl: "/images/policy.png" 
    },
    

};

export default ResearchCellContent;
