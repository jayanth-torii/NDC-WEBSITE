import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAboutDepartmentAboutDepartment
  extends Struct.CollectionTypeSchema {
  collectionName: 'about_departments';
  info: {
    description: '';
    displayName: 'About Department';
    pluralName: 'about-departments';
    singularName: 'about-department';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::about-department.about-department'
    > &
      Schema.Attribute.Private;
    mission: Schema.Attribute.Component<'about-department.vision', true>;
    publishedAt: Schema.Attribute.DateTime;
    sections: Schema.Attribute.Component<'about-department.sections', true>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    vision: Schema.Attribute.Component<'about-department.vision', true>;
  };
}

export interface ApiAboutUsAboutUs extends Struct.SingleTypeSchema {
  collectionName: 'about_uses';
  info: {
    description: '';
    displayName: 'AboutUs';
    pluralName: 'about-uses';
    singularName: 'about-us';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutUs: Schema.Attribute.Component<'about-us.about', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    GoverningCouncilMembers: Schema.Attribute.Component<
      'about-us.governing-council-members',
      false
    >;
    ImportantConsiderations: Schema.Attribute.Component<
      'about-us.news-letter',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::about-us.about-us'
    > &
      Schema.Attribute.Private;
    NewsLetter: Schema.Attribute.Component<'about-us.news-letter', false>;
    OurCampuses: Schema.Attribute.Component<'about-us.our-campuses', false>;
    PrincipalMessage: Schema.Attribute.Component<
      'about-us.principal-message',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    VisionMission: Schema.Attribute.Component<'about-us.vision-mission', false>;
  };
}

export interface ApiActivitieActivitie extends Struct.CollectionTypeSchema {
  collectionName: 'activities';
  info: {
    description: '';
    displayName: 'Activities';
    pluralName: 'activities';
    singularName: 'activitie';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    activitiesContent: Schema.Attribute.Component<
      'activities.activities-content',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::activitie.activitie'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiActivitiesPageActivitiesPage
  extends Struct.SingleTypeSchema {
  collectionName: 'activities_pages';
  info: {
    displayName: 'Activities Page';
    pluralName: 'activities-pages';
    singularName: 'activities-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Activities: Schema.Attribute.Component<'activities-page.activities', false>;
    BannerSection: Schema.Attribute.Component<
      'activities-page.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Cultural_And_Leadership_Activities: Schema.Attribute.Component<
      'activities-page.cultural-and-leadership-activities',
      false
    >;
    Know_Every_Thing: Schema.Attribute.Component<
      'activities-page.know-every-thing',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::activities-page.activities-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAdmissionProcessAdmissionProcess
  extends Struct.CollectionTypeSchema {
  collectionName: 'admission_processes';
  info: {
    displayName: 'Admission Process';
    pluralName: 'admission-processes';
    singularName: 'admission-process';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::admission-process.admission-process'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sections: Schema.Attribute.Component<'vision-mission.sections', false>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAdmissionAdmission extends Struct.SingleTypeSchema {
  collectionName: 'admissions';
  info: {
    description: '';
    displayName: 'Admission';
    pluralName: 'admissions';
    singularName: 'admission';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    applicationProcedure: Schema.Attribute.Component<
      'admissions.application-procedure',
      false
    >;
    BannerSection: Schema.Attribute.Component<
      'admissions.banner-section',
      false
    >;
    coursesEligibility: Schema.Attribute.Component<
      'admissions.courses-eligibility',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ImportentDocuments: Schema.Attribute.Component<
      'admissions.importent-documents',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::admission.admission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAlumniAlumni extends Struct.SingleTypeSchema {
  collectionName: 'alumnis';
  info: {
    description: '';
    displayName: 'Alumni';
    pluralName: 'alumnis';
    singularName: 'alumni';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AlumniAssciation: Schema.Attribute.Component<
      'alumni.alumni-assciation',
      false
    >;
    BannerSection: Schema.Attribute.Component<'alumni.banner-section', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::alumni.alumni'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    VisionMission: Schema.Attribute.Component<'alumni.vision-mission', false>;
  };
}

export interface ApiAmbedkarStudyCircleAmbedkarStudyCircle
  extends Struct.SingleTypeSchema {
  collectionName: 'ambedkar_study_circles';
  info: {
    displayName: 'Ambedkar Study Circle';
    pluralName: 'ambedkar-study-circles';
    singularName: 'ambedkar-study-circle';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutVisionMissionSections: Schema.Attribute.Component<
      'iqac.about-vision-mission-sections',
      false
    >;
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ForumCoordinators: Schema.Attribute.Component<
      'anti-ragging-cell.anti-ragging-committe-members',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ambedkar-study-circle.ambedkar-study-circle'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAntiRaggingCellAntiRaggingCell
  extends Struct.SingleTypeSchema {
  collectionName: 'anti_ragging_cells';
  info: {
    displayName: 'Anti Ragging Cell ';
    pluralName: 'anti-ragging-cells';
    singularName: 'anti-ragging-cell';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutSections: Schema.Attribute.Component<
      'iqac.about-vision-mission-sections',
      false
    >;
    AntiRaggingCommitteMembers: Schema.Attribute.Component<
      'anti-ragging-cell.anti-ragging-committe-members',
      false
    >;
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::anti-ragging-cell.anti-ragging-cell'
    > &
      Schema.Attribute.Private;
    PolicyAndConsiderations: Schema.Attribute.Component<
      'anti-ragging-cell.policy-and-considerations',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAntiSexualHarassmentCellAntiSexualHarassmentCell
  extends Struct.SingleTypeSchema {
  collectionName: 'anti_sexual_harassment_cells';
  info: {
    description: '';
    displayName: 'Anti Sexual Harassment Cell';
    pluralName: 'anti-sexual-harassment-cells';
    singularName: 'anti-sexual-harassment-cell';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutVisionMissionSections: Schema.Attribute.Component<
      'iqac.about-vision-mission-sections',
      false
    >;
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Definitions: Schema.Attribute.Component<
      'students-grievance-redressal-cell.procedures-section',
      true
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::anti-sexual-harassment-cell.anti-sexual-harassment-cell'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiApplyNowFormApplyNowForm
  extends Struct.CollectionTypeSchema {
  collectionName: 'apply_now_forms';
  info: {
    displayName: 'Apply Now Form';
    pluralName: 'apply-now-forms';
    singularName: 'apply-now-form';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    course: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    district: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    fullName: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::apply-now-form.apply-now-form'
    > &
      Schema.Attribute.Private;
    phoneNumber: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    state: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiApplyNowApplyNow extends Struct.SingleTypeSchema {
  collectionName: 'apply_nows';
  info: {
    description: '';
    displayName: 'Apply Now';
    pluralName: 'apply-nows';
    singularName: 'apply-now';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BannerSection: Schema.Attribute.Component<
      'apply-now.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::apply-now.apply-now'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBlogsContentBlogsContent extends Struct.SingleTypeSchema {
  collectionName: 'blogs_contents';
  info: {
    displayName: 'Blogs Content';
    pluralName: 'blogs-contents';
    singularName: 'blogs-content';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Blogs: Schema.Attribute.Component<'blogs.blogs', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::blogs-content.blogs-content'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBooksPatientBooksPatient
  extends Struct.CollectionTypeSchema {
  collectionName: 'books_patients';
  info: {
    description: '';
    displayName: 'BooksPatients';
    pluralName: 'books-patients';
    singularName: 'books-patient';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Books: Schema.Attribute.Component<'books-patients.books', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::books-patient.books-patient'
    > &
      Schema.Attribute.Private;
    Patient_Right: Schema.Attribute.Component<
      'books-patients.patient-right',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCertificateCourseCertificateCourse
  extends Struct.SingleTypeSchema {
  collectionName: 'certificate_courses';
  info: {
    displayName: 'Certificate Course';
    pluralName: 'certificate-courses';
    singularName: 'certificate-course';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutVisionMissionSections: Schema.Attribute.Component<
      'iqac.about-vision-mission-sections',
      false
    >;
    BannerSection: Schema.Attribute.Component<
      'certificate-courses.banner-section',
      false
    >;
    CourseOutcome: Schema.Attribute.Component<
      'certificate-courses.course-outcome',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Images: Schema.Attribute.Component<'certificate-courses.images', false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::certificate-course.certificate-course'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCommerceAndManagementForumCommerceAndManagementForum
  extends Struct.SingleTypeSchema {
  collectionName: 'commerce_and_management_forums';
  info: {
    displayName: 'Commerce And Management Forum';
    pluralName: 'commerce-and-management-forums';
    singularName: 'commerce-and-management-forum';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutVisionMissionSections: Schema.Attribute.Component<
      'iqac.about-vision-mission-sections',
      false
    >;
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ForumCoordinators: Schema.Attribute.Component<
      'anti-ragging-cell.anti-ragging-committe-members',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::commerce-and-management-forum.commerce-and-management-forum'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactUsFormContactUsForm
  extends Struct.CollectionTypeSchema {
  collectionName: 'contact_us_forms';
  info: {
    displayName: 'ContactUs Form';
    pluralName: 'contact-us-forms';
    singularName: 'contact-us-form';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email;
    fullName: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact-us-form.contact-us-form'
    > &
      Schema.Attribute.Private;
    message: Schema.Attribute.Text;
    mobileNumber: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    subjectOfInterest: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactUsContactUs extends Struct.SingleTypeSchema {
  collectionName: 'contact_uses';
  info: {
    description: '';
    displayName: 'ContactUs';
    pluralName: 'contact-uses';
    singularName: 'contact-us';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BannerSection: Schema.Attribute.Component<
      'contact-us.banner-section',
      false
    >;
    contactDeatils: Schema.Attribute.Component<
      'contact-us.contact-details',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact-us.contact-us'
    > &
      Schema.Attribute.Private;
    LoginPortals: Schema.Attribute.Component<'contact-us.login-portals', true>;
    MAP: Schema.Attribute.Component<'contact-us.map', false>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCourseDurationCourseDuration
  extends Struct.CollectionTypeSchema {
  collectionName: 'course_durations';
  info: {
    description: '';
    displayName: 'Course Duration';
    pluralName: 'course-durations';
    singularName: 'course-duration';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::course-duration.course-duration'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sections: Schema.Attribute.Component<'vision-mission.sections', true>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDepartmentFacultyMembersDepartmentFacultyMembers
  extends Struct.CollectionTypeSchema {
  collectionName: 'department_faculty_member';
  info: {
    description: '';
    displayName: 'Department Faculty Members';
    pluralName: 'department-faculty-member';
    singularName: 'department-faculty-members';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    DepartmentFacultyMembers: Schema.Attribute.Component<
      'department-faculty-members.faculty-members',
      true
    >;
    description: Schema.Attribute.Text;
    key: Schema.Attribute.String & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::department-faculty-members.department-faculty-members'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDepartmentPageDepartmentPage
  extends Struct.SingleTypeSchema {
  collectionName: 'department_pages';
  info: {
    displayName: 'Department Page';
    pluralName: 'department-pages';
    singularName: 'department-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BannerSection: Schema.Attribute.Component<
      'department-page.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Faculty_And_Publications: Schema.Attribute.Component<
      'department-page.faculty-and-publications',
      false
    >;
    International_Collaboration: Schema.Attribute.Component<
      'department-page.international-collaboration',
      false
    >;
    Language_Department: Schema.Attribute.Component<
      'iqac.about-vision-mission-sections',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::department-page.department-page'
    > &
      Schema.Attribute.Private;
    Message_From_Hods: Schema.Attribute.Component<
      'department-page.message-from-hods',
      false
    >;
    Professional_Courses: Schema.Attribute.Component<
      'department-page.professional-courses',
      false
    >;
    Programmes: Schema.Attribute.Component<'department-page.programmes', false>;
    publishedAt: Schema.Attribute.DateTime;
    Research_And_Awards: Schema.Attribute.Component<
      'department-page.research-and-awards',
      false
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDepartmentResearchDepartmentResearch
  extends Struct.CollectionTypeSchema {
  collectionName: 'department_researches';
  info: {
    displayName: 'Department Research';
    pluralName: 'department-researches';
    singularName: 'department-research';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::department-research.department-research'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ResearchPoints: Schema.Attribute.Component<
      'department-research.points',
      true
    >;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEcoCellEcoCell extends Struct.SingleTypeSchema {
  collectionName: 'eco_cells';
  info: {
    description: '';
    displayName: 'Eco Cell';
    pluralName: 'eco-cells';
    singularName: 'eco-cell';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::eco-cell.eco-cell'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    Sections: Schema.Attribute.Component<'eco-cell.sections', true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEdCellEdCell extends Struct.SingleTypeSchema {
  collectionName: 'ed_cells';
  info: {
    displayName: 'ED Cell';
    pluralName: 'ed-cells';
    singularName: 'ed-cell';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutVisionMissionSections: Schema.Attribute.Component<
      'iqac.about-vision-mission-sections',
      false
    >;
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    Coordinators: Schema.Attribute.Component<
      'anti-ragging-cell.anti-ragging-committe-members',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ImagesSection: Schema.Attribute.Component<
      'students-grievance-redressal-cell.images-section',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ed-cell.ed-cell'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEqualOpportunityCellEqualOpportunityCell
  extends Struct.SingleTypeSchema {
  collectionName: 'equal_opportunity_cells';
  info: {
    displayName: 'Equal Opportunity Cell';
    pluralName: 'equal-opportunity-cells';
    singularName: 'equal-opportunity-cell';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutVisionMissionSections: Schema.Attribute.Component<
      'iqac.about-vision-mission-sections',
      false
    >;
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::equal-opportunity-cell.equal-opportunity-cell'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    Table: Schema.Attribute.Component<
      'anti-ragging-cell.anti-ragging-committe-members',
      false
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFacultiesWelfareFacultiesWelfare
  extends Struct.SingleTypeSchema {
  collectionName: 'faculties_welfares';
  info: {
    description: '';
    displayName: 'Faculties Welfare';
    pluralName: 'faculties-welfares';
    singularName: 'faculties-welfare';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    FacultiesWelfare: Schema.Attribute.Component<
      'students-grievance-redressal-cell.procedures-section',
      true
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::faculties-welfare.faculties-welfare'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFacultyStudyCircleFacultyStudyCircle
  extends Struct.SingleTypeSchema {
  collectionName: 'faculty_study_circles';
  info: {
    displayName: 'Faculty Study Circle';
    pluralName: 'faculty-study-circles';
    singularName: 'faculty-study-circle';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutVisionMissionSections: Schema.Attribute.Component<
      'iqac.about-vision-mission-sections',
      false
    >;
    AntiRaggingCommitteMembers: Schema.Attribute.Component<
      'anti-ragging-cell.anti-ragging-committe-members',
      false
    >;
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::faculty-study-circle.faculty-study-circle'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFooterFooter extends Struct.SingleTypeSchema {
  collectionName: 'footers';
  info: {
    displayName: 'Footer';
    pluralName: 'footers';
    singularName: 'footer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    acadamics: Schema.Attribute.Component<'footer.important-links', true>;
    contactInfo: Schema.Attribute.Component<'footer.contact-info', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    follow: Schema.Attribute.Component<'footer.follow', true>;
    importantLinks: Schema.Attribute.Component<'footer.important-links', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::footer.footer'
    > &
      Schema.Attribute.Private;
    policies: Schema.Attribute.Component<'footer.important-links', true>;
    publishedAt: Schema.Attribute.DateTime;
    reports_and_publications: Schema.Attribute.Component<
      'footer.important-links',
      true
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGalleryGallery extends Struct.SingleTypeSchema {
  collectionName: 'galleries';
  info: {
    description: '';
    displayName: 'Gallery';
    pluralName: 'galleries';
    singularName: 'gallery';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BannerSection: Schema.Attribute.Component<'gallery.banner-section', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    imagesSection: Schema.Attribute.Component<'gallery.images-section', false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::gallery.gallery'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHeadlineBannerHeadlineBanner
  extends Struct.SingleTypeSchema {
  collectionName: 'headline_banners';
  info: {
    displayName: 'Headline Banner';
    pluralName: 'headline-banners';
    singularName: 'headline-banner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::headline-banner.headline-banner'
    > &
      Schema.Attribute.Private;
    message: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHodMessageHodMessage extends Struct.CollectionTypeSchema {
  collectionName: 'hod_messages';
  info: {
    displayName: 'Hod Message';
    pluralName: 'hod-messages';
    singularName: 'hod-message';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    designation: Schema.Attribute.String;
    hodMesssage: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files'>;
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::hod-message.hod-message'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHomeHome extends Struct.SingleTypeSchema {
  collectionName: 'homes';
  info: {
    description: '';
    displayName: 'Home';
    pluralName: 'homes';
    singularName: 'home';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Home: Schema.Attribute.Component<'home.home', false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::home.home'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiIccCellIccCell extends Struct.SingleTypeSchema {
  collectionName: 'icc_cells';
  info: {
    displayName: 'ICC Cell';
    pluralName: 'icc-cells';
    singularName: 'icc-cell';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutVisionMissionSections: Schema.Attribute.Component<
      'iqac.about-vision-mission-sections',
      false
    >;
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::icc-cell.icc-cell'
    > &
      Schema.Attribute.Private;
    Members: Schema.Attribute.Component<
      'anti-ragging-cell.anti-ragging-committe-members',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiIicIic extends Struct.SingleTypeSchema {
  collectionName: 'iics';
  info: {
    displayName: 'IIC';
    pluralName: 'iics';
    singularName: 'iic';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BannerSection: Schema.Attribute.Component<'iic.banner-section', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    IICMembers: Schema.Attribute.Component<'iic.iic-members', false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::iic.iic'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiIndustrialVisitIndustrialVisit
  extends Struct.SingleTypeSchema {
  collectionName: 'industrial_visits';
  info: {
    displayName: 'Industrial Visit';
    pluralName: 'industrial-visits';
    singularName: 'industrial-visit';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    IndustrialVisit: Schema.Attribute.Component<
      'students-grievance-redressal-cell.procedures-section',
      true
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::industrial-visit.industrial-visit'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiIqacIqac extends Struct.SingleTypeSchema {
  collectionName: 'iqacs';
  info: {
    description: '';
    displayName: 'IQAC';
    pluralName: 'iqacs';
    singularName: 'iqac';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutVisionMissionSections: Schema.Attribute.Component<
      'iqac.about-vision-mission-sections',
      false
    >;
    BannerSection: Schema.Attribute.Component<'iqac.banner-section', false>;
    CompositionOfIQACCell: Schema.Attribute.Component<
      'iqac.composition-of-iqac-cell',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::iqac.iqac'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLibraryLibrary extends Struct.SingleTypeSchema {
  collectionName: 'libraries';
  info: {
    description: '';
    displayName: 'Library';
    pluralName: 'libraries';
    singularName: 'library';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutLibrary: Schema.Attribute.Component<'library.about-library', false>;
    BannerSection: Schema.Attribute.Component<'library.banner-section', false>;
    ContactUs: Schema.Attribute.Component<'library.contact-us', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    digitalresources: Schema.Attribute.Component<
      'library.digital-resourc',
      false
    >;
    EventsAndRules: Schema.Attribute.Component<
      'library.events-and-rules',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::library.library'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNccNcc extends Struct.SingleTypeSchema {
  collectionName: 'nccs';
  info: {
    displayName: 'NCC';
    pluralName: 'nccs';
    singularName: 'ncc';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    CommitteMembers: Schema.Attribute.Component<
      'anti-ragging-cell.anti-ragging-committe-members',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ImagesSection: Schema.Attribute.Component<
      'students-grievance-redressal-cell.images-section',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::ncc.ncc'> &
      Schema.Attribute.Private;
    NccImage: Schema.Attribute.Media<'images' | 'files'>;
    publishedAt: Schema.Attribute.DateTime;
    Sections: Schema.Attribute.Component<
      'students-grievance-redressal-cell.procedures-section',
      true
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNssAndRedCrossNssAndRedCross
  extends Struct.SingleTypeSchema {
  collectionName: 'nss_and_red_crosses';
  info: {
    description: '';
    displayName: 'NSS And Red Cross';
    pluralName: 'nss-and-red-crosses';
    singularName: 'nss-and-red-cross';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ImagesSection: Schema.Attribute.Component<
      'students-grievance-redressal-cell.images-section',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::nss-and-red-cross.nss-and-red-cross'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    Sections: Schema.Attribute.Component<
      'students-grievance-redressal-cell.procedures-section',
      true
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiObjectiveObjective extends Struct.CollectionTypeSchema {
  collectionName: 'objectives';
  info: {
    displayName: 'Objectives';
    pluralName: 'objectives';
    singularName: 'objective';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::objective.objective'
    > &
      Schema.Attribute.Private;
    Objectives: Schema.Attribute.Component<'objectives.points', true>;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProgrammeDetailProgrammeDetail
  extends Struct.CollectionTypeSchema {
  collectionName: 'programme_details';
  info: {
    description: '';
    displayName: 'Programme Details';
    pluralName: 'programme-details';
    singularName: 'programme-detail';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::programme-detail.programme-detail'
    > &
      Schema.Attribute.Private;
    programmeDetails: Schema.Attribute.Component<'programme-details.key', true>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiQuestionBankQuestionBank
  extends Struct.CollectionTypeSchema {
  collectionName: 'question_banks';
  info: {
    displayName: 'Question Bank';
    pluralName: 'question-banks';
    singularName: 'question-bank';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Department: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::question-bank.question-bank'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Year: Schema.Attribute.Component<'question-bank.year', true>;
  };
}

export interface ApiResearchForumResearchForum extends Struct.SingleTypeSchema {
  collectionName: 'research_forums';
  info: {
    displayName: 'Research Forum';
    pluralName: 'research-forums';
    singularName: 'research-forum';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BannerSection: Schema.Attribute.Component<
      'research-forum.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::research-forum.research-forum'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ResearchForum: Schema.Attribute.Component<
      'research-forum.research-forum',
      false
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiResearchResearch extends Struct.SingleTypeSchema {
  collectionName: 'researchs';
  info: {
    description: '';
    displayName: 'Research';
    pluralName: 'researchs';
    singularName: 'research';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BannerSection: Schema.Attribute.Component<'research.banner-section', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::research.research'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ResearchPublications: Schema.Attribute.Component<
      'research.research-publications',
      false
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSamashtiSamashti extends Struct.SingleTypeSchema {
  collectionName: 'samashtis';
  info: {
    description: '';
    displayName: 'Samashti';
    pluralName: 'samashtis';
    singularName: 'samashti';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    About: Schema.Attribute.Component<'samashti.about-section', false>;
    BannerSection: Schema.Attribute.Component<'samashti.banner-section', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Editions: Schema.Attribute.Component<'samashti.editions', false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::samashti.samashti'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiScStObcMinorityCellScStObcMinorityCell
  extends Struct.SingleTypeSchema {
  collectionName: 'sc_st_obc_minority_cells';
  info: {
    displayName: 'SC ST OBC Minority Cell';
    pluralName: 'sc-st-obc-minority-cells';
    singularName: 'sc-st-obc-minority-cell';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::sc-st-obc-minority-cell.sc-st-obc-minority-cell'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    SCSTCommitteeMembers: Schema.Attribute.Component<
      'anti-ragging-cell.anti-ragging-committe-members',
      false
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSportsSports extends Struct.SingleTypeSchema {
  collectionName: 'sport';
  info: {
    displayName: 'Sports';
    pluralName: 'sport';
    singularName: 'sports';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutSections: Schema.Attribute.Component<'sports.about-sections', false>;
    BannerSection: Schema.Attribute.Component<'sports.banner-section', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    gallerySection: Schema.Attribute.Component<'sports.gallery-section', false>;
    HodMessage: Schema.Attribute.Component<'sports.hod-message', false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::sports.sports'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiStudentsGrievanceRedressalCellStudentsGrievanceRedressalCell
  extends Struct.SingleTypeSchema {
  collectionName: 'students_grievance_redressal_cells';
  info: {
    description: '';
    displayName: 'Students Grievance Redressal Cell';
    pluralName: 'students-grievance-redressal-cells';
    singularName: 'students-grievance-redressal-cell';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutVisionMissionSections: Schema.Attribute.Component<
      'iqac.about-vision-mission-sections',
      false
    >;
    BannerSection: Schema.Attribute.Component<
      'anti-ragging-cell.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ImagesSection: Schema.Attribute.Component<
      'students-grievance-redressal-cell.images-section',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::students-grievance-redressal-cell.students-grievance-redressal-cell'
    > &
      Schema.Attribute.Private;
    Members: Schema.Attribute.Component<
      'anti-ragging-cell.anti-ragging-committe-members',
      false
    >;
    ProceduresSection: Schema.Attribute.Component<
      'students-grievance-redressal-cell.procedures-section',
      true
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiStudentsStudents extends Struct.SingleTypeSchema {
  collectionName: 'student';
  info: {
    description: '';
    displayName: 'Students';
    pluralName: 'student';
    singularName: 'students';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BannerSection: Schema.Attribute.Component<'students.banner-section', false>;
    CareerAdvancementCenter: Schema.Attribute.Component<
      'students.career-advancement-center',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::students.students'
    > &
      Schema.Attribute.Private;
    MentoringCell: Schema.Attribute.Component<'students.mentoring-cell', false>;
    publishedAt: Schema.Attribute.DateTime;
    RedRessalCellSection: Schema.Attribute.Component<
      'students.redressal-cell-section',
      false
    >;
    TrainingPlacementAndInternshipCell: Schema.Attribute.Component<
      'students.training-placement-and-internship-cell',
      false
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSyllabusDetailSyllabusDetail
  extends Struct.CollectionTypeSchema {
  collectionName: 'syllabus_details';
  info: {
    displayName: 'Syllabus Details';
    pluralName: 'syllabus-details';
    singularName: 'syllabus-detail';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::syllabus-detail.syllabus-detail'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    SyllabusSection: Schema.Attribute.Component<
      'syllabus-details.syllabus-section',
      true
    >;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiVisionMissionVisionMission
  extends Struct.CollectionTypeSchema {
  collectionName: 'vision_missions';
  info: {
    displayName: 'VisionMission';
    pluralName: 'vision-missions';
    singularName: 'vision-mission';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::vision-mission.vision-mission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sections: Schema.Attribute.Component<'vision-mission.sections', true>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiWomenCellWomenCell extends Struct.SingleTypeSchema {
  collectionName: 'women_cells';
  info: {
    displayName: 'Women Cell';
    pluralName: 'women-cells';
    singularName: 'women-cell';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutVisionMissionSections: Schema.Attribute.Component<
      'iqac.about-vision-mission-sections',
      false
    >;
    AntiRaggingCommitteMembers: Schema.Attribute.Component<
      'anti-ragging-cell.anti-ragging-committe-members',
      false
    >;
    BannerSection: Schema.Attribute.Component<
      'admissions.banner-section',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::women-cell.women-cell'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::about-department.about-department': ApiAboutDepartmentAboutDepartment;
      'api::about-us.about-us': ApiAboutUsAboutUs;
      'api::activitie.activitie': ApiActivitieActivitie;
      'api::activities-page.activities-page': ApiActivitiesPageActivitiesPage;
      'api::admission-process.admission-process': ApiAdmissionProcessAdmissionProcess;
      'api::admission.admission': ApiAdmissionAdmission;
      'api::alumni.alumni': ApiAlumniAlumni;
      'api::ambedkar-study-circle.ambedkar-study-circle': ApiAmbedkarStudyCircleAmbedkarStudyCircle;
      'api::anti-ragging-cell.anti-ragging-cell': ApiAntiRaggingCellAntiRaggingCell;
      'api::anti-sexual-harassment-cell.anti-sexual-harassment-cell': ApiAntiSexualHarassmentCellAntiSexualHarassmentCell;
      'api::apply-now-form.apply-now-form': ApiApplyNowFormApplyNowForm;
      'api::apply-now.apply-now': ApiApplyNowApplyNow;
      'api::blogs-content.blogs-content': ApiBlogsContentBlogsContent;
      'api::books-patient.books-patient': ApiBooksPatientBooksPatient;
      'api::certificate-course.certificate-course': ApiCertificateCourseCertificateCourse;
      'api::commerce-and-management-forum.commerce-and-management-forum': ApiCommerceAndManagementForumCommerceAndManagementForum;
      'api::contact-us-form.contact-us-form': ApiContactUsFormContactUsForm;
      'api::contact-us.contact-us': ApiContactUsContactUs;
      'api::course-duration.course-duration': ApiCourseDurationCourseDuration;
      'api::department-faculty-members.department-faculty-members': ApiDepartmentFacultyMembersDepartmentFacultyMembers;
      'api::department-page.department-page': ApiDepartmentPageDepartmentPage;
      'api::department-research.department-research': ApiDepartmentResearchDepartmentResearch;
      'api::eco-cell.eco-cell': ApiEcoCellEcoCell;
      'api::ed-cell.ed-cell': ApiEdCellEdCell;
      'api::equal-opportunity-cell.equal-opportunity-cell': ApiEqualOpportunityCellEqualOpportunityCell;
      'api::faculties-welfare.faculties-welfare': ApiFacultiesWelfareFacultiesWelfare;
      'api::faculty-study-circle.faculty-study-circle': ApiFacultyStudyCircleFacultyStudyCircle;
      'api::footer.footer': ApiFooterFooter;
      'api::gallery.gallery': ApiGalleryGallery;
      'api::headline-banner.headline-banner': ApiHeadlineBannerHeadlineBanner;
      'api::hod-message.hod-message': ApiHodMessageHodMessage;
      'api::home.home': ApiHomeHome;
      'api::icc-cell.icc-cell': ApiIccCellIccCell;
      'api::iic.iic': ApiIicIic;
      'api::industrial-visit.industrial-visit': ApiIndustrialVisitIndustrialVisit;
      'api::iqac.iqac': ApiIqacIqac;
      'api::library.library': ApiLibraryLibrary;
      'api::ncc.ncc': ApiNccNcc;
      'api::nss-and-red-cross.nss-and-red-cross': ApiNssAndRedCrossNssAndRedCross;
      'api::objective.objective': ApiObjectiveObjective;
      'api::programme-detail.programme-detail': ApiProgrammeDetailProgrammeDetail;
      'api::question-bank.question-bank': ApiQuestionBankQuestionBank;
      'api::research-forum.research-forum': ApiResearchForumResearchForum;
      'api::research.research': ApiResearchResearch;
      'api::samashti.samashti': ApiSamashtiSamashti;
      'api::sc-st-obc-minority-cell.sc-st-obc-minority-cell': ApiScStObcMinorityCellScStObcMinorityCell;
      'api::sports.sports': ApiSportsSports;
      'api::students-grievance-redressal-cell.students-grievance-redressal-cell': ApiStudentsGrievanceRedressalCellStudentsGrievanceRedressalCell;
      'api::students.students': ApiStudentsStudents;
      'api::syllabus-detail.syllabus-detail': ApiSyllabusDetailSyllabusDetail;
      'api::vision-mission.vision-mission': ApiVisionMissionVisionMission;
      'api::women-cell.women-cell': ApiWomenCellWomenCell;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
