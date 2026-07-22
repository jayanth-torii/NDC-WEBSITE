import type { Schema, Struct } from '@strapi/strapi';

export interface AboutDepartmentPoints extends Struct.ComponentSchema {
  collectionName: 'components_about_department_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface AboutDepartmentSections extends Struct.ComponentSchema {
  collectionName: 'components_about_department_sections';
  info: {
    displayName: 'sections';
  };
  attributes: {
    points: Schema.Attribute.Component<'about-department.points', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutDepartmentVision extends Struct.ComponentSchema {
  collectionName: 'components_about_department_visions';
  info: {
    displayName: 'vision';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface AboutUsAbout extends Struct.ComponentSchema {
  collectionName: 'components_about_us_abouts';
  info: {
    description: '';
    displayName: 'About';
  };
  attributes: {
    description: Schema.Attribute.Component<'about-us.description', true>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsCampuses extends Struct.ComponentSchema {
  collectionName: 'components_about_us_campuses';
  info: {
    description: '';
    displayName: 'campuses';
  };
  attributes: {
    collegeDescription: Schema.Attribute.Text;
    collegeName: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Text;
    location: Schema.Attribute.String;
  };
}

export interface AboutUsContent extends Struct.ComponentSchema {
  collectionName: 'components_about_us_contents';
  info: {
    description: '';
    displayName: 'content';
  };
  attributes: {
    items: Schema.Attribute.Component<'about-us.items', true>;
    text: Schema.Attribute.String;
    textBold: Schema.Attribute.Enumeration<['true', 'false']>;
    type: Schema.Attribute.Enumeration<['text', 'list']>;
  };
}

export interface AboutUsDescription extends Struct.ComponentSchema {
  collectionName: 'components_about_us_descriptions';
  info: {
    displayName: 'description';
  };
  attributes: {
    points: Schema.Attribute.Text;
  };
}

export interface AboutUsDropdowns extends Struct.ComponentSchema {
  collectionName: 'components_about_us_dropdowns';
  info: {
    displayName: 'dropdowns';
  };
  attributes: {
    content: Schema.Attribute.Component<'about-us.content', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsGoverningCouncilMembers extends Struct.ComponentSchema {
  collectionName: 'components_about_us_governing_council_members';
  info: {
    displayName: 'Governing Council Members';
  };
  attributes: {
    members: Schema.Attribute.Component<'about-us.members', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsItems extends Struct.ComponentSchema {
  collectionName: 'components_about_us_items';
  info: {
    displayName: 'items';
  };
  attributes: {
    points: Schema.Attribute.Text;
  };
}

export interface AboutUsMembers extends Struct.ComponentSchema {
  collectionName: 'components_about_us_members';
  info: {
    displayName: 'members';
  };
  attributes: {
    designation: Schema.Attribute.String;
    name: Schema.Attribute.String;
    position: Schema.Attribute.String;
  };
}

export interface AboutUsMessage extends Struct.ComponentSchema {
  collectionName: 'components_about_us_messages';
  info: {
    displayName: 'message';
  };
  attributes: {
    points: Schema.Attribute.Text;
  };
}

export interface AboutUsNewsLetter extends Struct.ComponentSchema {
  collectionName: 'components_about_us_news_letters';
  info: {
    displayName: 'NEWS LETTER';
  };
  attributes: {
    Sections: Schema.Attribute.Component<'about-us.sections', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsOurCampuses extends Struct.ComponentSchema {
  collectionName: 'components_about_us_our_campuses';
  info: {
    displayName: 'Our Campuses';
  };
  attributes: {
    campuses: Schema.Attribute.Component<'about-us.campuses', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsPrincipalMessage extends Struct.ComponentSchema {
  collectionName: 'components_about_us_principal_messages';
  info: {
    description: '';
    displayName: 'Principal Message';
  };
  attributes: {
    message: Schema.Attribute.Component<'about-us.message', true>;
    position: Schema.Attribute.String;
    PrincipalImage: Schema.Attribute.Media<'images'>;
    PrincipalName: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsSections extends Struct.ComponentSchema {
  collectionName: 'components_about_us_sections';
  info: {
    displayName: 'Sections';
  };
  attributes: {
    pdf: Schema.Attribute.Media<'files'>;
    title: Schema.Attribute.String;
  };
}

export interface AboutUsVisionMission extends Struct.ComponentSchema {
  collectionName: 'components_about_us_vision_missions';
  info: {
    description: '';
    displayName: 'VisionMission';
  };
  attributes: {
    dropdowns: Schema.Attribute.Component<'about-us.dropdowns', true>;
  };
}

export interface ActivitiesPageAbout extends Struct.ComponentSchema {
  collectionName: 'components_activities_page_abouts';
  info: {
    displayName: 'About';
  };
  attributes: {
    descriptions: Schema.Attribute.Component<
      'activities-page.descriptions',
      true
    >;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ActivitiesPageActivities extends Struct.ComponentSchema {
  collectionName: 'components_activities_page_activities';
  info: {
    displayName: 'Activities';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ActivitiesPageBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_activities_page_banner_sections';
  info: {
    displayName: 'BannerSection';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ActivitiesPageCulturalAndLeadershipActivities
  extends Struct.ComponentSchema {
  collectionName: 'components_activities_page_cultural_and_leadership_activities';
  info: {
    displayName: 'Cultural And Leadership Activities';
  };
  attributes: {
    Sections: Schema.Attribute.Component<'activities-page.sections', true>;
    title: Schema.Attribute.String;
  };
}

export interface ActivitiesPageDescriptions extends Struct.ComponentSchema {
  collectionName: 'components_activities_page_descriptions';
  info: {
    displayName: 'descriptions';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface ActivitiesPageKnowEveryThing extends Struct.ComponentSchema {
  collectionName: 'components_activities_page_know_every_things';
  info: {
    displayName: 'Know Every Thing';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ActivitiesPageListPoints extends Struct.ComponentSchema {
  collectionName: 'components_activities_page_list_points';
  info: {
    displayName: 'ListPoints';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface ActivitiesPageOtherSections extends Struct.ComponentSchema {
  collectionName: 'components_activities_page_other_sections';
  info: {
    displayName: 'OtherSections';
  };
  attributes: {
    ListPoints: Schema.Attribute.Component<'activities-page.list-points', true>;
    title: Schema.Attribute.String;
  };
}

export interface ActivitiesPagePoints extends Struct.ComponentSchema {
  collectionName: 'components_activities_page_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface ActivitiesPageRows extends Struct.ComponentSchema {
  collectionName: 'components_activities_page_rows';
  info: {
    displayName: 'Rows';
  };
  attributes: {
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
    Slno: Schema.Attribute.String;
  };
}

export interface ActivitiesPageSections extends Struct.ComponentSchema {
  collectionName: 'components_activities_page_sections';
  info: {
    displayName: 'Sections';
  };
  attributes: {
    About: Schema.Attribute.Component<'activities-page.about', false>;
    images: Schema.Attribute.Media<'images', true>;
    OtherSections: Schema.Attribute.Component<
      'activities-page.other-sections',
      true
    >;
    Table_Section: Schema.Attribute.Component<
      'activities-page.table-section',
      false
    >;
    TabName: Schema.Attribute.String;
    VisionMission: Schema.Attribute.Component<
      'activities-page.vision-mission',
      true
    >;
  };
}

export interface ActivitiesPageTableSection extends Struct.ComponentSchema {
  collectionName: 'components_activities_page_table_sections';
  info: {
    displayName: 'Table_Section';
  };
  attributes: {
    Rows: Schema.Attribute.Component<'activities-page.rows', true>;
    title: Schema.Attribute.String;
  };
}

export interface ActivitiesPageVisionMission extends Struct.ComponentSchema {
  collectionName: 'components_activities_page_vision_missions';
  info: {
    displayName: 'VisionMission';
  };
  attributes: {
    description: Schema.Attribute.Text;
    points: Schema.Attribute.Component<'activities-page.points', true>;
    title: Schema.Attribute.String;
  };
}

export interface ActivitiesActivitiesContent extends Struct.ComponentSchema {
  collectionName: 'components_activities_activities_contents';
  info: {
    displayName: 'ActivitiesContent';
  };
  attributes: {
    sections: Schema.Attribute.Component<'activities.sections', true>;
    title: Schema.Attribute.String;
  };
}

export interface ActivitiesImages extends Struct.ComponentSchema {
  collectionName: 'components_activities_images';
  info: {
    displayName: 'images';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface ActivitiesSections extends Struct.ComponentSchema {
  collectionName: 'components_activities_sections';
  info: {
    description: '';
    displayName: 'sections';
  };
  attributes: {
    description: Schema.Attribute.Text;
    images: Schema.Attribute.Media<'images' | 'files', true>;
    title: Schema.Attribute.String;
  };
}

export interface AdmissionsApplicationProcedure extends Struct.ComponentSchema {
  collectionName: 'components_admissions_application_procedures';
  info: {
    displayName: 'applicationProcedure';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    procedures: Schema.Attribute.Component<'admissions.procedures', true>;
    title: Schema.Attribute.String;
  };
}

export interface AdmissionsBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_admissions_banner_sections';
  info: {
    description: '';
    displayName: 'BannerSection';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface AdmissionsContent extends Struct.ComponentSchema {
  collectionName: 'components_admissions_contents';
  info: {
    displayName: 'content';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface AdmissionsCoursesEligibility extends Struct.ComponentSchema {
  collectionName: 'components_admissions_courses_eligibilities';
  info: {
    description: '';
    displayName: 'coursesEligibility';
  };
  attributes: {
    tabsCourses: Schema.Attribute.Component<'admissions.tabs-courses', true>;
    title: Schema.Attribute.String;
  };
}

export interface AdmissionsImportentDocuments extends Struct.ComponentSchema {
  collectionName: 'components_admissions_importent_documents';
  info: {
    description: '';
    displayName: 'ImportentDocuments';
    icon: 'database';
  };
  attributes: {
    tabsContent: Schema.Attribute.Component<'admissions.tabs-content', true>;
    title: Schema.Attribute.String;
  };
}

export interface AdmissionsProcedures extends Struct.ComponentSchema {
  collectionName: 'components_admissions_procedures';
  info: {
    displayName: 'procedures';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface AdmissionsProgrammeTabs extends Struct.ComponentSchema {
  collectionName: 'components_admissions_programme_tabs';
  info: {
    displayName: 'programmeTabs';
  };
  attributes: {
    key: Schema.Attribute.String;
    label: Schema.Attribute.Text;
  };
}

export interface AdmissionsRowContent extends Struct.ComponentSchema {
  collectionName: 'components_admissions_row_contents';
  info: {
    displayName: 'row-content';
  };
  attributes: {
    course: Schema.Attribute.String;
    duration: Schema.Attribute.String;
    eligibility: Schema.Attribute.Text;
  };
}

export interface AdmissionsTabs extends Struct.ComponentSchema {
  collectionName: 'components_admissions_tabs';
  info: {
    displayName: 'tabs';
  };
  attributes: {
    key: Schema.Attribute.String;
    label: Schema.Attribute.Text;
  };
}

export interface AdmissionsTabsContent extends Struct.ComponentSchema {
  collectionName: 'components_admissions_tabs_contents';
  info: {
    displayName: 'tabsContent';
  };
  attributes: {
    content: Schema.Attribute.Component<'admissions.content', true>;
    note: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface AdmissionsTabsCourses extends Struct.ComponentSchema {
  collectionName: 'components_admissions_tabs_courses';
  info: {
    displayName: 'tabsCourses';
  };
  attributes: {
    rowContent: Schema.Attribute.Component<'admissions.row-content', true>;
    tabTitle: Schema.Attribute.String;
  };
}

export interface AdmissionsTabsData extends Struct.ComponentSchema {
  collectionName: 'components_admissions_tabs_data';
  info: {
    displayName: 'tabsData';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface AlumniAlumniAssciation extends Struct.ComponentSchema {
  collectionName: 'components_alumni_alumni_assciations';
  info: {
    description: '';
    displayName: 'AlumniAssciation';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface AlumniBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_alumni_banner_sections';
  info: {
    displayName: 'BannerSection';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface AlumniDescription extends Struct.ComponentSchema {
  collectionName: 'components_alumni_descriptions';
  info: {
    displayName: 'Description';
  };
  attributes: {
    description: Schema.Attribute.Text;
  };
}

export interface AlumniPoints extends Struct.ComponentSchema {
  collectionName: 'components_alumni_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface AlumniSections extends Struct.ComponentSchema {
  collectionName: 'components_alumni_sections';
  info: {
    displayName: 'Sections';
  };
  attributes: {
    Description: Schema.Attribute.Component<'alumni.description', true>;
    title: Schema.Attribute.String;
  };
}

export interface AlumniVisionMission extends Struct.ComponentSchema {
  collectionName: 'components_alumni_vision_missions';
  info: {
    description: '';
    displayName: 'VisionMission';
  };
  attributes: {
    Sections: Schema.Attribute.Component<'alumni.sections', true>;
    title: Schema.Attribute.String;
  };
}

export interface AntiRaggingCellAntiRaggingCommitteMembers
  extends Struct.ComponentSchema {
  collectionName: 'components_anti_ragging_cell_anti_ragging_committe_members';
  info: {
    description: '';
    displayName: 'Anti Ragging Committe Members';
  };
  attributes: {
    descriptions: Schema.Attribute.Component<
      'equal-opportunity-cell.description',
      true
    >;
    TableSection: Schema.Attribute.Component<
      'anti-ragging-cell.table-section',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface AntiRaggingCellBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_anti_ragging_cell_banner_sections';
  info: {
    displayName: 'Banner Section';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface AntiRaggingCellDescription extends Struct.ComponentSchema {
  collectionName: 'components_anti_ragging_cell_descriptions';
  info: {
    displayName: 'description';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface AntiRaggingCellPoints extends Struct.ComponentSchema {
  collectionName: 'components_anti_ragging_cell_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface AntiRaggingCellPolicyAndConsiderations
  extends Struct.ComponentSchema {
  collectionName: 'components_anti_ragging_cell_policy_and_considerations';
  info: {
    displayName: 'Policy And Considerations';
  };
  attributes: {
    description: Schema.Attribute.Component<
      'anti-ragging-cell.description',
      true
    >;
    TabsSection: Schema.Attribute.Component<
      'anti-ragging-cell.tabs-section',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface AntiRaggingCellTableSection extends Struct.ComponentSchema {
  collectionName: 'components_anti_ragging_cell_table_sections';
  info: {
    displayName: 'TableSection';
  };
  attributes: {
    designation: Schema.Attribute.String;
    Email: Schema.Attribute.String;
    mobile: Schema.Attribute.Text;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface AntiRaggingCellTabsSection extends Struct.ComponentSchema {
  collectionName: 'components_anti_ragging_cell_tabs_sections';
  info: {
    displayName: 'Tabs Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    points: Schema.Attribute.Component<'anti-ragging-cell.points', true>;
    title: Schema.Attribute.String;
  };
}

export interface ApplyNowBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_apply_now_banner_sections';
  info: {
    description: '';
    displayName: 'BannerSection';
  };
  attributes: {
    BannerImage: Schema.Attribute.Media<'images'>;
    image: Schema.Attribute.Media<'images'>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlogsBlogs extends Struct.ComponentSchema {
  collectionName: 'components_blogs_blogs';
  info: {
    displayName: 'Blogs';
  };
  attributes: {
    BlogID: Schema.Attribute.Integer;
    blogImage: Schema.Attribute.Media<'images' | 'files'>;
    content: Schema.Attribute.Component<'blogs.content', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlogsContent extends Struct.ComponentSchema {
  collectionName: 'components_blogs_contents';
  info: {
    displayName: 'content';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface BooksPatientsBooks extends Struct.ComponentSchema {
  collectionName: 'components_books_patients_books';
  info: {
    description: '';
    displayName: 'Books';
  };
  attributes: {
    BooksTable: Schema.Attribute.Component<'books-patients.books-table', true>;
    Columns: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface BooksPatientsBooksTable extends Struct.ComponentSchema {
  collectionName: 'components_books_patients_books_tables';
  info: {
    displayName: 'BooksTable';
  };
  attributes: {
    Author: Schema.Attribute.String;
    title: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface BooksPatientsPatientRight extends Struct.ComponentSchema {
  collectionName: 'components_books_patients_patient_rights';
  info: {
    displayName: 'Patient  Right';
  };
  attributes: {
    Columns: Schema.Attribute.JSON;
    Patient_Rights_Table: Schema.Attribute.Component<
      'books-patients.patient-rights-table',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface BooksPatientsPatientRightsTable
  extends Struct.ComponentSchema {
  collectionName: 'components_books_patients_patient_rights_tables';
  info: {
    displayName: 'PatientRightsTable';
  };
  attributes: {
    Grant_Year: Schema.Attribute.String;
    Inventor: Schema.Attribute.String;
    Journal_Date: Schema.Attribute.String;
    Journal_No: Schema.Attribute.String;
    Patent_No: Schema.Attribute.String;
    Published_Date: Schema.Attribute.String;
    SlNo: Schema.Attribute.String;
  };
}

export interface CertificateCoursesBannerSection
  extends Struct.ComponentSchema {
  collectionName: 'components_certificate_courses_banner_sections';
  info: {
    displayName: 'BannerSection';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface CertificateCoursesCourseOutcome
  extends Struct.ComponentSchema {
  collectionName: 'components_certificate_courses_course_outcomes';
  info: {
    displayName: 'Course Outcome';
  };
  attributes: {
    description: Schema.Attribute.Component<
      'certificate-courses.description',
      true
    >;
    Table: Schema.Attribute.Component<'certificate-courses.table', false>;
    title: Schema.Attribute.String;
  };
}

export interface CertificateCoursesDescription extends Struct.ComponentSchema {
  collectionName: 'components_certificate_courses_descriptions';
  info: {
    displayName: 'description';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface CertificateCoursesImages extends Struct.ComponentSchema {
  collectionName: 'components_certificate_courses_images';
  info: {
    displayName: 'Images';
  };
  attributes: {
    images: Schema.Attribute.Media<'images', true>;
    title: Schema.Attribute.String;
  };
}

export interface CertificateCoursesRow extends Struct.ComponentSchema {
  collectionName: 'components_certificate_courses_rows';
  info: {
    displayName: 'Row';
  };
  attributes: {
    Designation: Schema.Attribute.String;
    Name: Schema.Attribute.String;
    Role: Schema.Attribute.String;
    Slno: Schema.Attribute.String;
  };
}

export interface CertificateCoursesTable extends Struct.ComponentSchema {
  collectionName: 'components_certificate_courses_tables';
  info: {
    displayName: 'Table';
  };
  attributes: {
    Row: Schema.Attribute.Component<'certificate-courses.row', true>;
  };
}

export interface ContactUsBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_banner_sections';
  info: {
    displayName: 'BannerSection';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface ContactUsContactDetails extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_contact_details';
  info: {
    displayName: 'contactDetails';
  };
  attributes: {
    details: Schema.Attribute.Component<'contact-us.details', true>;
    image: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface ContactUsDetails extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_details';
  info: {
    displayName: 'details';
  };
  attributes: {
    points: Schema.Attribute.Component<'contact-us.points', true>;
    title: Schema.Attribute.String;
  };
}

export interface ContactUsLoginPortals extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_login_portals';
  info: {
    displayName: 'Login Portals';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    link: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ContactUsMap extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_maps';
  info: {
    displayName: 'Map';
  };
  attributes: {
    AdderssMAP: Schema.Attribute.Media<'images' | 'files'>;
    BannerMap: Schema.Attribute.Media<'images' | 'files'>;
    MapLink: Schema.Attribute.Text;
  };
}

export interface ContactUsPoints extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface DepartmentFacultyMembersAbout extends Struct.ComponentSchema {
  collectionName: 'components_department_faculty_members_abouts';
  info: {
    displayName: 'About';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface DepartmentFacultyMembersContent
  extends Struct.ComponentSchema {
  collectionName: 'components_department_faculty_members_contents';
  info: {
    displayName: 'content';
  };
  attributes: {
    point: Schema.Attribute.String;
  };
}

export interface DepartmentFacultyMembersDetails
  extends Struct.ComponentSchema {
  collectionName: 'components_department_faculty_members_details';
  info: {
    displayName: 'details';
  };
  attributes: {
    content: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentFacultyMembersFacultyMembers
  extends Struct.ComponentSchema {
  collectionName: 'components_department_faculty_members_faculty_members';
  info: {
    displayName: 'Faculty Members';
  };
  attributes: {
    About: Schema.Attribute.Component<'department-faculty-members.about', true>;
    designation: Schema.Attribute.String;
    details: Schema.Attribute.Component<
      'department-faculty-members.details',
      true
    >;
    image: Schema.Attribute.Media<'images' | 'files'>;
    listOfPublications: Schema.Attribute.Component<
      'department-faculty-members.list-of-publications',
      false
    >;
    name: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.Required;
    qualification: Schema.Attribute.String;
  };
}

export interface DepartmentFacultyMembersListOfPublications
  extends Struct.ComponentSchema {
  collectionName: 'components_department_faculty_members_list_of_publications';
  info: {
    displayName: 'listOfPublications';
  };
  attributes: {
    content: Schema.Attribute.Component<
      'department-faculty-members.content',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentPageBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_department_page_banner_sections';
  info: {
    displayName: 'BannerSection';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentPageBooksPublished extends Struct.ComponentSchema {
  collectionName: 'components_department_page_books_publisheds';
  info: {
    displayName: 'Books_Published';
  };
  attributes: {
    Columns: Schema.Attribute.JSON;
    TableRow: Schema.Attribute.Component<'department-page.table-row', true>;
    TabName: Schema.Attribute.String;
  };
}

export interface DepartmentPageDepartmentFaculties
  extends Struct.ComponentSchema {
  collectionName: 'components_department_page_department_faculties';
  info: {
    displayName: 'Department Faculties';
  };
  attributes: {
    Columns: Schema.Attribute.JSON;
    Rows: Schema.Attribute.Component<'department-page.rows', true>;
    TabName: Schema.Attribute.String;
  };
}

export interface DepartmentPageDescriptions extends Struct.ComponentSchema {
  collectionName: 'components_department_page_descriptions';
  info: {
    displayName: 'descriptions';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface DepartmentPageDetails extends Struct.ComponentSchema {
  collectionName: 'components_department_page_details';
  info: {
    displayName: 'Details';
  };
  attributes: {
    descriptions: Schema.Attribute.Component<
      'department-page.descriptions',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentPageFacultyAndPublications
  extends Struct.ComponentSchema {
  collectionName: 'components_department_page_faculty_and_publications';
  info: {
    displayName: 'Faculty_And_Publications';
  };
  attributes: {
    Books_Published: Schema.Attribute.Component<
      'department-page.books-published',
      false
    >;
    Department_Faculties: Schema.Attribute.Component<
      'department-page.department-faculties',
      false
    >;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentPageFacultyPublications
  extends Struct.ComponentSchema {
  collectionName: 'components_department_page_faculty_publications';
  info: {
    displayName: 'Faculty Publications';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface DepartmentPageHods extends Struct.ComponentSchema {
  collectionName: 'components_department_page_hods';
  info: {
    displayName: 'Hods';
  };
  attributes: {
    designation: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    message: Schema.Attribute.Text;
    name: Schema.Attribute.String;
    TabName: Schema.Attribute.String;
  };
}

export interface DepartmentPageInternationalCollaboration
  extends Struct.ComponentSchema {
  collectionName: 'components_department_page_international_collaborations';
  info: {
    displayName: 'International Collaboration';
  };
  attributes: {
    Details: Schema.Attribute.Component<'department-page.details', true>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentPageListPoints extends Struct.ComponentSchema {
  collectionName: 'components_department_page_list_points';
  info: {
    displayName: 'ListPoints';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface DepartmentPageMessageFromHods extends Struct.ComponentSchema {
  collectionName: 'components_department_page_message_from_hods';
  info: {
    displayName: 'Message From Hods';
  };
  attributes: {
    Hods: Schema.Attribute.Component<'department-page.hods', true>;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentPagePoints extends Struct.ComponentSchema {
  collectionName: 'components_department_page_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface DepartmentPageProfessionalCourses
  extends Struct.ComponentSchema {
  collectionName: 'components_department_page_professional_courses';
  info: {
    displayName: 'Professional Courses';
  };
  attributes: {
    TabsSection: Schema.Attribute.Component<
      'department-page.tabs-section',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentPageProgrammes extends Struct.ComponentSchema {
  collectionName: 'components_department_page_programmes';
  info: {
    displayName: 'Programmes';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentPageResearchAndAwards
  extends Struct.ComponentSchema {
  collectionName: 'components_department_page_research_and_awards';
  info: {
    displayName: 'Research And Awards';
  };
  attributes: {
    Sections: Schema.Attribute.Component<'department-page.sections', true>;
    title: Schema.Attribute.String;
  };
}

export interface DepartmentPageRows extends Struct.ComponentSchema {
  collectionName: 'components_department_page_rows';
  info: {
    displayName: 'Rows';
  };
  attributes: {
    Department: Schema.Attribute.String;
    Designation: Schema.Attribute.String;
    Experience: Schema.Attribute.String;
    Name: Schema.Attribute.String;
    Qualification: Schema.Attribute.String;
    Slno: Schema.Attribute.String;
  };
}

export interface DepartmentPageSections extends Struct.ComponentSchema {
  collectionName: 'components_department_page_sections';
  info: {
    displayName: 'Sections';
  };
  attributes: {
    ListPoints: Schema.Attribute.Component<'department-page.list-points', true>;
    TabName: Schema.Attribute.String;
  };
}

export interface DepartmentPageTable extends Struct.ComponentSchema {
  collectionName: 'components_department_page_tables';
  info: {
    displayName: 'Table';
  };
  attributes: {
    TabName: Schema.Attribute.String;
  };
}

export interface DepartmentPageTableRow extends Struct.ComponentSchema {
  collectionName: 'components_department_page_table_rows';
  info: {
    displayName: 'TableRow';
  };
  attributes: {
    Book_Title: Schema.Attribute.String;
    Edition: Schema.Attribute.String;
    Name: Schema.Attribute.String;
    Publication_House: Schema.Attribute.String;
    Slno: Schema.Attribute.String;
    Year_Of_Publishing: Schema.Attribute.String;
  };
}

export interface DepartmentPageTabsSection extends Struct.ComponentSchema {
  collectionName: 'components_department_page_tabs_sections';
  info: {
    displayName: 'TabsSection';
  };
  attributes: {
    points: Schema.Attribute.Component<'department-page.points', true>;
    TabName: Schema.Attribute.String;
  };
}

export interface DepartmentResearchPoints extends Struct.ComponentSchema {
  collectionName: 'components_department_research_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface EcoCellDescription extends Struct.ComponentSchema {
  collectionName: 'components_eco_cell_descriptions';
  info: {
    displayName: 'description';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface EcoCellSections extends Struct.ComponentSchema {
  collectionName: 'components_eco_cell_sections';
  info: {
    displayName: 'Sections';
  };
  attributes: {
    descriptions: Schema.Attribute.Component<'eco-cell.description', true>;
    title: Schema.Attribute.String;
  };
}

export interface EqualOpportunityCellDescription
  extends Struct.ComponentSchema {
  collectionName: 'components_equal_opportunity_cell_descriptions';
  info: {
    displayName: 'description';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface FooterContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_footer_contact_infos';
  info: {
    displayName: 'contactInfo';
  };
  attributes: {
    address: Schema.Attribute.Text;
    address_link: Schema.Attribute.Text;
    email: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'>;
    phone: Schema.Attribute.String;
    rights_reserved: Schema.Attribute.Text;
  };
}

export interface FooterFollow extends Struct.ComponentSchema {
  collectionName: 'components_footer_follows';
  info: {
    displayName: 'follow';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface FooterImportantLinks extends Struct.ComponentSchema {
  collectionName: 'components_footer_important_links';
  info: {
    displayName: 'importantLinks';
  };
  attributes: {
    link: Schema.Attribute.Text;
    pdf: Schema.Attribute.Media<'files'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['link', 'pdf']> &
      Schema.Attribute.Required;
  };
}

export interface GalleryBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_gallery_banner_sections';
  info: {
    displayName: 'BannerSection';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface GalleryImages extends Struct.ComponentSchema {
  collectionName: 'components_gallery_images';
  info: {
    description: '';
    displayName: 'images';
  };
  attributes: {
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    tabName: Schema.Attribute.String;
  };
}

export interface GalleryImagesSection extends Struct.ComponentSchema {
  collectionName: 'components_gallery_images_sections';
  info: {
    displayName: 'imagesSection';
  };
  attributes: {
    tabImages: Schema.Attribute.Component<'gallery.images', true>;
  };
}

export interface HomeAboutDescription extends Struct.ComponentSchema {
  collectionName: 'components_home_about_descriptions';
  info: {
    displayName: 'AboutDescription';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface HomeAboutNdaSection extends Struct.ComponentSchema {
  collectionName: 'components_home_about_nda_sections';
  info: {
    displayName: 'AboutNdaSection';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.JSON;
    image: Schema.Attribute.Media<'images' | 'files'>;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
    url: Schema.Attribute.Text;
  };
}

export interface HomeBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_home_banner_sections';
  info: {
    displayName: 'bannerSection';
  };
  attributes: {
    location: Schema.Attribute.Text;
    slides: Schema.Attribute.Component<'home.slides', true>;
  };
}

export interface HomeBlogs extends Struct.ComponentSchema {
  collectionName: 'components_home_blogs';
  info: {
    displayName: 'Blogs';
  };
  attributes: {};
}

export interface HomeButtons extends Struct.ComponentSchema {
  collectionName: 'components_home_buttons';
  info: {
    displayName: 'buttons';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.Text;
  };
}

export interface HomeCampusLife extends Struct.ComponentSchema {
  collectionName: 'components_home_campus_lives';
  info: {
    displayName: 'CampusLife';
  };
  attributes: {
    title: Schema.Attribute.String;
    Videos: Schema.Attribute.Component<'home.videos', true>;
  };
}

export interface HomeCampusLifeAtNda extends Struct.ComponentSchema {
  collectionName: 'components_home_campus_life_at_ndas';
  info: {
    displayName: 'CampusLifeAtNDA';
  };
  attributes: {
    videoid: Schema.Attribute.Text;
  };
}

export interface HomeCampusLifeAtNdc extends Struct.ComponentSchema {
  collectionName: 'components_home_campus_life_at_ndcs';
  info: {
    displayName: 'CampusLifeAtNDC';
  };
  attributes: {
    videoid: Schema.Attribute.String;
  };
}

export interface HomeCelebratingAcademicYears extends Struct.ComponentSchema {
  collectionName: 'components_home_celebrating_academic_years';
  info: {
    displayName: 'CelebratingAcademicYears';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface HomeCertificateCourses extends Struct.ComponentSchema {
  collectionName: 'components_home_certificate_courses';
  info: {
    displayName: 'certificateCourses';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'>;
    url: Schema.Attribute.Text;
  };
}

export interface HomeData extends Struct.ComponentSchema {
  collectionName: 'components_home_data';
  info: {
    displayName: 'Data';
  };
  attributes: {
    link: Schema.Attribute.Text;
    pdf: Schema.Attribute.Media<'files'>;
    title: Schema.Attribute.String;
  };
}

export interface HomeDescription extends Struct.ComponentSchema {
  collectionName: 'components_home_descriptions';
  info: {
    displayName: 'description';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface HomeEducationAndExcellence extends Struct.ComponentSchema {
  collectionName: 'components_home_education_and_excellences';
  info: {
    displayName: 'Education And Excellence';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.Text;
    prgrammeButtons: Schema.Attribute.Component<'home.prgramme-buttons', true>;
    subTitle: Schema.Attribute.String;
  };
}

export interface HomeEducationExcellence extends Struct.ComponentSchema {
  collectionName: 'components_home_education_excellences';
  info: {
    displayName: 'EducationExcellence';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    ProgrammesButtons: Schema.Attribute.Component<
      'home.programmes-buttons',
      true
    >;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeEducationProgrammes extends Struct.ComponentSchema {
  collectionName: 'components_home_education_programmes';
  info: {
    displayName: 'Education Programmes';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'home.buttons', true>;
    description: Schema.Attribute.Text;
    subTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeExploreCertificateCourses extends Struct.ComponentSchema {
  collectionName: 'components_home_explore_certificate_courses';
  info: {
    displayName: 'ExploreCertificateCourses';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomeHome extends Struct.ComponentSchema {
  collectionName: 'components_home_homes';
  info: {
    description: '';
    displayName: 'Home';
  };
  attributes: {
    AboutNdcSection: Schema.Attribute.Component<
      'home.about-nda-section',
      false
    >;
    bannerSection: Schema.Attribute.Component<'home.banner-section', false>;
    CampusLife: Schema.Attribute.Component<'home.campus-life', false>;
    EducationExcellence: Schema.Attribute.Component<
      'home.education-excellence',
      false
    >;
    ExploreCertificateCourses: Schema.Attribute.Component<
      'home.explore-certificate-courses',
      false
    >;
    NotificationsData: Schema.Attribute.Component<
      'home.notifications-data',
      false
    >;
    Records: Schema.Attribute.Component<'home.records', true>;
    Yrs25Section: Schema.Attribute.Component<'home.yrs25-section', false>;
  };
}

export interface HomeNotificationItems extends Struct.ComponentSchema {
  collectionName: 'components_home_notification_items';
  info: {
    displayName: 'notificationItems';
  };
  attributes: {
    pdf: Schema.Attribute.Media<'files'>;
    title: Schema.Attribute.String;
  };
}

export interface HomeNotificationTabs extends Struct.ComponentSchema {
  collectionName: 'components_home_notification_tabs';
  info: {
    displayName: 'NotificationTabs';
  };
  attributes: {
    Data: Schema.Attribute.Component<'home.data', true>;
    TabName: Schema.Attribute.String;
  };
}

export interface HomeNotifications extends Struct.ComponentSchema {
  collectionName: 'components_home_notifications';
  info: {
    displayName: 'Notifications';
  };
  attributes: {};
}

export interface HomeNotificationsData extends Struct.ComponentSchema {
  collectionName: 'components_home_notifications_data';
  info: {
    displayName: 'NotificationsData';
  };
  attributes: {
    NotificationTabs: Schema.Attribute.Component<
      'home.notification-tabs',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface HomePrgrammeButtons extends Struct.ComponentSchema {
  collectionName: 'components_home_prgramme_buttons';
  info: {
    displayName: 'prgrammeButtons';
  };
  attributes: {
    buttonName: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface HomeProgrammesButtons extends Struct.ComponentSchema {
  collectionName: 'components_home_programmes_buttons';
  info: {
    displayName: ' ProgrammesButtons';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.Text;
  };
}

export interface HomeRecords extends Struct.ComponentSchema {
  collectionName: 'components_home_records';
  info: {
    displayName: 'Records';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    count: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface HomeSlides extends Struct.ComponentSchema {
  collectionName: 'components_home_slides';
  info: {
    displayName: 'slides';
  };
  attributes: {
    bgImage: Schema.Attribute.Media<'images' | 'files'>;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
  };
}

export interface HomeStatusRecords extends Struct.ComponentSchema {
  collectionName: 'components_home_status_records';
  info: {
    displayName: 'Status Records';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images' | 'files'>;
    count: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface HomeVideos extends Struct.ComponentSchema {
  collectionName: 'components_home_videos';
  info: {
    displayName: 'Videos';
  };
  attributes: {
    video_id: Schema.Attribute.String;
  };
}

export interface HomeYrs25Section extends Struct.ComponentSchema {
  collectionName: 'components_home_yrs25_sections';
  info: {
    displayName: 'Yrs25Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface IicBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_iic_banner_sections';
  info: {
    displayName: 'BannerSection';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface IicIicMembers extends Struct.ComponentSchema {
  collectionName: 'components_iic_iic_members';
  info: {
    displayName: 'IIC Members';
  };
  attributes: {
    MembersTable: Schema.Attribute.Component<'iic.members-table', true>;
    title: Schema.Attribute.String;
  };
}

export interface IicMembersTable extends Struct.ComponentSchema {
  collectionName: 'components_iic_members_tables';
  info: {
    displayName: 'Members Table';
  };
  attributes: {
    contact: Schema.Attribute.String;
    designation: Schema.Attribute.String;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface IqacAboutDescription extends Struct.ComponentSchema {
  collectionName: 'components_iqac_about_descriptions';
  info: {
    displayName: 'About Description';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface IqacAboutVisionMissionSections extends Struct.ComponentSchema {
  collectionName: 'components_iqac_about_vision_mission_sections';
  info: {
    displayName: 'About Vision Mission Sections';
  };
  attributes: {
    AboutDescription: Schema.Attribute.Component<
      'iqac.about-description',
      true
    >;
    AccordienSection: Schema.Attribute.Component<
      'iqac.accordien-section',
      true
    >;
    title: Schema.Attribute.String;
    VisionMission: Schema.Attribute.Component<'iqac.vision-mission', false>;
  };
}

export interface IqacAccordienSection extends Struct.ComponentSchema {
  collectionName: 'components_iqac_accordien_sections';
  info: {
    displayName: 'Accordien Section';
  };
  attributes: {
    ListPoints: Schema.Attribute.Component<'iqac.list-points', true>;
    title: Schema.Attribute.String;
  };
}

export interface IqacBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_iqac_banner_sections';
  info: {
    displayName: 'BannerSection';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface IqacCompositionOfIqacCell extends Struct.ComponentSchema {
  collectionName: 'components_iqac_composition_of_iqac_cells';
  info: {
    displayName: 'COMPOSITION OF IQAC CELL';
  };
  attributes: {
    tableSection: Schema.Attribute.Component<'iqac.table-section', true>;
    title: Schema.Attribute.String;
  };
}

export interface IqacListPoints extends Struct.ComponentSchema {
  collectionName: 'components_iqac_list_points';
  info: {
    displayName: 'ListPoints';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface IqacPoints extends Struct.ComponentSchema {
  collectionName: 'components_iqac_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface IqacSections extends Struct.ComponentSchema {
  collectionName: 'components_iqac_sections';
  info: {
    displayName: 'sections';
  };
  attributes: {
    description: Schema.Attribute.Text;
    points: Schema.Attribute.Component<'iqac.points', true>;
    title: Schema.Attribute.String;
  };
}

export interface IqacTableSection extends Struct.ComponentSchema {
  collectionName: 'components_iqac_table_sections';
  info: {
    description: '';
    displayName: 'tableSection';
  };
  attributes: {
    contact: Schema.Attribute.String;
    designation: Schema.Attribute.String;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface IqacVisionMission extends Struct.ComponentSchema {
  collectionName: 'components_iqac_vision_missions';
  info: {
    displayName: 'VisionMission';
  };
  attributes: {
    sections: Schema.Attribute.Component<'iqac.sections', true>;
    title: Schema.Attribute.String;
  };
}

export interface LibraryAboutLibrary extends Struct.ComponentSchema {
  collectionName: 'components_library_about_libraries';
  info: {
    description: '';
    displayName: 'About Library';
  };
  attributes: {
    aboutText: Schema.Attribute.Component<'library.about-text', true>;
    dropdowns: Schema.Attribute.Component<'library.dropdowns', true>;
    title: Schema.Attribute.String;
  };
}

export interface LibraryAboutText extends Struct.ComponentSchema {
  collectionName: 'components_library_about_texts';
  info: {
    description: '';
    displayName: 'aboutText';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface LibraryBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_library_banner_sections';
  info: {
    displayName: 'BannerSection';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface LibraryContactUs extends Struct.ComponentSchema {
  collectionName: 'components_library_contactuses';
  info: {
    displayName: 'ContactUs';
  };
  attributes: {
    description: Schema.Attribute.JSON;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface LibraryDigitalResourc extends Struct.ComponentSchema {
  collectionName: 'components_library_digital_resourcs';
  info: {
    displayName: 'digitalResourc';
  };
  attributes: {
    resoursesTable: Schema.Attribute.Component<
      'library.resourses-table',
      false
    >;
    tabsText: Schema.Attribute.Component<'library.tabs-text', true>;
    title: Schema.Attribute.String;
  };
}

export interface LibraryDigitalResources extends Struct.ComponentSchema {
  collectionName: 'components_library_digital_resources';
  info: {
    description: '';
    displayName: 'Digital Resources';
  };
  attributes: {
    ResoursesTable: Schema.Attribute.Component<'library.table', false>;
    tabs: Schema.Attribute.Component<'library.tabs', true>;
    title: Schema.Attribute.String;
  };
}

export interface LibraryDropdowns extends Struct.ComponentSchema {
  collectionName: 'components_library_dropdowns';
  info: {
    displayName: 'dropdowns';
  };
  attributes: {
    points: Schema.Attribute.Component<'library.points', true>;
    title: Schema.Attribute.String;
  };
}

export interface LibraryEvents extends Struct.ComponentSchema {
  collectionName: 'components_library_events';
  info: {
    displayName: 'events';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface LibraryEventsAndRules extends Struct.ComponentSchema {
  collectionName: 'components_library_events_and_rules';
  info: {
    displayName: 'Events And Rules';
  };
  attributes: {
    events: Schema.Attribute.Component<'library.events', true>;
    rulesRegulations: Schema.Attribute.Component<
      'library.rules-regulations',
      false
    >;
    title: Schema.Attribute.String;
  };
}

export interface LibraryPoints extends Struct.ComponentSchema {
  collectionName: 'components_library_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface LibraryResourceEntry extends Struct.ComponentSchema {
  collectionName: 'components_library_resource_entries';
  info: {
    description: '';
    displayName: 'resource-entry';
  };
  attributes: {
    category: Schema.Attribute.String;
    link: Schema.Attribute.Text;
    name: Schema.Attribute.String;
  };
}

export interface LibraryResoursesTable extends Struct.ComponentSchema {
  collectionName: 'components_library_resourses_tables';
  info: {
    displayName: 'resourses-table';
  };
  attributes: {
    entries: Schema.Attribute.Component<'library.resource-entry', true>;
  };
}

export interface LibraryRulesRegulations extends Struct.ComponentSchema {
  collectionName: 'components_library_rules_regulations';
  info: {
    displayName: 'rulesRegulations';
  };
  attributes: {
    sections: Schema.Attribute.Component<'library.sections', true>;
    title: Schema.Attribute.String;
  };
}

export interface LibrarySections extends Struct.ComponentSchema {
  collectionName: 'components_library_sections';
  info: {
    displayName: 'sections';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface LibraryTable extends Struct.ComponentSchema {
  collectionName: 'components_library_tables';
  info: {
    displayName: 'Table';
  };
  attributes: {};
}

export interface LibraryTabs extends Struct.ComponentSchema {
  collectionName: 'components_library_tabs';
  info: {
    displayName: 'tabs';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

export interface LibraryTabsText extends Struct.ComponentSchema {
  collectionName: 'components_library_tabs_texts';
  info: {
    displayName: 'tabsText';
  };
  attributes: {
    tab: Schema.Attribute.String;
  };
}

export interface ObjectivesPoints extends Struct.ComponentSchema {
  collectionName: 'components_objectives_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface ProgrammeDetailsKey extends Struct.ComponentSchema {
  collectionName: 'components_programme_details_keys';
  info: {
    displayName: 'key';
  };
  attributes: {
    label: Schema.Attribute.String;
    sections: Schema.Attribute.Component<'programme-details.sections', true>;
    value: Schema.Attribute.String;
  };
}

export interface ProgrammeDetailsPoints extends Struct.ComponentSchema {
  collectionName: 'components_programme_details_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface ProgrammeDetailsSections extends Struct.ComponentSchema {
  collectionName: 'components_programme_details_sections';
  info: {
    displayName: 'sections';
  };
  attributes: {
    points: Schema.Attribute.Component<'programme-details.points', true>;
    title: Schema.Attribute.String;
  };
}

export interface QuestionBankSemester extends Struct.ComponentSchema {
  collectionName: 'components_question_bank_semesters';
  info: {
    displayName: 'Semester';
  };
  attributes: {
    Semester: Schema.Attribute.String;
    Subjects: Schema.Attribute.Component<'question-bank.subjects', true>;
  };
}

export interface QuestionBankSubjectData extends Struct.ComponentSchema {
  collectionName: 'components_question_bank_subject_data';
  info: {
    displayName: 'SubjectData';
  };
  attributes: {
    SubjectName: Schema.Attribute.String;
    SubjectPdf: Schema.Attribute.Media<'files'>;
  };
}

export interface QuestionBankSubjects extends Struct.ComponentSchema {
  collectionName: 'components_question_bank_subjects';
  info: {
    displayName: 'Subjects';
  };
  attributes: {
    SubjectName: Schema.Attribute.String;
    SubjectPdf: Schema.Attribute.Media<'files'>;
  };
}

export interface QuestionBankYear extends Struct.ComponentSchema {
  collectionName: 'components_question_bank_years';
  info: {
    displayName: 'Year';
  };
  attributes: {
    Semester: Schema.Attribute.Component<'question-bank.semester', true>;
    Year: Schema.Attribute.String;
  };
}

export interface ResearchForumBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_research_forum_banner_sections';
  info: {
    displayName: 'BannerSection';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface ResearchForumDescription extends Struct.ComponentSchema {
  collectionName: 'components_research_forum_descriptions';
  info: {
    displayName: 'description';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface ResearchForumList extends Struct.ComponentSchema {
  collectionName: 'components_research_forum_lists';
  info: {
    displayName: 'list';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface ResearchForumResearchForum extends Struct.ComponentSchema {
  collectionName: 'components_research_forum_research_forums';
  info: {
    displayName: 'Research Forum';
  };
  attributes: {
    description: Schema.Attribute.Component<'research-forum.description', true>;
    listOfPoints: Schema.Attribute.Component<'research-forum.list', true>;
    title: Schema.Attribute.String;
  };
}

export interface ResearchBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_research_banner_sections';
  info: {
    displayName: 'BannerSection';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface ResearchPoints extends Struct.ComponentSchema {
  collectionName: 'components_research_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface ResearchResearchPublications extends Struct.ComponentSchema {
  collectionName: 'components_research_research_publications';
  info: {
    displayName: 'ResearchPublications';
  };
  attributes: {
    sections: Schema.Attribute.Component<'research.sections', true>;
    title: Schema.Attribute.String;
  };
}

export interface ResearchSections extends Struct.ComponentSchema {
  collectionName: 'components_research_sections';
  info: {
    description: '';
    displayName: 'sections';
  };
  attributes: {
    points: Schema.Attribute.Component<'research.points', true>;
    title: Schema.Attribute.String;
  };
}

export interface SamashtiAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_samashti_about_sections';
  info: {
    description: '';
    displayName: 'aboutSection';
  };
  attributes: {
    descriptions: Schema.Attribute.Component<'samashti.description', true>;
    title: Schema.Attribute.String;
  };
}

export interface SamashtiBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_samashti_banner_sections';
  info: {
    description: '';
    displayName: 'banner-section';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface SamashtiButtons extends Struct.ComponentSchema {
  collectionName: 'components_samashti_buttons';
  info: {
    displayName: 'Buttons';
    icon: 'cursor';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface SamashtiDescription extends Struct.ComponentSchema {
  collectionName: 'components_samashti_descriptions';
  info: {
    displayName: 'description';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface SamashtiEditions extends Struct.ComponentSchema {
  collectionName: 'components_samashti_editions';
  info: {
    description: '';
    displayName: 'Editions';
  };
  attributes: {
    Buttons: Schema.Attribute.JSON;
    discription: Schema.Attribute.Text;
    Editions: Schema.Attribute.Component<'samashti.pdfs', true>;
    title: Schema.Attribute.String;
  };
}

export interface SamashtiPdfs extends Struct.ComponentSchema {
  collectionName: 'components_samashti_pdfs';
  info: {
    description: '';
    displayName: 'pdfs';
    icon: 'attachment';
  };
  attributes: {
    date: Schema.Attribute.String;
    image: Schema.Attribute.Media<'files' | 'images'>;
    pdf: Schema.Attribute.Media<'files'>;
    title: Schema.Attribute.String;
  };
}

export interface SamashtiPrograms extends Struct.ComponentSchema {
  collectionName: 'components_samashti_programs';
  info: {
    description: '';
    displayName: 'program';
  };
  attributes: {
    date: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    pdf: Schema.Attribute.Media<'files'>;
    title: Schema.Attribute.String;
  };
}

export interface SportsAboutSections extends Struct.ComponentSchema {
  collectionName: 'components_sports_about_sections';
  info: {
    displayName: 'aboutSections';
  };
  attributes: {
    sections: Schema.Attribute.Component<'sports.sections', true>;
    title: Schema.Attribute.String;
  };
}

export interface SportsBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_sports_banner_sections';
  info: {
    displayName: 'BannerSection';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface SportsGallerySection extends Struct.ComponentSchema {
  collectionName: 'components_sports_gallery_sections';
  info: {
    displayName: 'gallerySection';
  };
  attributes: {
    images: Schema.Attribute.Media<'images' | 'files', true>;
    title: Schema.Attribute.String;
  };
}

export interface SportsHodMessage extends Struct.ComponentSchema {
  collectionName: 'components_sports_hod_messages';
  info: {
    displayName: 'Hod Message';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    message: Schema.Attribute.Component<'sports.message', true>;
    name: Schema.Attribute.String;
    position: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SportsMessage extends Struct.ComponentSchema {
  collectionName: 'components_sports_messages';
  info: {
    displayName: 'message';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface SportsPoints extends Struct.ComponentSchema {
  collectionName: 'components_sports_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface SportsSections extends Struct.ComponentSchema {
  collectionName: 'components_sports_sections';
  info: {
    displayName: 'sections';
  };
  attributes: {
    description: Schema.Attribute.Text;
    points: Schema.Attribute.Component<'sports.points', true>;
    title: Schema.Attribute.String;
  };
}

export interface StudentsGrievanceRedressalCellDescriptions
  extends Struct.ComponentSchema {
  collectionName: 'components_students_grievance_redressal_cell_descriptions';
  info: {
    displayName: 'descriptions';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface StudentsGrievanceRedressalCellImagesSection
  extends Struct.ComponentSchema {
  collectionName: 'components_students_grievance_redressal_cell_images_sections';
  info: {
    displayName: 'Images Section';
  };
  attributes: {
    images: Schema.Attribute.Media<'images' | 'files', true>;
    title: Schema.Attribute.String;
  };
}

export interface StudentsGrievanceRedressalCellPoints
  extends Struct.ComponentSchema {
  collectionName: 'components_students_grievance_redressal_cell_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface StudentsGrievanceRedressalCellProceduresSection
  extends Struct.ComponentSchema {
  collectionName: 'components_students_grievance_redressal_cell_procedures_sections';
  info: {
    displayName: 'Procedures Section';
    repeatable: true;
  };
  attributes: {
    descriptions: Schema.Attribute.Component<
      'students-grievance-redressal-cell.descriptions',
      true
    >;
    Points: Schema.Attribute.Component<
      'students-grievance-redressal-cell.points',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface StudentsBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_students_banner_sections';
  info: {
    description: '';
    displayName: 'BannerSection';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface StudentsCareerAdvancementCenter
  extends Struct.ComponentSchema {
  collectionName: 'components_students_career_advancement_centers';
  info: {
    description: '';
    displayName: 'Career Advancement Center';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    PlacementPartnersImages: Schema.Attribute.Media<'images', true>;
    sections: Schema.Attribute.Component<'students.sections', true>;
    title: Schema.Attribute.String;
  };
}

export interface StudentsFacilitiesTable extends Struct.ComponentSchema {
  collectionName: 'components_students_facilities_tables';
  info: {
    displayName: 'facilitiesTable';
  };
  attributes: {
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface StudentsGuideLines extends Struct.ComponentSchema {
  collectionName: 'components_students_guide_lines';
  info: {
    displayName: 'GuideLines';
  };
  attributes: {
    points: Schema.Attribute.Component<'students.points', true>;
    title: Schema.Attribute.String;
  };
}

export interface StudentsList extends Struct.ComponentSchema {
  collectionName: 'components_students_lists';
  info: {
    displayName: 'list';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface StudentsMentoringCell extends Struct.ComponentSchema {
  collectionName: 'components_students_mentoring_cells';
  info: {
    displayName: 'Mentoring Cell';
  };
  attributes: {
    description: Schema.Attribute.Text;
    GuideLines: Schema.Attribute.Component<'students.guide-lines', false>;
    table: Schema.Attribute.Component<'students.table', true>;
    title: Schema.Attribute.String;
  };
}

export interface StudentsPlacementPartners extends Struct.ComponentSchema {
  collectionName: 'components_students_placement_partners';
  info: {
    displayName: 'PlacementPartners';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface StudentsPoints extends Struct.ComponentSchema {
  collectionName: 'components_students_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface StudentsProcedurePoints extends Struct.ComponentSchema {
  collectionName: 'components_students_procedure_points';
  info: {
    displayName: 'procedure points';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface StudentsProcedureSection extends Struct.ComponentSchema {
  collectionName: 'components_students_procedure_sections';
  info: {
    displayName: 'Procedure Section';
  };
  attributes: {
    procedurepoints: Schema.Attribute.Component<
      'students.procedure-points',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface StudentsRedressalCellSection extends Struct.ComponentSchema {
  collectionName: 'components_students_redressal_cell_sections';
  info: {
    description: '';
    displayName: 'REDRESSAL CELL SECTION';
  };
  attributes: {
    description: Schema.Attribute.Text;
    ProcedureSection: Schema.Attribute.Component<
      'students.procedure-section',
      false
    >;
    sections: Schema.Attribute.Component<'students.sections', true>;
    TableSection: Schema.Attribute.Component<'students.table-section', true>;
    title: Schema.Attribute.String;
  };
}

export interface StudentsSections extends Struct.ComponentSchema {
  collectionName: 'components_students_sections';
  info: {
    description: '';
    displayName: 'sections';
  };
  attributes: {
    description: Schema.Attribute.Text;
    list: Schema.Attribute.Component<'students.list', true>;
    title: Schema.Attribute.String;
  };
}

export interface StudentsTable extends Struct.ComponentSchema {
  collectionName: 'components_students_tables';
  info: {
    displayName: 'table';
  };
  attributes: {
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface StudentsTableSection extends Struct.ComponentSchema {
  collectionName: 'components_students_table_sections';
  info: {
    displayName: 'TableSection';
  };
  attributes: {
    contactNumber: Schema.Attribute.String;
    designation: Schema.Attribute.String;
    Email: Schema.Attribute.String;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface StudentsTrainingPlacementAndInternshipCell
  extends Struct.ComponentSchema {
  collectionName: 'components_students_training_placement_and_internship_cells';
  info: {
    description: '';
    displayName: 'Training, Placement & Internship Cell';
  };
  attributes: {
    description: Schema.Attribute.Text;
    facilitiesTable: Schema.Attribute.Component<
      'students.facilities-table',
      true
    >;
    images: Schema.Attribute.Media<'images', true>;
    sections: Schema.Attribute.Component<'students.sections', true>;
    title: Schema.Attribute.String;
  };
}

export interface SyllabusDetailsRows extends Struct.ComponentSchema {
  collectionName: 'components_syllabus_details_rows';
  info: {
    displayName: 'rows';
  };
  attributes: {
    courses: Schema.Attribute.Text;
    name: Schema.Attribute.String;
  };
}

export interface SyllabusDetailsSyllabusSection extends Struct.ComponentSchema {
  collectionName: 'components_syllabus_details_syllabus_sections';
  info: {
    displayName: 'syllabusSection';
  };
  attributes: {
    rows: Schema.Attribute.Component<'syllabus-details.rows', true>;
    tabName: Schema.Attribute.String;
  };
}

export interface VisionMissionPoints extends Struct.ComponentSchema {
  collectionName: 'components_vision_mission_points';
  info: {
    displayName: 'points';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface VisionMissionSections extends Struct.ComponentSchema {
  collectionName: 'components_vision_mission_sections';
  info: {
    displayName: 'sections';
  };
  attributes: {
    description: Schema.Attribute.Text;
    points: Schema.Attribute.Component<'vision-mission.points', true>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about-department.points': AboutDepartmentPoints;
      'about-department.sections': AboutDepartmentSections;
      'about-department.vision': AboutDepartmentVision;
      'about-us.about': AboutUsAbout;
      'about-us.campuses': AboutUsCampuses;
      'about-us.content': AboutUsContent;
      'about-us.description': AboutUsDescription;
      'about-us.dropdowns': AboutUsDropdowns;
      'about-us.governing-council-members': AboutUsGoverningCouncilMembers;
      'about-us.items': AboutUsItems;
      'about-us.members': AboutUsMembers;
      'about-us.message': AboutUsMessage;
      'about-us.news-letter': AboutUsNewsLetter;
      'about-us.our-campuses': AboutUsOurCampuses;
      'about-us.principal-message': AboutUsPrincipalMessage;
      'about-us.sections': AboutUsSections;
      'about-us.vision-mission': AboutUsVisionMission;
      'activities-page.about': ActivitiesPageAbout;
      'activities-page.activities': ActivitiesPageActivities;
      'activities-page.banner-section': ActivitiesPageBannerSection;
      'activities-page.cultural-and-leadership-activities': ActivitiesPageCulturalAndLeadershipActivities;
      'activities-page.descriptions': ActivitiesPageDescriptions;
      'activities-page.know-every-thing': ActivitiesPageKnowEveryThing;
      'activities-page.list-points': ActivitiesPageListPoints;
      'activities-page.other-sections': ActivitiesPageOtherSections;
      'activities-page.points': ActivitiesPagePoints;
      'activities-page.rows': ActivitiesPageRows;
      'activities-page.sections': ActivitiesPageSections;
      'activities-page.table-section': ActivitiesPageTableSection;
      'activities-page.vision-mission': ActivitiesPageVisionMission;
      'activities.activities-content': ActivitiesActivitiesContent;
      'activities.images': ActivitiesImages;
      'activities.sections': ActivitiesSections;
      'admissions.application-procedure': AdmissionsApplicationProcedure;
      'admissions.banner-section': AdmissionsBannerSection;
      'admissions.content': AdmissionsContent;
      'admissions.courses-eligibility': AdmissionsCoursesEligibility;
      'admissions.importent-documents': AdmissionsImportentDocuments;
      'admissions.procedures': AdmissionsProcedures;
      'admissions.programme-tabs': AdmissionsProgrammeTabs;
      'admissions.row-content': AdmissionsRowContent;
      'admissions.tabs': AdmissionsTabs;
      'admissions.tabs-content': AdmissionsTabsContent;
      'admissions.tabs-courses': AdmissionsTabsCourses;
      'admissions.tabs-data': AdmissionsTabsData;
      'alumni.alumni-assciation': AlumniAlumniAssciation;
      'alumni.banner-section': AlumniBannerSection;
      'alumni.description': AlumniDescription;
      'alumni.points': AlumniPoints;
      'alumni.sections': AlumniSections;
      'alumni.vision-mission': AlumniVisionMission;
      'anti-ragging-cell.anti-ragging-committe-members': AntiRaggingCellAntiRaggingCommitteMembers;
      'anti-ragging-cell.banner-section': AntiRaggingCellBannerSection;
      'anti-ragging-cell.description': AntiRaggingCellDescription;
      'anti-ragging-cell.points': AntiRaggingCellPoints;
      'anti-ragging-cell.policy-and-considerations': AntiRaggingCellPolicyAndConsiderations;
      'anti-ragging-cell.table-section': AntiRaggingCellTableSection;
      'anti-ragging-cell.tabs-section': AntiRaggingCellTabsSection;
      'apply-now.banner-section': ApplyNowBannerSection;
      'blogs.blogs': BlogsBlogs;
      'blogs.content': BlogsContent;
      'books-patients.books': BooksPatientsBooks;
      'books-patients.books-table': BooksPatientsBooksTable;
      'books-patients.patient-right': BooksPatientsPatientRight;
      'books-patients.patient-rights-table': BooksPatientsPatientRightsTable;
      'certificate-courses.banner-section': CertificateCoursesBannerSection;
      'certificate-courses.course-outcome': CertificateCoursesCourseOutcome;
      'certificate-courses.description': CertificateCoursesDescription;
      'certificate-courses.images': CertificateCoursesImages;
      'certificate-courses.row': CertificateCoursesRow;
      'certificate-courses.table': CertificateCoursesTable;
      'contact-us.banner-section': ContactUsBannerSection;
      'contact-us.contact-details': ContactUsContactDetails;
      'contact-us.details': ContactUsDetails;
      'contact-us.login-portals': ContactUsLoginPortals;
      'contact-us.map': ContactUsMap;
      'contact-us.points': ContactUsPoints;
      'department-faculty-members.about': DepartmentFacultyMembersAbout;
      'department-faculty-members.content': DepartmentFacultyMembersContent;
      'department-faculty-members.details': DepartmentFacultyMembersDetails;
      'department-faculty-members.faculty-members': DepartmentFacultyMembersFacultyMembers;
      'department-faculty-members.list-of-publications': DepartmentFacultyMembersListOfPublications;
      'department-page.banner-section': DepartmentPageBannerSection;
      'department-page.books-published': DepartmentPageBooksPublished;
      'department-page.department-faculties': DepartmentPageDepartmentFaculties;
      'department-page.descriptions': DepartmentPageDescriptions;
      'department-page.details': DepartmentPageDetails;
      'department-page.faculty-and-publications': DepartmentPageFacultyAndPublications;
      'department-page.faculty-publications': DepartmentPageFacultyPublications;
      'department-page.hods': DepartmentPageHods;
      'department-page.international-collaboration': DepartmentPageInternationalCollaboration;
      'department-page.list-points': DepartmentPageListPoints;
      'department-page.message-from-hods': DepartmentPageMessageFromHods;
      'department-page.points': DepartmentPagePoints;
      'department-page.professional-courses': DepartmentPageProfessionalCourses;
      'department-page.programmes': DepartmentPageProgrammes;
      'department-page.research-and-awards': DepartmentPageResearchAndAwards;
      'department-page.rows': DepartmentPageRows;
      'department-page.sections': DepartmentPageSections;
      'department-page.table': DepartmentPageTable;
      'department-page.table-row': DepartmentPageTableRow;
      'department-page.tabs-section': DepartmentPageTabsSection;
      'department-research.points': DepartmentResearchPoints;
      'eco-cell.description': EcoCellDescription;
      'eco-cell.sections': EcoCellSections;
      'equal-opportunity-cell.description': EqualOpportunityCellDescription;
      'footer.contact-info': FooterContactInfo;
      'footer.follow': FooterFollow;
      'footer.important-links': FooterImportantLinks;
      'gallery.banner-section': GalleryBannerSection;
      'gallery.images': GalleryImages;
      'gallery.images-section': GalleryImagesSection;
      'home.about-description': HomeAboutDescription;
      'home.about-nda-section': HomeAboutNdaSection;
      'home.banner-section': HomeBannerSection;
      'home.blogs': HomeBlogs;
      'home.buttons': HomeButtons;
      'home.campus-life': HomeCampusLife;
      'home.campus-life-at-nda': HomeCampusLifeAtNda;
      'home.campus-life-at-ndc': HomeCampusLifeAtNdc;
      'home.celebrating-academic-years': HomeCelebratingAcademicYears;
      'home.certificate-courses': HomeCertificateCourses;
      'home.data': HomeData;
      'home.description': HomeDescription;
      'home.education-and-excellence': HomeEducationAndExcellence;
      'home.education-excellence': HomeEducationExcellence;
      'home.education-programmes': HomeEducationProgrammes;
      'home.explore-certificate-courses': HomeExploreCertificateCourses;
      'home.home': HomeHome;
      'home.notification-items': HomeNotificationItems;
      'home.notification-tabs': HomeNotificationTabs;
      'home.notifications': HomeNotifications;
      'home.notifications-data': HomeNotificationsData;
      'home.prgramme-buttons': HomePrgrammeButtons;
      'home.programmes-buttons': HomeProgrammesButtons;
      'home.records': HomeRecords;
      'home.slides': HomeSlides;
      'home.status-records': HomeStatusRecords;
      'home.videos': HomeVideos;
      'home.yrs25-section': HomeYrs25Section;
      'iic.banner-section': IicBannerSection;
      'iic.iic-members': IicIicMembers;
      'iic.members-table': IicMembersTable;
      'iqac.about-description': IqacAboutDescription;
      'iqac.about-vision-mission-sections': IqacAboutVisionMissionSections;
      'iqac.accordien-section': IqacAccordienSection;
      'iqac.banner-section': IqacBannerSection;
      'iqac.composition-of-iqac-cell': IqacCompositionOfIqacCell;
      'iqac.list-points': IqacListPoints;
      'iqac.points': IqacPoints;
      'iqac.sections': IqacSections;
      'iqac.table-section': IqacTableSection;
      'iqac.vision-mission': IqacVisionMission;
      'library.about-library': LibraryAboutLibrary;
      'library.about-text': LibraryAboutText;
      'library.banner-section': LibraryBannerSection;
      'library.contact-us': LibraryContactUs;
      'library.digital-resourc': LibraryDigitalResourc;
      'library.digital-resources': LibraryDigitalResources;
      'library.dropdowns': LibraryDropdowns;
      'library.events': LibraryEvents;
      'library.events-and-rules': LibraryEventsAndRules;
      'library.points': LibraryPoints;
      'library.resource-entry': LibraryResourceEntry;
      'library.resourses-table': LibraryResoursesTable;
      'library.rules-regulations': LibraryRulesRegulations;
      'library.sections': LibrarySections;
      'library.table': LibraryTable;
      'library.tabs': LibraryTabs;
      'library.tabs-text': LibraryTabsText;
      'objectives.points': ObjectivesPoints;
      'programme-details.key': ProgrammeDetailsKey;
      'programme-details.points': ProgrammeDetailsPoints;
      'programme-details.sections': ProgrammeDetailsSections;
      'question-bank.semester': QuestionBankSemester;
      'question-bank.subject-data': QuestionBankSubjectData;
      'question-bank.subjects': QuestionBankSubjects;
      'question-bank.year': QuestionBankYear;
      'research-forum.banner-section': ResearchForumBannerSection;
      'research-forum.description': ResearchForumDescription;
      'research-forum.list': ResearchForumList;
      'research-forum.research-forum': ResearchForumResearchForum;
      'research.banner-section': ResearchBannerSection;
      'research.points': ResearchPoints;
      'research.research-publications': ResearchResearchPublications;
      'research.sections': ResearchSections;
      'samashti.about-section': SamashtiAboutSection;
      'samashti.banner-section': SamashtiBannerSection;
      'samashti.buttons': SamashtiButtons;
      'samashti.description': SamashtiDescription;
      'samashti.editions': SamashtiEditions;
      'samashti.pdfs': SamashtiPdfs;
      'samashti.programs': SamashtiPrograms;
      'sports.about-sections': SportsAboutSections;
      'sports.banner-section': SportsBannerSection;
      'sports.gallery-section': SportsGallerySection;
      'sports.hod-message': SportsHodMessage;
      'sports.message': SportsMessage;
      'sports.points': SportsPoints;
      'sports.sections': SportsSections;
      'students-grievance-redressal-cell.descriptions': StudentsGrievanceRedressalCellDescriptions;
      'students-grievance-redressal-cell.images-section': StudentsGrievanceRedressalCellImagesSection;
      'students-grievance-redressal-cell.points': StudentsGrievanceRedressalCellPoints;
      'students-grievance-redressal-cell.procedures-section': StudentsGrievanceRedressalCellProceduresSection;
      'students.banner-section': StudentsBannerSection;
      'students.career-advancement-center': StudentsCareerAdvancementCenter;
      'students.facilities-table': StudentsFacilitiesTable;
      'students.guide-lines': StudentsGuideLines;
      'students.list': StudentsList;
      'students.mentoring-cell': StudentsMentoringCell;
      'students.placement-partners': StudentsPlacementPartners;
      'students.points': StudentsPoints;
      'students.procedure-points': StudentsProcedurePoints;
      'students.procedure-section': StudentsProcedureSection;
      'students.redressal-cell-section': StudentsRedressalCellSection;
      'students.sections': StudentsSections;
      'students.table': StudentsTable;
      'students.table-section': StudentsTableSection;
      'students.training-placement-and-internship-cell': StudentsTrainingPlacementAndInternshipCell;
      'syllabus-details.rows': SyllabusDetailsRows;
      'syllabus-details.syllabus-section': SyllabusDetailsSyllabusSection;
      'vision-mission.points': VisionMissionPoints;
      'vision-mission.sections': VisionMissionSections;
    }
  }
}
